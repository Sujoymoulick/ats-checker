import type { RAGAnalysisInsights } from './types.ts';
import type { ATSAnalysisResult } from '../types.ts';

export function generateRAGAugmentedPrompt(
  result: ATSAnalysisResult,
  ragInsights: RAGAnalysisInsights,
  mode: 'full' | 'keywords' | 'bullets' | 'summary' = 'full'
): string {
  const archetype = ragInsights.matchedArchetype;
  const domain = ragInsights.domainProfile;
  const missingCompetencies = ragInsights.domainCompetenciesMissing;
  const missingKeywords = result.keywords.missingKeywords || [];
  const combinedMissing = Array.from(new Set([...missingKeywords, ...missingCompetencies]));

  if (mode === 'bullets') {
    return `Act as an Elite Executive Resume Strategist and Technical Recruiter specialized in ${domain.displayTitle} roles.

Target Role Archetype: ${archetype.role} (Seniority: ${archetype.level.toUpperCase()})
Benchmark Comparison:
- Current Quantified Metric Percentile: ${ragInsights.benchmarkComparison.metricDensityPercentile}/100 (Target: ${Math.round(domain.targetMetricDensity * 100)}% of bullets quantified)
- Strong Action Verbs Identified: ${domain.exemplarActionVerbs.slice(0, 6).join(', ')}

Gold-Standard Benchmark Bullet Patterns for ${domain.displayTitle}:
${domain.exemplarBulletPatterns.map(p => `• "${p}"`).join('\n')}

INSTRUCTIONS:
1. Rewrite every single Work Experience bullet point below using the STAR method (Situation, Task, Action, Result).
2. Start each bullet with high-impact power verbs: ${domain.exemplarActionVerbs.slice(0, 6).join(', ')}.
3. Inject credible, role-specific metrics (%, $, time saved, latency reduction, throughput, scale).
4. Seamlessly incorporate missing competencies: ${combinedMissing.slice(0, 6).join(', ')}.

=== ORIGINAL RESUME TEXT ===
${result.extractedText || ''}

Please provide the revised, high-impact Work Experience section.`;
  }

  if (mode === 'summary') {
    return `Act as a Senior Career Coach and Executive Resume Writer.

Generate a high-converting, ATS-optimized 3-4 sentence Professional Summary for a candidate targeting "${archetype.role}" (${domain.displayTitle}).

Key Domain Competencies to Feature:
${domain.coreSkills.slice(0, 8).join(', ')}

Missing High-Value Keywords to weave in:
${combinedMissing.slice(0, 6).join(', ')}

=== ORIGINAL RESUME TEXT ===
${result.extractedText || ''}

Provide 3 distinct summary variations:
1. Metric & Impact-Driven (Highlights numbers, scale, and business ROI)
2. Technical Mastery & Architecture (Emphasizes tools, languages, and technical depth)
3. Leadership & Cross-Functional Strategy (Focuses on team execution, stakeholder management, and delivery)`;
  }

  if (mode === 'keywords') {
    return `Act as an ATS Systems Specialist & Keyword Strategist.

Target Role: ${archetype.role}
Domain: ${domain.displayTitle}

RAG Knowledge Base Keyword Gaps:
${combinedMissing.length > 0 ? combinedMissing.map(k => `- ${k}`).join('\n') : '- High-value domain core competencies'}

Recommended Tools & Platforms from Gold-Standard Benchmark:
${domain.toolsAndPlatforms.join(', ')}

=== ORIGINAL RESUME TEXT ===
${result.extractedText || ''}

Please rewrite the Skills and Experience sections to naturally integrate these keywords without keyword stuffing.`;
  }

  // Full RAG Optimization Prompt
  return `Act as an Elite ATS Resume Architect and Senior Hiring Executive for ${domain.displayTitle} positions.

I ran an advanced RAG-augmented ATS screening audit on my resume against the gold-standard "${archetype.role}" benchmark:
- Overall ATS Score: ${result.totalScore}/100 (${result.scoreCategory})
- Benchmark Match Confidence: ${archetype.similarityScore}%
- Domain Archetype: ${domain.displayTitle}
- Benchmark Skill Breadth: ${ragInsights.benchmarkComparison.skillBreadthPercentile}th percentile
- Quantified Metric Density: ${ragInsights.benchmarkComparison.metricDensityPercentile}th percentile (${ragInsights.benchmarkComparison.overallBenchmarkFit} Benchmark Fit)

=== CRITICAL GAPS IDENTIFIED BY RAG BENCHMARK ===
• Missing Domain Competencies: ${combinedMissing.slice(0, 10).join(', ')}
• Recommended Tools/Platforms: ${domain.toolsAndPlatforms.slice(0, 6).join(', ')}
• Recommended Certifications: ${domain.recommendedCertifications.join(', ') || 'N/A'}
• Formatting Issues: ${result.formatting.map(f => f.title).join('; ') || 'None detected'}

=== GOLD-STANDARD BULLET FORMULAS FOR THIS ROLE ===
${domain.exemplarBulletPatterns.map(p => `• "${p}"`).join('\n')}

=== REWRITE DIRECTIVES ===
1. STRUCTURE: Clean, single-column plain text format with standard section titles: Contact Info, Professional Summary, Technical & Core Skills, Work Experience, Education, Certifications.
2. COMPETENCY INTEGRATION: Naturally embed missing competencies (${combinedMissing.slice(0, 8).join(', ')}) into Skills and Experience bullet points.
3. QUANTIFIED RESULTS: Every bullet point must have concrete metrics (%, $, time, team size, scale) matching the ${Math.round(domain.targetMetricDensity * 100)}% target metric density.
4. ACTION VERBS: Use strong domain verbs: ${domain.exemplarActionVerbs.join(', ')}.

=== ORIGINAL RESUME TEXT ===
${result.extractedText || ''}

Please output:
1. The complete rewritten, production-grade ATS resume.
2. A bulleted summary of key improvements made.`;
}
