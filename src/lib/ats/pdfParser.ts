import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { ResumeParseResult } from './types.ts';

// Configure pdfjs worker for browser execution
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

export async function parsePdfFile(file: File): Promise<ResumeParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdfDoc = await loadingTask.promise;
    const pageCount = pdfDoc.numPages;
    let fullText = '';

    for (let i = 1; i <= pageCount; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageStrings: string[] = [];

      for (const item of textContent.items) {
        if ('str' in item && typeof item.str === 'string') {
          pageStrings.push(item.str);
        }
      }
      
      fullText += pageStrings.join(' ') + '\n';
    }

    const cleanText = fullText.replace(/\s+/g, ' ').trim();
    const lines = fullText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const reconstructedText = lines.join('\n');
    const finalText = reconstructedText || cleanText;
    const isImageBased = finalText.length < 50 && pageCount > 0;
    const words = finalText
      .split(/\s+/)
      .map(w => w.replace(/[^a-zA-Z0-9+#.-]/g, '').trim())
      .filter(Boolean);

    return {
      text: finalText,
      pageCount,
      isImageBased,
      fileType: 'pdf',
      fileName: file.name,
      fileSize: file.size,
      lines,
      words
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file. The file may be corrupted or password-protected.');
  }
}
