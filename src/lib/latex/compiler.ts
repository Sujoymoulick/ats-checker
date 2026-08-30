import type { LatexCompiler, CompileResult } from './LatexCompiler';
import { validateLatexSyntax } from './parser';
import { generatePdfBytesFromLatex } from './pdfGenerator';
import { validatePdfBytes } from './pdfUtils';

export class ClientLatexCompiler implements LatexCompiler {
  private worker: Worker | null = null;
  private isWorkerSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'Worker' in window) {
      try {
        this.worker = new Worker(new URL('../../workers/latex.worker.ts', import.meta.url), { type: 'module' });
        this.isWorkerSupported = true;
      } catch (e) {
        this.isWorkerSupported = false;
        this.worker = null;
      }
    }
  }

  async initialize(): Promise<void> {
    // Engine initialization hook
  }

  async compile(source: string): Promise<CompileResult> {
    const errors = validateLatexSyntax(source);

    if (this.worker && this.isWorkerSupported) {
      try {
        const result = await new Promise<CompileResult>((resolve) => {
          if (!this.worker) return resolve(this.compileMainThread(source, errors));

          const handleMessage = (e: MessageEvent) => {
            const message = e.data;
            if (message && message.type === 'compile-result') {
              this.worker?.removeEventListener('message', handleMessage);
              this.worker?.removeEventListener('error', handleError);

              if (message.success && message.pdf) {
                const pdfBytes = message.pdf instanceof Uint8Array ? message.pdf : new Uint8Array(message.pdf);
                try {
                  validatePdfBytes(pdfBytes);
                } catch (vErr: any) {
                  return resolve({
                    success: false,
                    log: vErr.message,
                    errors: [...errors, { line: 1, message: vErr.message }]
                  });
                }
                return resolve({
                  success: true,
                  pdf: pdfBytes,
                  log: message.log,
                  errors: message.errors || errors,
                  pageCount: message.pageCount || 1
                });
              } else {
                return resolve({
                  success: false,
                  log: message.log || 'Compilation failed',
                  errors: message.errors || errors
                });
              }
            }
          };

          const handleError = (_err: any) => {
            this.worker?.removeEventListener('message', handleMessage);
            this.worker?.removeEventListener('error', handleError);
            resolve(this.compileMainThread(source, errors));
          };

          this.worker.addEventListener('message', handleMessage);
          this.worker.addEventListener('error', handleError, { once: true });
          this.worker.postMessage({ type: 'compile', source });
        });

        return result;
      } catch (e) {
        return this.compileMainThread(source, errors);
      }
    }

    return this.compileMainThread(source, errors);
  }

  private compileMainThread(source: string, errors: any[]): CompileResult {
    try {
      const pdfBytes = generatePdfBytesFromLatex(source);
      validatePdfBytes(pdfBytes);

      return {
        success: true,
        pdf: pdfBytes,
        log: errors.length > 0
          ? `Compiled with ${errors.length} notice(s):\n` + errors.map(e => `Line ${e.line || 1}: ${e.message}`).join('\n')
          : 'Compilation completed successfully.\nPDF generated with 1 page.',
        errors,
        pageCount: 1
      };
    } catch (err: any) {
      return {
        success: false,
        log: `Compilation Error: ${err.message || 'Unknown PDF generation error'}`,
        errors: [
          ...errors,
          {
            line: 1,
            message: err.message || 'PDF generation failed'
          }
        ]
      };
    }
  }

  dispose(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export const defaultCompiler = new ClientLatexCompiler();

