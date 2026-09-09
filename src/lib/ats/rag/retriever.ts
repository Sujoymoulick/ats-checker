import { ATS_BENCHMARKS, getBenchmarkById } from '../../../data/ats-benchmark-index.ts';
import { HybridVectorIndex } from './vectorIndex.ts';
import { getDomainKnowledge, DOMAIN_KNOWLEDGE_PROFILES } from './knowledgeBase.ts';
import type { RAGAnalysisInsights, RetrievedArchetype } from './types.ts';

// Pre-build index over all 30 benchmarks
const benchmarkDocuments = ATS_BENCHMARKS.map(b => ({
  id: b.id,
  text: `${b.role} ${b.category} ${b.skills.join(' ')} ${b.keywords.join(' ')} ${b.rawText}`
}));

const vectorIndex = new HybridVectorIndex(benchmarkDocuments);

export function retrieveRAGKnowledge(
  resumeText: string,
  resumeLines: string[],
  jobDescription?: string
): RAGAnalysisInsights {
  // Query text combines resume content and optional job description for augmented precision
  const queryText = jobDescription && jobDescription.trim().length > 20
    ? `${jobDescription} ${resumeText}`
    : resumeText;

  const searchHits = vectorIndex.search(queryText, 4);

  const matchedHits: RetrievedArchetype[] = searchHits.map(hit => {
    const benchmark = getBenchmarkById(hit.id);
    const role = benchmark?.role || hit.id;
    const category = benchmark?.category || 'technology';
    const level = benchmark?.level || 'experienced';
    const skills = benchmark?.skills || [];
    const signals = benchmark?.achievementSignals || [];

    const lowerResume = resumeText.toLowerCase();
    const matchedSkills = skills.filter(s => lowerResume.includes(s.toLowerCase()));
    const missingBenchmarkSkills = skills.filter(s => !lowerResume.includes(s.toLowerCase()));

    // Sample representative bullet
    const rawLines = (benchmark?.rawText || '').split('\n');
    const bulletLine = rawLines.find(l => l.trim().startsWith('-') || l.trim().startsWith('•')) || 'Architected scalable systems.';

    return {
      id: hit.id,
      role,
      category,
      level,
      similarityScore: hit.score,
      matchedSkills,
      missingBenchmarkSkills,
      keySignals: signals.slice(0, 4),
      sampleBullet: bulletLine.replace(/^[-•\s]+/, '').trim()
    };
  });

  const topMatch = matchedHits[0] || {
    id: 'software-engineer',
    role: 'Software Engineer',
    category: 'technology',
    level: 'senior',
    similarityScore: 75,
    matchedSkills: ['JavaScript', 'Git'],
    missingBenchmarkSkills: ['TypeScript', 'Docker'],
    keySignals: ['Scaled microservices'],
    sampleBullet: 'Architected and deployed scalable systems.'
  };

  const domainProfile = getDomainKnowledge(topMatch.id);

  // Analyze Domain Competency Coverage
  const lowerText = resumeText.toLowerCase();
  const allDomainSkills = [...domainProfile.coreSkills, ...domainProfile.toolsAndPlatforms];
  const domainCompetenciesFound: string[] = [];
  const domainCompetenciesMissing: string[] = [];

  for (const skill of allDomainSkills) {
    if (lowerText.includes(skill.toLowerCase())) {
      domainCompetenciesFound.push(skill);
    } else {
      domainCompetenciesMissing.push(skill);
    }
  }

  // Calculate Benchmark Percentiles
  const bulletLines = resumeLines.filter(l => {
    const trimmed = l.trim();
    return trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('▪') || trimmed.startsWith('►') || trimmed.startsWith('✓');
  });

  const quantifiedBulletCount = bulletLines.filter(l => 
    /\d+%|\$\d+|\d+\s*(?:k|m|b|users|clients|engineers|teams|days|hours|minutes|seconds|x)/i.test(l)
  ).length;

  const currentMetricDensity = bulletLines.length > 0
    ? quantifiedBulletCount / bulletLines.length
    : 0.2;

  const metricDensityPercentile = Math.min(100, Math.round((currentMetricDensity / Math.max(0.01, domainProfile.targetMetricDensity)) * 85));

  const skillBreadthRatio = domainCompetenciesFound.length / Math.max(1, (domainCompetenciesFound.length + domainCompetenciesMissing.length));
  const skillBreadthPercentile = Math.min(100, Math.round(skillBreadthRatio * 100));

  let actionVerbHits = 0;
  for (const verb of domainProfile.exemplarActionVerbs) {
    if (new RegExp(`\\b${verb}\\b`, 'i').test(resumeText)) {
      actionVerbHits++;
    }
  }
  const actionVerbPercentile = Math.min(100, Math.round((actionVerbHits / Math.max(1, domainProfile.exemplarActionVerbs.length)) * 100));

  let overallFit: 'Exceptional' | 'Strong' | 'Competitive' | 'Developing' | 'Early Stage' = 'Competitive';
  const avgPercentile = (metricDensityPercentile + skillBreadthPercentile + actionVerbPercentile) / 3;
  if (avgPercentile >= 88) overallFit = 'Exceptional';
  else if (avgPercentile >= 75) overallFit = 'Strong';
  else if (avgPercentile >= 58) overallFit = 'Competitive';
  else if (avgPercentile >= 40) overallFit = 'Developing';
  else overallFit = 'Early Stage';

  // Action Items
  const suggestedActionItems: string[] = [];
  if (domainCompetenciesMissing.length > 0) {
    suggestedActionItems.push(`Incorporate key ${domainProfile.displayTitle} competencies: ${domainCompetenciesMissing.slice(0, 4).join(', ')}`);
  }
  if (currentMetricDensity < domainProfile.targetMetricDensity) {
    suggestedActionItems.push(`Boost quantified metric density: Aim for ${Math.round(domainProfile.targetMetricDensity * 100)}% of bullets with numbers, % or $ (currently at ${Math.round(currentMetricDensity * 100)}%)`);
  }
  if (domainProfile.recommendedCertifications.length > 0) {
    const hasCert = domainProfile.recommendedCertifications.some(c => lowerText.includes(c.toLowerCase()));
    if (!hasCert) {
      suggestedActionItems.push(`Consider adding target industry credentials like ${domainProfile.recommendedCertifications[0]}`);
    }
  }

  return {
    matchedArchetype: topMatch,
    alternativeArchetypes: matchedHits.slice(1, 3),
    retrievalConfidence: topMatch.similarityScore,
    domainProfile,
    domainCompetenciesFound,
    domainCompetenciesMissing: domainCompetenciesMissing.slice(0, 8),
    benchmarkComparison: {
      skillBreadthPercentile,
      metricDensityPercentile,
      actionVerbPercentile,
      overallBenchmarkFit: overallFit
    },
    suggestedActionItems,
    exemplarBullets: domainProfile.exemplarBulletPatterns
  };
}
