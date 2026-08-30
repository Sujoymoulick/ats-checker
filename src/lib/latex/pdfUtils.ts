/**
 * Utility functions for handling PDF byte data, validation, and Blob conversions.
 */

export function pdfBytesToBlob(data: Uint8Array | ArrayBuffer | Blob): Blob {
  if (data instanceof Blob) {
    return data;
  }

  if (data instanceof ArrayBuffer) {
    return new Blob([data], { type: 'application/pdf' });
  }

  if (data instanceof Uint8Array) {
    // .slice() always returns a plain ArrayBuffer (not SharedArrayBuffer), satisfying BlobPart constraint
    const plain = data.buffer instanceof ArrayBuffer
      ? data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
      : new Uint8Array(data).buffer;
    return new Blob([plain as ArrayBuffer], { type: 'application/pdf' });
  }

  throw new Error('Invalid PDF data');
}

export function validatePdfBytes(data: Uint8Array | ArrayBuffer): void {
  let bytes: Uint8Array;
  if (data instanceof Uint8Array) {
    bytes = data;
  } else if (data instanceof ArrayBuffer) {
    bytes = new Uint8Array(data);
  } else {
    throw new Error('Compiler returned data that is not a valid PDF');
  }

  if (bytes.byteLength < 5) {
    throw new Error('Compiler returned empty or truncated PDF data');
  }

  const header = new TextDecoder().decode(bytes.slice(0, 5));
  if (header !== '%PDF-') {
    throw new Error(`Compiler returned data that is not a valid PDF (header: "${header}")`);
  }
}

/**
 * Escapes user-provided plain text strings for safe injection into LaTeX documents.
 * Does NOT escape LaTeX commands, only user text data (e.g. names, companies, descriptions).
 */
export function escapeLatex(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

