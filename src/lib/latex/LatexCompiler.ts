export interface LatexError {
  line?: number;
  message: string;
  codeSnippet?: string;
}

export interface CompileResult {
  success: boolean;
  pdf?: Uint8Array;
  pdfUrl?: string;
  log?: string;
  errors?: LatexError[];
  pageCount?: number;
}

export interface LatexCompiler {
  initialize?(): Promise<void>;
  compile(source: string): Promise<CompileResult>;
  dispose?(): void;
}
