export interface LatexError {
  line: number;
  message: string;
  codeSnippet?: string;
}

export interface CompileResult {
  success: boolean;
  pdf?: Blob;
  pdfUrl?: string;
  log?: string;
  errors?: LatexError[];
  pageCount?: number;
}

export interface LatexCompiler {
  compile(source: string): Promise<CompileResult>;
}

export interface ATSCheckItem {
  id: string;
  label: string;
  passed: boolean;
  warning?: boolean;
  details: string;
}

export interface ATSCompatibilityReport {
  isATSSafe: boolean;
  checks: ATSCheckItem[];
  warnings: string[];
}

export interface LinkValidationItem {
  url: string;
  text: string;
  line: number;
  type: 'url' | 'email' | 'other';
  isValid: boolean;
  warning?: string;
}

export interface LatexTemplate {
  id: string;
  name: string;
  category: string;
  targetRole: string;
  description: string;
  latexSource: string;
  expectedScoreRange?: [number, number];
  benchmarkId?: string;
}
