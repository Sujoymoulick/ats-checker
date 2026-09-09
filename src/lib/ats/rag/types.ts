export type ChunkType = 
  | 'contact'
  | 'summary'
  | 'skills'
  | 'experience_bullet'
  | 'education'
  | 'project'
  | 'certification'
  | 'other';

export interface DocumentChunk {
  id: string;
  type: ChunkType;
  text: string;
  lineIndex?: number;
  tokens: string[];
  metadata?: Record<string, any>;
}

export interface RetrievedArchetype {
  id: string;
  role: string;
  category: string;
  level: string;
  similarityScore: number; // 0 - 100
  matchedSkills: string[];
  missingBenchmarkSkills: string[];
  keySignals: string[];
  sampleBullet: string;
}

export interface DomainKnowledgeProfile {
  roleCategory: string;
  displayTitle: string;
  coreSkills: string[];
  secondarySkills: string[];
  toolsAndPlatforms: string[];
  recommendedCertifications: string[];
  targetMetricDensity: number; // percentage of bullets with numbers (e.g. 0.60 = 60%)
  exemplarActionVerbs: string[];
  exemplarBulletPatterns: string[];
  commonPitfalls: string[];
}

export interface RAGAnalysisInsights {
  matchedArchetype: RetrievedArchetype;
  alternativeArchetypes: RetrievedArchetype[];
  retrievalConfidence: number; // 0 - 100
  domainProfile: DomainKnowledgeProfile;
  domainCompetenciesFound: string[];
  domainCompetenciesMissing: string[];
  benchmarkComparison: {
    skillBreadthPercentile: number; // 0 - 100
    metricDensityPercentile: number; // 0 - 100
    actionVerbPercentile: number; // 0 - 100
    overallBenchmarkFit: 'Exceptional' | 'Strong' | 'Competitive' | 'Developing' | 'Early Stage';
  };
  suggestedActionItems: string[];
  exemplarBullets: string[];
}
