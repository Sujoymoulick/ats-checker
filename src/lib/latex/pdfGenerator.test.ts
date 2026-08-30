import test from 'node:test';
import assert from 'node:assert';
import { generatePdfFromLatex } from './pdfGenerator.ts';

const jakesResumeSource = `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{empty}

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Jake Ryan} \\\\ \\vspace{1pt}
    \\small 123-456-7890 $|$ \\href{mailto:jake@su.edu}{\\underline{jake@su.edu}} $|$ 
    \\href{https://linkedin.com/in/jake}{\\underline{linkedin.com/in/jake}} $|$
    \\href{https://github.com/jake}{\\underline{github.com/jake}}
\\end{center}

\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Southwestern University}{Georgetown, TX}
      {Bachelor of Arts in Computer Science}{Aug. 2018 -- May 2021}
  \\resumeSubHeadingListEnd

\\section{Experience}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Undergraduate Research Assistant}{June 2020 -- Present}
      {Texas A\\&M University}{College Station, TX}
      \\resumeItemListStart
        \\resumeItem{Developed a data-driven system for predicting cell fates.}
        \\resumeItem{Wrote backend pipeline in Python.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Java, Python, C/C++, SQL, JavaScript} \\\\
     \\textbf{Frameworks}{: React, Node.js, Flask}
    }}
 \\end{itemize}

\\end{document}
`;

test('Jake\'s Resume template compiles properly', async () => {
  const blob = generatePdfFromLatex(jakesResumeSource);
  assert.ok(blob.size > 0, 'Blob size should be > 0');
  
  const text = await blob.text();
  console.log('--- JAKE\'S RESUME PDF OUTPUT ---');
  console.log(text);
});

import { cleanLatexText } from './pdfGenerator.ts';
import { escapeLatex } from './pdfUtils.ts';

test('cleanLatexText removes hspace, vspace, math mode $$, and leading backslashes', () => {
  assert.strictEqual(cleanLatexText('\\hspace{10pt} $$ \\hspace{10pt}'), '');
  assert.strictEqual(cleanLatexText('\\\\joydeepjana21@gmail.com'), 'joydeepjana21@gmail.com');
  assert.strictEqual(cleanLatexText('\\\\+91 9832301032'), '+91 9832301032');
  assert.strictEqual(cleanLatexText('$$ [Certificate name] -- [Organization], [Date]'), '[Certificate name] -- [Organization], [Date]');
});

test('escapeLatex escapes special characters without breaking text', () => {
  assert.strictEqual(escapeLatex('R&D & 100% #1_Project $50 {Test}~^'), 'R\\&D \\& 100\\% \\#1\\_Project \\$50 \\{Test\\}\\textasciitilde{}\\textasciicircum{}');
});

