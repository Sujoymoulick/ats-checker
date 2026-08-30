import type { LatexTemplate } from './types.ts';
import { ATS_BENCHMARKS } from '../../data/ats-benchmark-index.ts';

export const ATS_TEMPLATES: LatexTemplate[] = [
  {
    id: 'ats-professional',
    name: 'ATS Professional (Default)',
    category: 'General',
    targetRole: 'General ATS Resume',
    description: 'Clean single-column standard ATS template with high readability, selectable text, and clickable hyperlinks.',
    expectedScoreRange: [90, 100],
    latexSource: `\\documentclass[letterpaper,11pt]{article}

\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{{#1 \\vspace{-2pt}}}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

%----------HEADER----------
\\begin{center}
    {\\Huge \\textbf{Alex Johnson}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:alex.johnson@example.com}{alex.johnson@example.com}
    \\quad | \\quad
    +1-555-123-4567
    \\quad | \\quad
    San Francisco, CA \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/alexjohnson}{linkedin.com/in/alexjohnson}
    \\quad | \\quad
    \\href{https://github.com/alexjohnson}{github.com/alexjohnson}
    \\quad | \\quad
    \\href{https://alexjohnson.dev}{alexjohnson.dev}
\\end{center}

%----------SUMMARY----------
\\section{Professional Summary}
Results-driven Software Engineer with 6+ years of experience building scalable backend microservices, RESTful APIs, and cloud infrastructure. Proven track record in optimizing database performance and leading engineering initiatives in Agile teams.

%----------EXPERIENCE----------
\\section{Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Senior Software Engineer}{2022 -- Present}
      {Acme Technologies}{Remote}
      \\resumeItemListStart
        \\resumeItem{Reduced API response latency by 42\\% by redesigning caching architecture with Redis and optimizing SQL queries.}
        \\resumeItem{Architected and deployed microservices handling over 5M daily active requests on AWS EKS with 99.99\\% uptime.}
        \\resumeItem{Mentored 4 junior developers and established code review guidelines across cross-functional engineering pods.}
      \\resumeItemListEnd

    \\resumeSubheading
      {Software Engineer}{2019 -- 2022}
      {CloudScale Systems}{San Francisco, CA}
      \\resumeItemListStart
        \\resumeItem{Developed RESTful microservices using Node.js, TypeScript, and PostgreSQL for financial transaction workflows.}
        \\resumeItem{Automated CI/CD deployment pipelines using GitHub Actions, reducing release deployment cycles from 4 hours to 15 minutes.}
      \\resumeItemListEnd
  \\end{itemize}

%----------PROJECTS----------
\\section{Projects}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeProjectHeading
      {\\href{https://github.com/alexjohnson/ats-builder}{\\textbf{AI Resume Analyzer}}}{GitHub}
      \\resumeItemListStart
        \\resumeItem{Built an open-source ATS resume parsing tool using Python, TypeScript, and WebAssembly with zero data tracking.}
      \\resumeItemListEnd
  \\end{itemize}

%----------SKILLS----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: JavaScript, TypeScript, Python, Java, SQL, HTML, CSS} \\\\
     \\textbf{Frameworks}{: React, Node.js, Express, Next.js, Spring Boot} \\\\
     \\textbf{Cloud \\& Tools}{: AWS, Docker, Kubernetes, PostgreSQL, Redis, Git, CI/CD}
    }}
 \\end{itemize}

%----------EDUCATION----------
\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {University of California, Berkeley}{2015 -- 2019}
      {Bachelor of Science in Computer Science}{GPA: 3.8 / 4.0}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: 'Technology',
    targetRole: 'Senior Software Engineer',
    description: 'Optimized for backend, full-stack, and devops software engineering roles.',
    expectedScoreRange: [90, 100],
    benchmarkId: 'software-engineer',
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Alex Mercer}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:alex.mercer@email.com}{alex.mercer@email.com}
    \\quad | \\quad
    +1 555-019-2834
    \\quad | \\quad
    San Francisco, CA \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/alexmercer-dev}{linkedin.com/in/alexmercer-dev}
    \\quad | \\quad
    \\href{https://github.com/alexmercer}{github.com/alexmercer}
\\end{center}

\\section{Professional Summary}
Results-driven Senior Software Engineer with 8+ years of experience building scalable backend microservices, high-throughput REST APIs, and cloud-native applications on AWS EKS. Proven track record in optimizing database queries and leading engineering teams.

\\section{Work Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Senior Software Engineer}{2021 -- Present}
      {CloudTech Solutions}{San Francisco, CA}
      \\resumeItemListStart
        \\resumeItem{Architected high-throughput microservices using Node.js, TypeScript, and Docker on AWS EKS supporting 10M daily active users.}
        \\resumeItem{Reduced API response times by 45\\% by implementing Redis multi-level caching and optimizing PostgreSQL queries.}
        \\resumeItem{Led team of 6 engineers to migrate monolithic backend to event-driven microservices, improving uptime from 99.2\\% to 99.99\\%.}
        \\resumeItem{Streamlined CI/CD deployment pipelines using GitHub Actions, cutting deployment cycle times by 60\\%.}
      \\resumeItemListEnd

    \\resumeSubheading
      {Software Engineer}{2017 -- 2021}
      {DataScale Systems}{San Jose, CA}
      \\resumeItemListStart
        \\resumeItem{Developed scalable web applications using Java, Spring Boot, and React, increasing platform user engagement by 35\\%.}
        \\resumeItem{Integrated RESTful APIs handling \\$15M+ in annual transactions with 99.9\\% reliability.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: JavaScript, TypeScript, Python, Java, SQL} \\\\
     \\textbf{Frameworks}{: React, Node.js, Express, Spring Boot, Next.js} \\\\
     \\textbf{Infrastructure}{: AWS, Docker, Kubernetes, PostgreSQL, Redis, REST APIs, CI/CD}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {University of California, Berkeley}{2013 -- 2017}
      {Bachelor of Science in Computer Science}{GPA: 3.85 / 4.0}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'Data & Analytics',
    targetRole: 'Senior Data Scientist',
    description: 'Tailored for Machine Learning, Data Science, and Analytics professionals.',
    expectedScoreRange: [88, 98],
    benchmarkId: 'data-scientist',
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Dr. Elena Rostova}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:elena.rostova@data.io}{elena.rostova@data.io}
    \\quad | \\quad
    +1 555-018-9921
    \\quad | \\quad
    New York, NY \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/elena-rostova-ds}{linkedin.com/in/elena-rostova-ds}
    \\quad | \\quad
    \\href{https://github.com/elenarostova}{github.com/elenarostova}
\\end{center}

\\section{Professional Summary}
Senior Data Scientist with 6+ years of expertise building predictive machine learning models, NLP pipelines, and A/B testing infrastructure. Proficient in Python, PyTorch, SQL, and AWS SageMaker.

\\section{Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Senior Data Scientist}{2021 -- Present}
      {InsightAI Corp}{New York, NY}
      \\resumeItemListStart
        \\resumeItem{Developed deep learning NLP models for customer sentiment analysis, increasing classification accuracy by 28\\%.}
        \\resumeItem{Deployed real-time recommendation engines on AWS SageMaker processing 2M daily customer recommendations.}
        \\resumeItem{Architected data pipelines using Apache Spark and Snowflake, reducing ETL pipeline latency by 50\\%.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Python, R, SQL, C++} \\\\
     \\textbf{ML/DL}{: PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy, XGBoost} \\\\
     \\textbf{Data Tools}{: Spark, Snowflake, AWS SageMaker, Docker, Airflow}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Columbia University}{2015 -- 2019}
      {Ph.D. in Data Science \\& Statistics}{New York, NY}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'Product & Management',
    targetRole: 'Senior Product Manager',
    description: 'Designed for Tech Product Managers, Technical PMs, and Product Leaders.',
    expectedScoreRange: [88, 98],
    benchmarkId: 'product-manager',
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Marcus Vance}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:marcus.vance@pm.com}{marcus.vance@pm.com}
    \\quad | \\quad
    +1 555-014-7732
    \\quad | \\quad
    Austin, TX \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/marcusvance-pm}{linkedin.com/in/marcusvance-pm}
\\end{center}

\\section{Professional Summary}
Senior Product Manager with 7+ years of experience launching B2B SaaS products from 0 to 1 and driving product strategy for high-growth tech platforms.

\\section{Work Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Senior Product Manager}{2021 -- Present}
      {SaaSFlow Technologies}{Austin, TX}
      \\resumeItemListStart
        \\resumeItem{Led product roadmap and execution for flagship enterprise SaaS product, driving \\$12M in new ARR.}
        \\resumeItem{Increased user adoption by 40\\% through customer discovery interviews, A/B testing, and onboarding UX revamp.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Skills \\& Competencies}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Product Strategy}{: Product Roadmap, Customer Discovery, Go-To-Market (GTM), A/B Testing} \\\\
     \\textbf{Analytics \\& Tools}{: SQL, Mixpanel, Jira, Figma, Amplitude, Google Analytics}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {University of Texas at Austin}{2012 -- 2016}
      {Bachelor of Business Administration (BBA) in Finance}{}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'marketing-manager',
    name: 'Marketing Manager',
    category: 'Marketing',
    targetRole: 'Growth Marketing Manager',
    description: 'Tailored for Growth Marketing, Digital Campaigns, and Brand Strategy.',
    expectedScoreRange: [85, 95],
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Samantha Reed}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:samantha.reed@marketing.com}{samantha.reed@marketing.com}
    \\quad | \\quad
    +1 555-012-3344
    \\quad | \\quad
    Chicago, IL \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/samanthareed-growth}{linkedin.com/in/samanthareed-growth}
\\end{center}

\\section{Professional Summary}
Results-driven Growth Marketing Manager with 6+ years of experience scaling digital acquisition channels, paid performance marketing, SEO, and email automation campaigns.

\\section{Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Growth Marketing Manager}{2020 -- Present}
      {DigitalPulse Media}{Chicago, IL}
      \\resumeItemListStart
        \\resumeItem{Managed \\$3.5M annual digital marketing budget across Google Ads, Meta, and LinkedIn, generating 150k+ leads.}
        \\resumeItem{Reduced Customer Acquisition Cost (CAC) by 25\\% while increasing conversion rates by 35\\%.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Core Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Marketing}{: Performance Marketing, SEO, SEM, Paid Search, Email Marketing, Hubspot} \\\\
     \\textbf{Analytics}{: Google Analytics 4, Hubspot, Tableau, SQL, Meta Ads Manager}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Northwestern University}{2014 -- 2018}
      {B.S. in Journalism \\& Marketing}{}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analyst',
    category: 'Finance',
    targetRole: 'Senior Financial Analyst',
    description: 'Designed for Corporate Finance, Investment Banking, and Financial Modeling.',
    expectedScoreRange: [85, 95],
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{David Sterling, CFA}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:david.sterling@finance.com}{david.sterling@finance.com}
    \\quad | \\quad
    +1 555-016-4421
    \\quad | \\quad
    Boston, MA \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/davidsterling-cfa}{linkedin.com/in/davidsterling-cfa}
\\end{center}

\\section{Professional Summary}
Detail-oriented Senior Financial Analyst with 5+ years of experience in corporate FP\\&A, financial modeling, valuation, and variance analysis.

\\section{Work Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Senior Financial Analyst}{2021 -- Present}
      {Beacon Financial Group}{Boston, MA}
      \\resumeItemListStart
        \\resumeItem{Built 3-statement financial models and quarterly forecasting for \\$500M enterprise division.}
        \\resumeItem{Identified \\$4.2M in annual operational cost savings through deep-dive expense variance analysis.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Skills \\& Certifications}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Financial Modeling}{: DCF Valuation, FP\\&A, 3-Statement Modeling, LBO Analysis} \\\\
     \\textbf{Software}{: Advanced Excel (VBA/Macros), SQL, SAP, Oracle Financials, Power BI} \\\\
     \\textbf{Certifications}{: Chartered Financial Analyst (CFA)}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Boston College}{2015 -- 2019}
      {Bachelor of Science in Finance \\& Accounting}{Cum Laude}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'graduate-fresher',
    name: 'Graduate / Entry Level',
    category: 'General',
    targetRole: 'Junior Software Engineer / Graduate Analyst',
    description: 'Clean structure highlighting projects, education, academic honors, and coursework.',
    expectedScoreRange: [85, 95],
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Jordan Lee}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:jordan.lee@university.edu}{jordan.lee@university.edu}
    \\quad | \\quad
    +1 555-011-8899
    \\quad | \\quad
    Seattle, WA \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/jordanlee-cs}{linkedin.com/in/jordanlee-cs}
    \\quad | \\quad
    \\href{https://github.com/jordanlee-dev}{github.com/jordanlee-dev}
\\end{center}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {University of Washington}{2020 -- 2024}
      {B.S. in Computer Science}{GPA: 3.82 / 4.0 (Dean's List)}
  \\end{itemize}

\\section{Academic Projects}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeProjectHeading
      {\\href{https://github.com/jordanlee-dev/distributed-kv}{\\textbf{Distributed Key-Value Store}}}{Java, Raft Consensus}
      \\resumeItemListStart
        \\resumeItem{Implemented Raft consensus protocol in Java supporting leader election and log replication.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Software Engineering Intern}{Summer 2023}
      {TechCorp Innovations}{Seattle, WA}
      \\resumeItemListStart
        \\resumeItem{Developed backend microservice in Python FastAPI that automated log parsing for 200+ servers.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Python, Java, C++, JavaScript, SQL} \\\\
     \\textbf{Tools}{: Git, Docker, Linux, REST APIs, React}
    }}
 \\end{itemize}

\\end{document}
`
  },
  {
    id: 'engineering-manager',
    name: 'Engineering Manager',
    category: 'Leadership',
    targetRole: 'Engineering Manager / Director of Engineering',
    description: 'Highlights technical leadership, team scaling, budget, and engineering strategy.',
    expectedScoreRange: [90, 100],
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Rachel Zhang}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:rachel.zhang@eng.com}{rachel.zhang@eng.com}
    \\quad | \\quad
    +1 555-019-9944
    \\quad | \\quad
    San Jose, CA \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/rachelzhang-em}{linkedin.com/in/rachelzhang-em}
\\end{center}

\\section{Professional Summary}
Engineering Leader with 10+ years of technical experience scaling engineering organizations from 10 to 45+ engineers across cloud, platform, and backend teams.

\\section{Leadership Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Engineering Manager}{2020 -- Present}
      {EnterpriseScale Corp}{San Jose, CA}
      \\resumeItemListStart
        \\resumeItem{Grew engineering department from 12 to 38 software engineers across 4 pods (Platform, DevOps, Frontend, Data).}
        \\resumeItem{Managed \\$8M annual cloud infrastructure budget, achieving 30\\% cost reduction through AWS resource optimization.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Core Competencies}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Leadership}{: Organizational Scaling, Technical Strategy, Budget Management, Agile Delivery} \\\\
     \\textbf{Technical Architecture}{: Distributed Systems, AWS Cloud, Kubernetes, Microservices, CI/CD}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Stanford University}{2009 -- 2013}
      {B.S. in Computer Science}{}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'sales-manager',
    name: 'Sales Manager',
    category: 'Sales',
    targetRole: 'Enterprise Sales Manager / VP of Sales',
    description: 'Focused on revenue growth, quota attainment, deal size, and sales management.',
    expectedScoreRange: [85, 95],
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Christopher Cole}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:chris.cole@sales.com}{chris.cole@sales.com}
    \\quad | \\quad
    +1 555-017-6655
    \\quad | \\quad
    Dallas, TX \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/chriscole-sales}{linkedin.com/in/chriscole-sales}
\\end{center}

\\section{Professional Summary}
High-performing Enterprise Sales Manager with 8+ years of experience consistently exceeding quota ($15M+ annual revenue) in B2B SaaS enterprise software sales.

\\section{Sales Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Enterprise Sales Manager}{2021 -- Present}
      {CloudSales Enterprise}{Dallas, TX}
      \\resumeItemListStart
        \\resumeItem{Achieved 145\\% of annual sales quota in 2023, closing \\$18.5M in new enterprise software ARR.}
        \\resumeItem{Built and led team of 8 Account Executives driving average deal size from \\$150k to \\$450k.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Sales Competencies}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Sales Strategy}{: Enterprise Sales, Pipeline Generation, MEDDPICC, Solution Selling, Negotiation} \\\\
     \\textbf{Tools}{: Salesforce, Gong, Outreach, Hubspot, LinkedIn Sales Navigator}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Southern Methodist University}{2011 -- 2015}
      {B.B.A. in Marketing \\& Business Analytics}{}
  \\end{itemize}

\\end{document}
`
  },
  {
    id: 'ux-designer',
    name: 'UX / UI Designer',
    category: 'Design',
    targetRole: 'Senior Product Designer',
    description: 'ATS-compatible single-column layout for UI/UX Designers and Product Designers.',
    expectedScoreRange: [85, 95],
    latexSource: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={•}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{Maya Lin}} \\\\ \\vspace{4pt}
    \\small
    \\href{mailto:maya.lin@design.com}{maya.lin@design.com}
    \\quad | \\quad
    +1 555-013-9911
    \\quad | \\quad
    Los Angeles, CA \\\\ \\vspace{2pt}
    \\href{https://linkedin.com/in/mayalin-ux}{linkedin.com/in/mayalin-ux}
    \\quad | \\quad
    \\href{https://mayalin.design}{mayalin.design}
\\end{center}

\\section{Professional Summary}
Senior Product Designer with 6+ years of experience designing user-centered digital products, design systems, and mobile applications for global platforms.

\\section{Design Experience}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {Senior Product Designer}{2021 -- Present}
      {CreativeApp Studios}{Los Angeles, CA}
      \\resumeItemListStart
        \\resumeItem{Redesigned mobile checkout experience, reducing cart abandonment by 18\\% and boosting revenue by \\$4.2M.}
        \\resumeItem{Established scalable Figma design system adopted by 14 product pods and 60+ engineers.}
      \\resumeItemListEnd
  \\end{itemize}

\\section{Design Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Design Skills}{: User Research, Wireframing, Prototyping, Design Systems, Usability Testing, Figma} \\\\
     \\textbf{Technical}{: HTML5, CSS3, Design Systems, Accessibility (WCAG 2.1), User Testing}
    }}
 \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.0in, label={}]
    \\resumeSubheading
      {University of California, Los Angeles}{2014 -- 2018}
      {B.A. in Design Media Arts}{}
  \\end{itemize}

\\end{document}
`
  }
];

export function getTemplateById(id: string): LatexTemplate | undefined {
  return ATS_TEMPLATES.find(t => t.id === id);
}
