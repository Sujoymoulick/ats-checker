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
    const allLines: string[] = [];
    let totalTextChars = 0;

    for (let i = 1; i <= pageCount; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      
      interface TextPosItem {
        str: string;
        x: number;
        y: number;
        hasEOL: boolean;
      }

      const items: TextPosItem[] = [];

      for (const item of textContent.items) {
        if ('str' in item && typeof item.str === 'string') {
          const str = item.str;
          totalTextChars += str.trim().length;
          const x = (item.transform && item.transform[4]) ? item.transform[4] : 0;
          const y = (item.transform && item.transform[5]) ? item.transform[5] : 0;
          const hasEOL = Boolean((item as any).hasEOL);
          if (str.trim().length > 0 || hasEOL) {
            items.push({ str, x, y, hasEOL });
          }
        }
      }

      if (items.length === 0) continue;

      // Group items into visual lines by Y-coordinate proximity
      const linesMap: { y: number; items: TextPosItem[] }[] = [];
      const Y_TOLERANCE = 3.5;

      for (const item of items) {
        let matchedLine = linesMap.find(l => Math.abs(l.y - item.y) <= Y_TOLERANCE);
        if (!matchedLine) {
          matchedLine = { y: item.y, items: [] };
          linesMap.push(matchedLine);
        }
        matchedLine.items.push(item);
      }

      // Sort lines from top of page (highest Y) to bottom (lowest Y)
      linesMap.sort((a, b) => b.y - a.y);

      // Within each line, sort items left to right (lowest X to highest X)
      for (const lineObj of linesMap) {
        lineObj.items.sort((a, b) => a.x - b.x);

        let lineText = '';
        for (const item of lineObj.items) {
          if (!item.str) continue;
          if (lineText.length > 0 && !lineText.endsWith(' ') && !item.str.startsWith(' ')) {
            lineText += ' ';
          }
          lineText += item.str;
        }

        const trimmed = lineText.trim();
        if (trimmed.length > 0) {
          allLines.push(trimmed);
        }
      }
    }

    const reconstructedText = allLines.join('\n');
    const isImageBased = totalTextChars < 50 && pageCount > 0;
    const words = reconstructedText
      .split(/\s+/)
      .map(w => w.replace(/[^a-zA-Z0-9+#.-]/g, '').trim())
      .filter(Boolean);

    return {
      text: reconstructedText,
      pageCount,
      isImageBased,
      fileType: 'pdf',
      fileName: file.name,
      fileSize: file.size,
      lines: allLines,
      words
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file. The file may be corrupted or password-protected.');
  }
}
