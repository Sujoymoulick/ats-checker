import type { DocumentChunk, ChunkType } from './types.ts';
import { matchSectionHeading } from '../sections.ts';

export function chunkResumeDocument(text: string, lines: string[]): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  let currentSection = 'other';
  let chunkIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Check if line is a section heading
    const headingMatch = matchSectionHeading(line);
    if (headingMatch && headingMatch.confidence >= 0.7) {
      currentSection = headingMatch.sectionKey;
      chunks.push({
        id: `chunk_${chunkIndex++}`,
        type: mapSectionToChunkType(currentSection),
        text: line,
        lineIndex: i,
        tokens: tokenizeText(line),
        metadata: { isHeading: true, sectionKey: currentSection }
      });
      continue;
    }

    // Classify line chunk based on current section
    const chunkType = determineLineChunkType(line, currentSection, i);
    const tokens = tokenizeText(line);

    chunks.push({
      id: `chunk_${chunkIndex++}`,
      type: chunkType,
      text: line,
      lineIndex: i,
      tokens,
      metadata: { sectionKey: currentSection }
    });
  }

  return chunks;
}

function mapSectionToChunkType(sectionKey: string): ChunkType {
  switch (sectionKey) {
    case 'summary':
    case 'objective':
      return 'summary';
    case 'skills':
      return 'skills';
    case 'experience':
      return 'experience_bullet';
    case 'education':
      return 'education';
    case 'projects':
      return 'project';
    case 'certifications':
      return 'certification';
    default:
      return 'other';
  }
}

function determineLineChunkType(line: string, currentSection: string, lineIndex: number): ChunkType {
  if (lineIndex <= 3 && (line.includes('@') || line.includes('http') || line.includes('linkedin.com') || /\d{3}[-\s]\d{3}/.test(line))) {
    return 'contact';
  }

  if (currentSection === 'experience') {
    return 'experience_bullet';
  }

  if (currentSection === 'skills') {
    return 'skills';
  }

  if (currentSection === 'education') {
    return 'education';
  }

  if (currentSection === 'projects') {
    return 'project';
  }

  if (currentSection === 'certifications') {
    return 'certification';
  }

  if (currentSection === 'summary' || currentSection === 'objective') {
    return 'summary';
  }

  return 'other';
}

export function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, ' ')
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

export function extractNgrams(tokens: string[], n: number = 2): string[] {
  const ngrams: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'did', 'do', 'does', 'doing', 'don', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'isn', 'it', 'its', 'itself', 'just',
  'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'should', 'so',
  'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
  'wasn', 'we', 'were', 'weren', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why',
  'with', 'won', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);
