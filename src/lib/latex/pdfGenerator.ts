/**
 * Client-Side Resume LaTeX PDF Synthesizer
 * Converts LaTeX resume markup into a valid standard PDF 1.4 binary Blob
 * featuring selectable text, exact section layouts, bullet points, and real clickable PDF link annotations.
 */

interface ParsedPdfLink {
  url: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
}

interface PdfTextChunk {
  text: string;
  font: string;
  size: number;
  x: number;
  y: number;
  bold?: boolean;
  italic?: boolean;
  isLink?: boolean;
  linkUrl?: string;
}

export function cleanLatexText(str: string): string {
  if (!str) return '';
  let prev = '';
  let curr = str;

  // Pre-cleaning: Remove spacing, math mode delimiters, and font dimension commands
  curr = curr
    .replace(/\\vspace\{[^}]+\}/gi, '')
    .replace(/\\hspace\{[^}]+\}/gi, '')
    .replace(/\\kern\{[^}]+\}/gi, '')
    .replace(/\\vskip\{[^}]+\}/gi, '')
    .replace(/\\hskip\{[^}]+\}/gi, '')
    .replace(/\$+/g, '');

  // Repeat macro stripping until stable (handles nested macros like \small{\item{\textbf{...}}})
  while (curr !== prev) {
    prev = curr;
    curr = curr
      .replace(/\\href\{[^}]+\}\{([^}]+)\}/g, '$1')
      .replace(/\\textbf\{([^}]+)\}/g, '$1')
      .replace(/\\textit\{([^}]+)\}/g, '$1')
      .replace(/\\underline\{([^}]+)\}/g, '$1')
      .replace(/\\small\{([^}]+)\}/g, '$1')
      .replace(/\\Huge\{([^}]+)\}/g, '$1')
      .replace(/\\large\{([^}]+)\}/g, '$1')
      .replace(/\\resumeItem\{([^}]+)\}/g, '$1')
      .replace(/\\scshape\s*/g, '')
      .replace(/\\item\s*/g, '')
      .replace(/\\quad\s*\|\s*\\quad/g, '  |  ')
      .replace(/\\quad/g, '  ')
      .replace(/\\\\/g, '')
      .replace(/\\vspace\{[^}]+\}/gi, '')
      .replace(/\\hspace\{[^}]+\}/gi, '')
      .replace(/\\%|\\&|\\\$|\\#|\\_/g, (match) => match.slice(-1));
  }
  // Strip any remaining unparsed latex macros, standalone braces, and erroneous leading backslashes
  return curr
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[\{\}]/g, '')
    .replace(/^\\+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseLatexMacroArgs(str: string, expectedCount: number): string[] {
  const args: string[] = [];
  let i = 0;
  while (i < str.length && args.length < expectedCount) {
    if (str[i] === '{') {
      let depth = 1;
      let start = i + 1;
      i++;
      while (i < str.length && depth > 0) {
        if (str[i] === '{' && (i === 0 || str[i - 1] !== '\\')) depth++;
        else if (str[i] === '}' && (i === 0 || str[i - 1] !== '\\')) depth--;
        if (depth === 0) break;
        i++;
      }
      args.push(str.substring(start, i));
    }
    i++;
  }
  return args;
}

export function generatePdfBytesFromLatex(latexSource: string): Uint8Array {
  const pageWidth = 612; // Letter width (8.5 * 72)
  const pageHeight = 792; // Letter height (11 * 72)
  const marginX = 45;
  const marginTop = 40;

  const contentWidth = pageWidth - marginX * 2;
  let currentY = pageHeight - marginTop;

  const textChunks: PdfTextChunk[] = [];
  const lineDrawings: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const links: ParsedPdfLink[] = [];

  const rawLines = latexSource.split('\n');

  // Skip preamble: parse lines inside \begin{document} ... \end{document}
  let inDocument = false;
  let inCenter = false;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    if (!line || line.startsWith('%')) continue;

    if (line.includes('\\begin{document}')) {
      inDocument = true;
      continue;
    }
    if (line.includes('\\end{document}')) {
      inDocument = false;
      break;
    }

    if (!inDocument) continue;

    // Center environment (Header: Name & Contact info)
    if (line.includes('\\begin{center}')) {
      inCenter = true;
      continue;
    }
    if (line.includes('\\end{center}')) {
      inCenter = false;
      currentY -= 6;
      continue;
    }

    // Itemize environment wrappers
    if (
      line.includes('\\resumeItemListStart') ||
      line.includes('\\resumeSubHeadingListStart') ||
      line.includes('\\begin{itemize}')
    ) {
      continue;
    }
    if (
      line.includes('\\resumeItemListEnd') ||
      line.includes('\\resumeSubHeadingListEnd') ||
      line.includes('\\end{itemize}')
    ) {
      currentY -= 4;
      continue;
    }

    // Spacing
    const vspaceMatch = line.match(/\\vspace\{(-?\d+)\s*(pt|px|mm)?\}/);
    if (vspaceMatch) {
      const pt = parseInt(vspaceMatch[1], 10);
      if (!isNaN(pt)) {
        currentY += pt;
      }
    }

    // Section header
    if (line.includes('\\section{')) {
      const sectionMatch = line.match(/\\section\{([^}]+)\}/);
      if (sectionMatch) {
        currentY -= 10;
        const sectionTitle = cleanLatexText(sectionMatch[1]).toUpperCase();

        if (sectionTitle) {
          textChunks.push({
            text: sectionTitle,
            font: 'Helvetica-Bold',
            size: 11,
            x: marginX,
            y: currentY,
            bold: true
          });

          currentY -= 4;
          // Horizontal divider rule
          lineDrawings.push({
            x1: marginX,
            y1: currentY,
            x2: pageWidth - marginX,
            y2: currentY
          });
          currentY -= 10;
        }
        continue;
      }
    }

    // Subheading: \resumeSubheading{Title}{Dates}{Company}{Location}
    if (line.includes('\\resumeSubheading')) {
      let fullBlock = line;
      let nextIdx = i + 1;
      while (nextIdx < rawLines.length && parseLatexMacroArgs(fullBlock, 4).length < 4) {
        fullBlock += ' ' + rawLines[nextIdx].trim();
        nextIdx++;
      }
      i = nextIdx - 1;

      const args = parseLatexMacroArgs(fullBlock, 4);

      if (args.length >= 4) {
        const [title, dates, company, location] = args;
        
        // Row 1: Title (left) & Dates (right)
        const cleanTitle = cleanLatexText(title);
        const cleanDates = cleanLatexText(dates);

        if (cleanTitle) {
          textChunks.push({
            text: cleanTitle,
            font: 'Helvetica-Bold',
            size: 10,
            x: marginX,
            y: currentY,
            bold: true
          });
        }

        if (cleanDates) {
          const datesWidth = cleanDates.length * 5.2;
          textChunks.push({
            text: cleanDates,
            font: 'Helvetica',
            size: 9.5,
            x: pageWidth - marginX - datesWidth,
            y: currentY
          });
        }

        currentY -= 13;

        // Row 2: Company (left) & Location (right)
        const cleanCompany = cleanLatexText(company);
        const cleanLocation = cleanLatexText(location);

        if (cleanCompany) {
          textChunks.push({
            text: cleanCompany,
            font: 'Helvetica-Oblique',
            size: 9.5,
            x: marginX,
            y: currentY,
            italic: true
          });
        }

        if (cleanLocation) {
          const locWidth = cleanLocation.length * 5.0;
          textChunks.push({
            text: cleanLocation,
            font: 'Helvetica-Oblique',
            size: 9.5,
            x: pageWidth - marginX - locWidth,
            y: currentY,
            italic: true
          });
        }

        currentY -= 12;
        continue;
      }
    }

    // Project Heading: \resumeProjectHeading{Title}{Role/Date}
    if (line.includes('\\resumeProjectHeading')) {
      let fullBlock = line;
      let nextIdx = i + 1;
      while (nextIdx < rawLines.length && parseLatexMacroArgs(fullBlock, 2).length < 2) {
        fullBlock += ' ' + rawLines[nextIdx].trim();
        nextIdx++;
      }
      i = nextIdx - 1;

      const args = parseLatexMacroArgs(fullBlock, 2);

      if (args.length >= 2) {
        const [projTitle, projRight] = args;
        const cleanTitle = cleanLatexText(projTitle);
        const cleanRight = cleanLatexText(projRight);

        if (cleanTitle) {
          textChunks.push({
            text: cleanTitle,
            font: 'Helvetica-Bold',
            size: 10,
            x: marginX,
            y: currentY,
            bold: true
          });
        }

        if (cleanRight) {
          const rightWidth = cleanRight.length * 5.0;
          textChunks.push({
            text: cleanRight,
            font: 'Helvetica',
            size: 9.5,
            x: pageWidth - marginX - rightWidth,
            y: currentY
          });
        }

        currentY -= 12;
        continue;
      }
    }

    // Bullet item: \resumeItem{...} or \item ...
    if (line.includes('\\resumeItem') || line.includes('\\item')) {
      let itemContent = line;
      if (line.includes('\\resumeItem')) {
        let fullBlock = line;
        let nextIdx = i + 1;
        while (nextIdx < rawLines.length && parseLatexMacroArgs(fullBlock, 1).length < 1) {
          fullBlock += ' ' + rawLines[nextIdx].trim();
          nextIdx++;
        }
        i = nextIdx - 1;
        const parsedArgs = parseLatexMacroArgs(fullBlock, 1);
        itemContent = parsedArgs.length > 0 ? parsedArgs[0] : fullBlock.replace(/\\resumeItem/, '');
      } else {
        itemContent = line.replace(/\\item/, '');
      }

      const bulletX = marginX + 12;
      const textX = bulletX + 10;
      const wrapWidth = pageWidth - marginX - textX;

      const cleaned = cleanLatexText(itemContent);
      if (cleaned) {
        // Render Bullet Symbol
        textChunks.push({
          text: '•',
          font: 'Helvetica',
          size: 9,
          x: bulletX,
          y: currentY
        });

        processRichText(itemContent, textX, currentY, wrapWidth, 9.5, textChunks, links, (deltaY) => {
          currentY -= deltaY;
        });

        currentY -= 3;
      }
      continue;
    }

    // Center header text (Candidate Name & Contact Info)
    if (inCenter) {
      const nameText = cleanLatexText(line);

      if (
        (line.includes('\\Huge') || line.includes('\\large') || line.includes('\\textbf')) &&
        nameText.length > 0 &&
        !nameText.includes('@') &&
        !nameText.includes('http') &&
        !nameText.includes('.com') &&
        !/^\d+(pt|px|mm|cm|in)$/i.test(nameText)
      ) {
        const fontWidthEstimate = nameText.length * 11;
        const startX = Math.max(marginX, (pageWidth - fontWidthEstimate) / 2);

        textChunks.push({
          text: nameText,
          font: 'Helvetica-Bold',
          size: 20,
          x: startX,
          y: currentY,
          bold: true
        });

        currentY -= 22;
        continue;
      }

      if (!nameText || /^\d+(pt|px|mm|cm|in)$/i.test(nameText)) {
        continue;
      }

      // Contact line with links
      processContactLine(line, pageWidth, currentY, textChunks, links);
      currentY -= 14;
      continue;
    }

    // Fallback: render any text line inside document
    const cleanLine = cleanLatexText(line);
    if (cleanLine.length > 0 && !/^\d+(pt|px|mm|cm|in)$/i.test(cleanLine)) {
      processRichText(line, marginX, currentY, contentWidth, 9.5, textChunks, links, (deltaY) => {
        currentY -= deltaY;
      });
      currentY -= 3;
    }
  }

  // Construct PDF Binary Document
  return buildPdfBinary(textChunks, lineDrawings, links, pageWidth, pageHeight);
}

export function generatePdfFromLatex(latexSource: string): Blob {
  const pdfBytes = generatePdfBytesFromLatex(latexSource);
  // pdfBytes.buffer may be SharedArrayBuffer in some environments; .slice() ensures plain ArrayBuffer
  const plain = pdfBytes.buffer instanceof ArrayBuffer
    ? pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength)
    : new Uint8Array(pdfBytes).buffer;
  return new Blob([plain as ArrayBuffer], { type: 'application/pdf' });
}

function processContactLine(
  rawLine: string,
  pageWidth: number,
  y: number,
  textChunks: PdfTextChunk[],
  links: ParsedPdfLink[]
) {
  const cleanedLine = rawLine
    .replace(/\\vspace\{[^}]+\}/gi, '')
    .replace(/\\hspace\{[^}]+\}/gi, '')
    .replace(/\\kern\{[^}]+\}/gi, '')
    .replace(/\$+/g, '')
    .replace(/\\\\/g, '');

  const normalizedLine = cleanedLine
    .replace(/\$\|\$/g, '|')
    .replace(/\\quad\s*\|\s*\\quad/g, '|')
    .replace(/\\quad\|\\quad/g, '|')
    .replace(/\\quad/g, ' ');

  const parts = normalizedLine.split('|');
  const cleanParts = parts
    .map(p => cleanLatexText(p))
    .filter(p => p.length > 0 && !/^\d+(pt|px|mm|cm|in)$/i.test(p));

  if (cleanParts.length === 0) return;

  const totalCleanText = cleanParts.join('  |  ');
  const estWidth = totalCleanText.length * 5.2;
  let currentX = Math.max(45, (pageWidth - estWidth) / 2);

  let renderedCount = 0;
  for (let pIdx = 0; pIdx < parts.length; pIdx++) {
    const part = parts[pIdx].trim();
    if (!part) continue;

    const hrefMatch = part.match(/\\href\{([^}]+)\}\{([^}]+)\}/);
    if (hrefMatch) {
      const url = hrefMatch[1].trim();
      const linkText = cleanLatexText(hrefMatch[2]);
      if (!linkText || /^\d+(pt|px|mm|cm|in)$/i.test(linkText)) continue;

      const linkWidth = linkText.length * 5.2;

      textChunks.push({
        text: linkText,
        font: 'Helvetica',
        size: 9,
        x: currentX,
        y: y,
        isLink: true,
        linkUrl: url
      });

      links.push({
        url,
        text: linkText,
        x: currentX,
        y: y - 2,
        width: linkWidth,
        height: 10,
        page: 1
      });

      currentX += linkWidth;
      renderedCount++;
    } else {
      const plainText = cleanLatexText(part);
      if (plainText && !/^\d+(pt|px|mm|cm|in)$/i.test(plainText)) {
        textChunks.push({
          text: plainText,
          font: 'Helvetica',
          size: 9,
          x: currentX,
          y: y
        });
        currentX += plainText.length * 5.2;
        renderedCount++;
      }
    }

    if (pIdx < parts.length - 1 && renderedCount < cleanParts.length) {
      const sep = '  |  ';
      textChunks.push({
        text: sep,
        font: 'Helvetica',
        size: 9,
        x: currentX,
        y: y
      });
      currentX += sep.length * 5.2;
    }
  }
}

function processRichText(
  rawText: string,
  startX: number,
  startY: number,
  maxWidth: number,
  fontSize: number,
  textChunks: PdfTextChunk[],
  links: ParsedPdfLink[],
  onLineAdvance: (deltaY: number) => void
) {
  const cleanStr = cleanLatexText(rawText);
  if (!cleanStr) return;

  // Extract hrefs first
  const hrefMatches: { url: string; text: string }[] = [];
  const hrefRegex = /\\href\{([^}]+)\}\{([^}]+)\}/g;
  let hMatch;
  while ((hMatch = hrefRegex.exec(rawText)) !== null) {
    hrefMatches.push({ url: hMatch[1], text: cleanLatexText(hMatch[2]) });
  }

  // Word wrapping
  const words = cleanStr.split(/\s+/);
  let currentLine = '';
  let curY = startY;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const testWidth = testLine.length * (fontSize * 0.52);

    if (testWidth > maxWidth && currentLine) {
      textChunks.push({
        text: currentLine,
        font: 'Helvetica',
        size: fontSize,
        x: startX,
        y: curY
      });
      currentLine = word;
      curY -= (fontSize + 3);
      onLineAdvance(fontSize + 3);
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    textChunks.push({
      text: currentLine,
      font: 'Helvetica',
      size: fontSize,
      x: startX,
      y: curY
    });
  }

  for (const h of hrefMatches) {
    links.push({
      url: h.url,
      text: h.text,
      x: startX,
      y: startY - 2,
      width: h.text.length * (fontSize * 0.52),
      height: fontSize + 2,
      page: 1
    });
  }
}

function buildPdfBinary(
  textChunks: PdfTextChunk[],
  lines: { x1: number; y1: number; x2: number; y2: number }[],
  links: ParsedPdfLink[],
  width: number,
  height: number
): Uint8Array {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const xrefOffsets: number[] = [];
  let currentByteOffset = 0;

  function append(str: string): number {
    const bytes = encoder.encode(str);
    chunks.push(bytes);
    const startOffset = currentByteOffset;
    currentByteOffset += bytes.length;
    return startOffset;
  }

  function addObj(content: string): number {
    xrefOffsets.push(currentByteOffset);
    const objNum = xrefOffsets.length;
    append(`${objNum} 0 obj\n${content}\nendobj\n`);
    return objNum;
  }

  // Header
  append(`%PDF-1.4\n%\xFF\xFF\xFF\xFF\n`);

  // 1. Catalog -> Pages is Obj 2
  const catalogObj = addObj(`<< /Type /Catalog /Pages 2 0 R >>`); // Obj 1

  // 2. Pages -> Kids is [3 0 R] (Page object is Obj 3)
  const pagesObj = addObj(`<< /Type /Pages /Kids [3 0 R] /Count 1 >>`); // Obj 2

  // Object IDs allocation
  const fontHelvObjId = 4;
  const fontHelvBoldObjId = 5;
  const fontHelvObliqueObjId = 6;

  const annotObjIds: number[] = [];
  let currentObjId = 7;
  for (let i = 0; i < links.length; i++) {
    annotObjIds.push(currentObjId++);
  }

  const streamObjId = currentObjId;

  // 3. Page Object (Obj 3)
  const annotsArray = annotObjIds.length > 0 ? `/Annots [${annotObjIds.map(id => `${id} 0 R`).join(' ')}]` : '';
  addObj(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 ${fontHelvObjId} 0 R /F2 ${fontHelvBoldObjId} 0 R /F3 ${fontHelvObliqueObjId} 0 R >> >> /Contents ${streamObjId} 0 R ${annotsArray} >>`); // Obj 3

  // 4. Font Helvetica (Obj 4)
  addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);

  // 5. Font Helvetica-Bold (Obj 5)
  addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);

  // 6. Font Helvetica-Oblique (Obj 6)
  addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`);

  // 7..N Annotations
  for (const link of links) {
    const safeUrl = link.url.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    const rect = `[${link.x.toFixed(2)} ${link.y.toFixed(2)} ${(link.x + link.width).toFixed(2)} ${(link.y + link.height).toFixed(2)}]`;
    addObj(`<< /Type /Annot /Subtype /Link /Rect ${rect} /Border [0 0 0] /A << /S /URI /URI (${safeUrl}) >> >>`);
  }

  // Stream Content
  let streamContent = `BT\n0 0 0 rg\n`;
  for (const chunk of textChunks) {
    let fontName = '/F1';
    if (chunk.font === 'Helvetica-Bold' || chunk.bold) fontName = '/F2';
    else if (chunk.font === 'Helvetica-Oblique' || chunk.italic) fontName = '/F3';

    const safeText = chunk.text
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/•/g, '\\225')
      .replace(/—/g, '\\227')
      .replace(/–/g, '\\226');

    streamContent += `${fontName} ${chunk.size} Tf\n`;
    streamContent += `1 0 0 1 ${chunk.x.toFixed(2)} ${chunk.y.toFixed(2)} Tm\n`;
    streamContent += `(${safeText}) Tj\n`;
  }
  streamContent += `ET\n`;

  // Draw Horizontal Rules
  for (const l of lines) {
    streamContent += `0.5 w\n0 0 0 RG\n${l.x1.toFixed(2)} ${l.y1.toFixed(2)} m\n${l.x2.toFixed(2)} ${l.y2.toFixed(2)} l\nS\n`;
  }

  const streamBytes = encoder.encode(streamContent);
  addObj(`<< /Length ${streamBytes.length} >>\nstream\n${streamContent}endstream`);

  // XREF Table
  const startXref = currentByteOffset;
  let xrefTable = `xref\n0 ${xrefOffsets.length + 1}\n0000000000 65535 f \n`;
  for (const offset of xrefOffsets) {
    xrefTable += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${xrefOffsets.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  append(xrefTable + trailer);

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const pdfBytes = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    pdfBytes.set(chunk, offset);
    offset += chunk.length;
  }

  return pdfBytes;
}

