import type { LatexError, ATSCompatibilityReport, LinkValidationItem } from './types.ts';
import { matchSectionHeading } from '../ats/sections.ts';

/**
 * Validates LaTeX source code for common syntax errors and returns line-specific error details.
 */
export function validateLatexSyntax(source: string): LatexError[] {
  const errors: LatexError[] = [];
  const lines = source.split('\n');

  const environmentStack: { name: string; line: number }[] = [];
  let totalBraceBalance = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];

    // Ignore unescaped comments
    const commentIdx = getUnescapedIndex(line, '%');
    const code = commentIdx >= 0 ? line.substring(0, commentIdx) : line;

    // Check bracket balance across document
    for (let charIdx = 0; charIdx < code.length; charIdx++) {
      if (code[charIdx] === '{' && !isEscaped(code, charIdx)) totalBraceBalance++;
      if (code[charIdx] === '}' && !isEscaped(code, charIdx)) totalBraceBalance--;
    }

    if (totalBraceBalance < 0) {
      errors.push({
        line: lineNum,
        message: 'Unmatched closing curly brace "}" in line',
        codeSnippet: line.trim()
      });
      totalBraceBalance = 0;
    }

    // Environments: \begin{...} & \end{...}
    const beginMatches = [...code.matchAll(/\\begin\{([a-zA-Z0-9_*]+)\}/g)];
    for (const match of beginMatches) {
      const envName = match[1];
      environmentStack.push({ name: envName, line: lineNum });
    }

    const endMatches = [...code.matchAll(/\\end\{([a-zA-Z0-9_*]+)\}/g)];
    for (const match of endMatches) {
      const envName = match[1];
      if (environmentStack.length === 0) {
        errors.push({
          line: lineNum,
          message: `Unexpected \\end{${envName}} without matching \\begin{${envName}}`,
          codeSnippet: line.trim()
        });
      } else {
        const lastEnv = environmentStack.pop();
        if (lastEnv && lastEnv.name !== envName) {
          // If mismatch isn't due to standard itemize/tabular variants, report error
          if (!isCompatibleEnvMismatch(lastEnv.name, envName)) {
            errors.push({
              line: lineNum,
              message: `Mismatched environment: expected \\end{${lastEnv.name}} (opened line ${lastEnv.line}), found \\end{${envName}}`,
              codeSnippet: line.trim()
            });
          }
        }
      }
    }

    // Undefined macro syntax checks (common typos only)
    const typoMatch = code.match(/\\(begn|edn|seciton|resumeitem|subheadin)\b/);
    if (typoMatch) {
      errors.push({
        line: lineNum,
        message: `Undefined control sequence "\\${typoMatch[1]}". Did you mean "\\${getMacroCorrection(typoMatch[1])}"?`,
        codeSnippet: line.trim()
      });
    }
  }

  // Unclosed brace left in document
  if (totalBraceBalance > 0) {
    errors.push({
      line: lines.length,
      message: 'Unclosed curly brace "{" in document'
    });
  }

  // Unclosed environments left on stack
  for (const env of environmentStack) {
    errors.push({
      line: env.line,
      message: `Unclosed environment \\begin{${env.name}} opened at line ${env.line}`,
      codeSnippet: lines[env.line - 1]?.trim() || ''
    });
  }

  // Ensure document environment exists if long enough
  if (source.length > 100 && !source.includes('\\begin{document}')) {
    errors.push({
      line: 1,
      message: 'Missing \\begin{document} directive'
    });
  }

  return errors;
}

function getUnescapedIndex(str: string, char: string): number {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char && !isEscaped(str, i)) {
      return i;
    }
  }
  return -1;
}

function isEscaped(str: string, index: number): boolean {
  let count = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (str[i] === '\\') count++;
    else break;
  }
  return count % 2 === 1;
}

function isCompatibleEnvMismatch(opened: string, closed: string): boolean {
  if (opened === closed) return true;
  if ((opened === 'tabular*' && closed === 'tabular') || (opened === 'tabular' && closed === 'tabular*')) return true;
  return false;
}

function getMacroCorrection(misspelled: string): string {
  const map: Record<string, string> = {
    begn: 'begin',
    edn: 'end',
    seciton: 'section',
    resumeitem: 'resumeItem',
    subheading: 'resumeSubheading'
  };
  return map[misspelled.toLowerCase()] || misspelled;
}

/**
 * Validates hyperlinks in the LaTeX source for syntax and meaningful visible link text.
 */
export function validateLatexLinks(source: string): LinkValidationItem[] {
  const links: LinkValidationItem[] = [];
  const lines = source.split('\n');
  const hrefRegex = /\\href\{([^}]+)\}\{([^}]+)\}/g;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];

    let match;
    while ((match = hrefRegex.exec(line)) !== null) {
      const url = match[1].trim();
      const text = match[2].trim();
      const isEmail = url.startsWith('mailto:');
      
      let isValid = true;
      let warning: string | undefined;

      if (isEmail) {
        const email = url.replace('mailto:', '');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          isValid = false;
          warning = 'Malformed email address format';
        }
      } else {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          isValid = false;
          warning = 'URL should begin with https://';
        }
      }

      // Check ATS visible link text quality
      const genericTexts = ['click here', 'link', 'website', 'here', 'url'];
      if (genericTexts.includes(text.toLowerCase())) {
        warning = `Avoid generic link text "${text}". For ATS, use explicit visible text like "${url.replace(/^https?:\/\//, '')}"`;
      }

      links.push({
        url,
        text,
        line: lineNum,
        type: isEmail ? 'email' : 'url',
        isValid,
        warning
      });
    }
  }

  return links;
}

/**
 * Audits LaTeX source code for ATS compatibility requirements.
 */
export function auditATSCompatibility(source: string): ATSCompatibilityReport {
  const warnings: string[] = [];

  // Dynamically analyze all \section{...} headings
  const sectionMatches = [...source.matchAll(/\\section\{([^}]+)\}/g)];
  const detectedSectionNames: string[] = [];
  let allHeadingsStandard = true;

  for (const m of sectionMatches) {
    const rawHeading = m[1];
    const match = matchSectionHeading(rawHeading);
    if (match && match.standard) {
      detectedSectionNames.push(match.canonicalName);
    } else {
      allHeadingsStandard = false;
    }
  }

  const uniqueSections = [...new Set(detectedSectionNames)];
  const hasCoreSections = uniqueSections.length >= 2 || (uniqueSections.includes('Education') || uniqueSections.includes('Work Experience') || uniqueSections.includes('Skills'));
  const standardHeadingsPassed = hasCoreSections && allHeadingsStandard;

  const checks = [
    {
      id: 'singleColumn',
      label: 'Single-Column Layout',
      passed: !source.includes('\\begin{multicol}') && !source.includes('twocolumn'),
      details: source.includes('twocolumn')
        ? 'Two-column layout detected. Multi-column layouts confuse ATS parsers.'
        : 'Single column structure ensures clean top-to-bottom parser reading.'
    },
    {
      id: 'textSelectable',
      label: 'Selectable Text Output',
      passed: true,
      details: 'LaTeX compilation produces 100% vector selectable text.'
    },
    {
      id: 'standardHeadings',
      label: 'Standard Section Headings',
      passed: standardHeadingsPassed,
      details: standardHeadingsPassed
        ? `Detected standard sections:\n• ${uniqueSections.join('\n• ')}`
        : 'Non-standard or unrecognized section headers detected. Use standard headers like Experience, Education, Skills, Projects.'
    },
    {
      id: 'noTables',
      label: 'No Complex Tables',
      passed: !source.includes('\\begin{table}') && !source.includes('\\begin{tabular}'),
      warning: source.includes('\\begin{tabular}'),
      details: source.includes('\\begin{tabular}')
        ? 'Tabular environments used. Simple tabular for right-aligned dates is acceptable, but avoid table-based content grids.'
        : 'No complex tables detected.'
    },
    {
      id: 'noGraphics',
      label: 'No Embedded Images/Graphics',
      passed: !source.includes('\\includegraphics') && !source.includes('\\tikz'),
      details: source.includes('\\includegraphics')
        ? 'Embedded image detected. ATS cannot read text embedded inside images.'
        : 'Clean text-only document.'
    },
    {
      id: 'clickableLinks',
      label: 'Clickable Hyperlinks',
      passed: source.includes('\\usepackage[hidelinks]{hyperref}') || source.includes('\\href{'),
      details: 'Contains hyperref package for real clickable hyperlinks.'
    },
    {
      id: 'contactInfo',
      label: 'Contact Information',
      passed: source.includes('mailto:') || source.includes('@') || source.includes('linkedin'),
      details: 'Contact links (Email / LinkedIn / Phone) detected.'
    }
  ];

  const failedChecks = checks.filter(c => !c.passed);
  if (failedChecks.length > 0) {
    failedChecks.forEach(c => warnings.push(c.details));
  }

  return {
    isATSSafe: failedChecks.length === 0,
    checks,
    warnings
  };
}
