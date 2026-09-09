import softwareEngineer from './ats-benchmarks/software-engineer.json' with { type: 'json' };
import dataScientist from './ats-benchmarks/data-scientist.json' with { type: 'json' };
import marketingManager from './ats-benchmarks/marketing-manager.json' with { type: 'json' };
import financialAnalyst from './ats-benchmarks/financial-analyst.json' with { type: 'json' };
import productManager from './ats-benchmarks/product-manager.json' with { type: 'json' };
import entryLevelEngineer from './ats-benchmarks/entry-level-engineer.json' with { type: 'json' };
import engineeringManager from './ats-benchmarks/engineering-manager.json' with { type: 'json' };
import salesManager from './ats-benchmarks/sales-manager.json' with { type: 'json' };
import uxDesigner from './ats-benchmarks/ux-designer.json' with { type: 'json' };
import operationsManager from './ats-benchmarks/operations-manager.json' with { type: 'json' };

// 20 New Benchmarks
import devopsCloudEngineer from './ats-benchmarks/devops-cloud-engineer.json' with { type: 'json' };
import cybersecurityAnalyst from './ats-benchmarks/cybersecurity-analyst.json' with { type: 'json' };
import frontendDeveloper from './ats-benchmarks/frontend-developer.json' with { type: 'json' };
import backendJavaArchitect from './ats-benchmarks/backend-java-architect.json' with { type: 'json' };
import mobileEngineer from './ats-benchmarks/mobile-engineer.json' with { type: 'json' };
import machineLearningEngineer from './ats-benchmarks/machine-learning-engineer.json' with { type: 'json' };
import qaAutomationEngineer from './ats-benchmarks/qa-automation-engineer.json' with { type: 'json' };
import dataEngineer from './ats-benchmarks/data-engineer.json' with { type: 'json' };
import businessAnalyst from './ats-benchmarks/business-analyst.json' with { type: 'json' };
import scrumMaster from './ats-benchmarks/scrum-master.json' with { type: 'json' };
import technicalProgramManager from './ats-benchmarks/technical-program-manager.json' with { type: 'json' };
import humanResourcesPartner from './ats-benchmarks/human-resources-partner.json' with { type: 'json' };
import technicalRecruiter from './ats-benchmarks/technical-recruiter.json' with { type: 'json' };
import customerSuccessManager from './ats-benchmarks/customer-success-manager.json' with { type: 'json' };
import contentSeoSpecialist from './ats-benchmarks/content-seo-specialist.json' with { type: 'json' };
import executiveAssistant from './ats-benchmarks/executive-assistant.json' with { type: 'json' };
import supplyChainSpecialist from './ats-benchmarks/supply-chain-specialist.json' with { type: 'json' };
import clinicalDataManager from './ats-benchmarks/clinical-data-manager.json' with { type: 'json' };
import legalCounsel from './ats-benchmarks/legal-counsel.json' with { type: 'json' };
import aiSolutionsArchitect from './ats-benchmarks/ai-solutions-architect.json' with { type: 'json' };

export interface ATSBenchmark {
  id: string;
  role: string;
  category: string;
  level: string;
  expectedScore: [number, number];
  rawText: string;
  jobDescriptionText?: string;
  sections: string[];
  skills: string[];
  keywords: string[];
  achievementSignals: string[];
  formattingSignals: {
    singleColumn: boolean;
    standardHeadings: boolean;
    tables: boolean;
    graphics: boolean;
    icons: boolean;
    readablePdfText: boolean;
  };
  qualitySignals: {
    quantifiedAchievements: boolean;
    actionVerbs: boolean;
    relevantKeywords: boolean;
    clearDates: boolean;
    careerProgression: boolean;
  };
}

const rawList = [
  softwareEngineer,
  dataScientist,
  marketingManager,
  financialAnalyst,
  productManager,
  entryLevelEngineer,
  engineeringManager,
  salesManager,
  uxDesigner,
  operationsManager,
  devopsCloudEngineer,
  cybersecurityAnalyst,
  frontendDeveloper,
  backendJavaArchitect,
  mobileEngineer,
  machineLearningEngineer,
  qaAutomationEngineer,
  dataEngineer,
  businessAnalyst,
  scrumMaster,
  technicalProgramManager,
  humanResourcesPartner,
  technicalRecruiter,
  customerSuccessManager,
  contentSeoSpecialist,
  executiveAssistant,
  supplyChainSpecialist,
  clinicalDataManager,
  legalCounsel,
  aiSolutionsArchitect
];

export const ATS_BENCHMARKS: ATSBenchmark[] = rawList.map((item: any) => ({
  id: item.resumeId,
  role: item.targetRole,
  category: item.category,
  level: item.experienceLevel,
  expectedScore: item.expectedScore as [number, number],
  rawText: item.rawText,
  jobDescriptionText: item.jobDescriptionText,
  sections: item.sections,
  skills: item.skills,
  keywords: item.keywords,
  achievementSignals: item.achievementSignals,
  formattingSignals: item.formattingSignals,
  qualitySignals: item.qualitySignals
}));

export function getBenchmarkById(id: string): ATSBenchmark | undefined {
  return ATS_BENCHMARKS.find(b => b.id === id);
}

export function getBenchmarksByCategory(category: string): ATSBenchmark[] {
  return ATS_BENCHMARKS.filter(b => b.category.toLowerCase() === category.toLowerCase());
}
