import { generatePdfBytesFromLatex } from '../lib/latex/pdfGenerator';
import { validateLatexSyntax } from '../lib/latex/parser';

// Default export satisfying Cloudflare Worker / Runner module conventions
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    return new Response('LaTeX Worker active', { status: 200 });
  }
};

// Web Worker context for browser-side LaTeX compilation
if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  self.onmessage = async (e: MessageEvent) => {
    const { type, source } = e.data || {};

    if (type === 'compile') {
      try {
        const syntaxErrors = validateLatexSyntax(source);
        if (syntaxErrors.length > 0) {
          self.postMessage({
            type: 'compile-result',
            success: false,
            log: syntaxErrors.map(err => `Line ${err.line}: ${err.message}`).join('\n'),
            errors: syntaxErrors
          });
          return;
        }

        const pdfBytes = generatePdfBytesFromLatex(source);

        self.postMessage(
          {
            type: 'compile-result',
            success: true,
            pdf: pdfBytes,
            log: 'Compilation completed successfully.\nPDF generated with 1 page.',
            errors: [],
            pageCount: 1
          },
          { transfer: [pdfBytes.buffer as ArrayBuffer] }
        );
      } catch (err: any) {
        self.postMessage({
          type: 'compile-result',
          success: false,
          log: err.message || 'Worker compilation failed',
          errors: [{ line: 1, message: err.message || 'Compilation error' }]
        });
      }
    }
  };
}
