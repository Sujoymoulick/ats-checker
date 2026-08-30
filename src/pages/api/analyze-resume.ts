import type { APIRoute } from 'astro';
import { sanitizeResumeText, buildAiPrompt, validateAndCleanAiResult } from '../../lib/ats/aiAnalyzer';

export const prerender = false;

// Dev mode in-memory rate limit store for local testing
const devMemoryStore = new Map<string, { count: number; expiresAt: number }>();

function getDevMemoryCount(key: string): number {
  const record = devMemoryStore.get(key);
  if (!record) return 0;
  if (Date.now() > record.expiresAt) {
    devMemoryStore.delete(key);
    return 0;
  }
  return record.count;
}

function incrementDevMemoryCount(key: string, ttlMs: number): number {
  const current = getDevMemoryCount(key);
  const newCount = current + 1;
  devMemoryStore.set(key, {
    count: newCount,
    expiresAt: Date.now() + ttlMs
  });
  return newCount;
}

async function getCloudflareEnv(context: any): Promise<any> {
  try {
    // @ts-ignore
    const cfModule = await import('cloudflare:workers');
    if (cfModule && cfModule.env) {
      return cfModule.env;
    }
  } catch {}

  try {
    const locals = context.locals || {};
    if (locals.env) return locals.env;
  } catch {}

  return {};
}

export const ALL: APIRoute = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'METHOD_NOT_ALLOWED', message: 'Only POST requests are allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return POST(context);
};

export const POST: APIRoute = async (context) => {
  const request = context.request;

  // 1. Method & Content-Type Restriction
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'METHOD_NOT_ALLOWED', message: 'Only POST requests are allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'INVALID_CONTENT_TYPE', message: 'Content-Type must be application/json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Identify Visitor IP (Strictly Server-Side, Cloudflare Preferred)
  const cfIp = request.headers.get('cf-connecting-ip');
  const realIp = request.headers.get('x-real-ip');
  let fallbackAddress = '127.0.0.1';
  try {
    fallbackAddress = context.clientAddress || '127.0.0.1';
  } catch {
    fallbackAddress = '127.0.0.1';
  }
  const visitorIp = cfIp || realIp || fallbackAddress;

  // 3. Quota Calculations (2 Scans per 24h / UTC Daily Window)
  const now = new Date();
  const dateKey = now.toISOString().split('T')[0];
  const rateLimitKey = `rate_limit:${visitorIp}:${dateKey}`;

  const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  const resetAtISO = nextMidnight.toISOString();
  const ttlSeconds = Math.max(60, Math.floor((nextMidnight.getTime() - now.getTime()) / 1000));

  // Access Cloudflare environment bindings safely
  const runtimeEnv = await getCloudflareEnv(context);
  const kv = runtimeEnv?.RATE_LIMIT_KV;

  let currentCount = 0;
  if (kv) {
    const val = await kv.get(rateLimitKey);
    currentCount = val ? parseInt(val, 10) : 0;
  } else {
    currentCount = getDevMemoryCount(rateLimitKey);
  }

  // 4. Check Daily Limit (2 Scans per IP per 24h)
  if (currentCount >= 2) {
    return new Response(
      JSON.stringify({
        error: 'DAILY_SCAN_LIMIT_REACHED',
        message: 'You have used your 2 free AI resume scans for today. Your local ATS checker remains 100% available.',
        limit: 2,
        remaining: 0,
        resetAt: resetAtISO
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(ttlSeconds)
        }
      }
    );
  }

  // 5. Parse and Validate Request Payload
  let body: any;
  try {
    const bodyText = await request.text();
    if (bodyText.length > 120000) {
      return new Response(
        JSON.stringify({ error: 'PAYLOAD_TOO_LARGE', message: 'Request payload exceeds maximum size.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }
    body = JSON.parse(bodyText);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'MALFORMED_JSON', message: 'Invalid JSON request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { resumeText, jobDescription, targetRole } = body || {};

  if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
    return new Response(
      JSON.stringify({ error: 'INVALID_RESUME_TEXT', message: 'resumeText is required and cannot be empty.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (resumeText.length > 50000) {
    return new Response(
      JSON.stringify({ error: 'RESUME_TEXT_TOO_LONG', message: 'resumeText exceeds maximum allowed length of 50,000 characters.' }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (jobDescription && (typeof jobDescription !== 'string' || jobDescription.length > 30000)) {
    return new Response(
      JSON.stringify({ error: 'JOB_DESCRIPTION_TOO_LONG', message: 'jobDescription exceeds maximum allowed length of 30,000 characters.' }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (targetRole && (typeof targetRole !== 'string' || targetRole.length > 200)) {
    return new Response(
      JSON.stringify({ error: 'TARGET_ROLE_TOO_LONG', message: 'targetRole exceeds maximum allowed length of 200 characters.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 6. Valid Request Accepted -> Increment Rate Limit Quota (2 Scans/Day per IP)
  const newCount = currentCount + 1;
  if (kv) {
    await kv.put(rateLimitKey, String(newCount), { expirationTtl: ttlSeconds });
  } else {
    incrementDevMemoryCount(rateLimitKey, ttlSeconds * 1000);
  }

  const remainingScans = Math.max(0, 2 - newCount);

  // 7. Sanitize Text (Redact Contact Details)
  const sanitizedResume = sanitizeResumeText(resumeText);
  const { systemPrompt, userContent } = buildAiPrompt(sanitizedResume, jobDescription, targetRole);

  // 8. Invoke Cloudflare Workers AI Binding
  let rawAiOutput: string | null = null;
  let aiAvailable = false;

  const aiBinding = runtimeEnv?.AI;

  try {
    if (aiBinding) {
      const result = await aiBinding.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        max_tokens: 1500,
        temperature: 0.2
      });

      rawAiOutput = typeof result === 'string' ? result : result?.response || JSON.stringify(result);
      aiAvailable = true;
    } else if (typeof process !== 'undefined' && process.env?.CLOUDFLARE_ACCOUNT_ID && process.env?.CLOUDFLARE_API_TOKEN) {
      // Fallback HTTP REST API call for local testing if env tokens provided
      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
      const apiToken = process.env.CLOUDFLARE_API_TOKEN;
      const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent }
          ]
        })
      });

      if (res.ok) {
        const data = await res.json();
        rawAiOutput = data?.result?.response || JSON.stringify(data?.result);
        aiAvailable = true;
      }
    }
  } catch (aiErr) {
    console.error('Cloudflare Workers AI Execution Error:', aiErr);
    aiAvailable = false;
  }

  // 9. If AI is unavailable, return safe fallback response
  if (!aiAvailable || !rawAiOutput) {
    return new Response(
      JSON.stringify({
        aiAvailable: false,
        message: 'Cloudflare AI insights are temporarily unavailable. Your local ATS score and report remain available.',
        fallback: true,
        remaining: remainingScans,
        limit: 2
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 10. Parse AI Output JSON
  let parsedJson: any = null;
  try {
    const jsonMatch = rawAiOutput.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsedJson = JSON.parse(jsonMatch[0]);
    } else {
      parsedJson = JSON.parse(rawAiOutput);
    }
  } catch (parseErr) {
    console.error('AI Response JSON Parse Error:', parseErr, rawAiOutput);
    parsedJson = null;
  }

  const cleanedAiAnalysis = validateAndCleanAiResult(parsedJson);

  // 11. Return Final Structured Response
  return new Response(
    JSON.stringify({
      success: true,
      aiAvailable: true,
      remaining: remainingScans,
      limit: 2,
      resetAt: resetAtISO,
      analysis: cleanedAiAnalysis
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
