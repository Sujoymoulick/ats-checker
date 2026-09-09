import type { DomainKnowledgeProfile } from './types.ts';

export const DOMAIN_KNOWLEDGE_PROFILES: Record<string, DomainKnowledgeProfile> = {
  'software-engineer': {
    roleCategory: 'software_engineering',
    displayTitle: 'Software Engineer / Fullstack Developer',
    coreSkills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git', 'System Design'],
    secondarySkills: ['GraphQL', 'Redis', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices', 'Unit Testing', 'Tailwind CSS'],
    toolsAndPlatforms: ['AWS', 'GitHub Actions', 'Docker', 'Postman', 'VS Code', 'Jira'],
    recommendedCertifications: ['AWS Certified Developer - Associate', 'Meta Front-End Developer', 'CKAD'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Architected', 'Engineered', 'Refactored', 'Optimized', 'Deployed', 'Automated', 'Scaled', 'Migrated'],
    exemplarBulletPatterns: [
      'Architected and deployed {technology} microservices on {platform}, reducing latency by {X}% for {Y}M daily users.',
      'Refactored legacy {technology} codebase, increasing automated test coverage from {X}% to {Y}% and slashing build times by {Z}%.',
      'Engineered real-time {feature} with {stack}, boosting platform user retention by {X}% and processing ${Y}M in transactions.'
    ],
    commonPitfalls: ['Omitting specific programming languages from work experience', 'Listing tech without project context', 'Lacking quantified performance or scale metrics']
  },
  'devops-cloud-engineer': {
    roleCategory: 'devops_cloud_sre',
    displayTitle: 'DevOps & Cloud Platform Engineer / SRE',
    coreSkills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'GitHub Actions', 'Prometheus', 'Grafana', 'GitOps'],
    secondarySkills: ['GCP', 'Azure', 'Helm', 'ArgoCD', 'Ansible', 'Datadog', 'Python', 'Bash', 'Vault', 'SOC 2'],
    toolsAndPlatforms: ['AWS EKS', 'Terraform Cloud', 'ArgoCD', 'Prometheus', 'Datadog', 'HashiCorp Vault'],
    recommendedCertifications: ['AWS Certified DevOps Engineer - Professional', 'Certified Kubernetes Administrator (CKA)', 'HashiCorp Certified Terraform Associate'],
    targetMetricDensity: 0.70,
    exemplarActionVerbs: ['Automated', 'Provisioned', 'Containerized', 'Orchestrated', 'Hardened', 'Streamlined', 'Decreased', 'Migrated'],
    exemplarBulletPatterns: [
      'Architected multi-region {cloud} infrastructure using {IaC}, reducing deployment provisioning time from {X} to {Y}.',
      'Containerized {X}+ microservices with Docker and Kubernetes (EKS), cutting monthly cloud compute spend by ${Y}K.',
      'Implemented Prometheus and Grafana observability stack, reducing Mean Time to Resolution (MTTR) by {X}%.'
    ],
    commonPitfalls: ['Failing to specify cloud provider and IaC tools', 'Not mentioning uptime SLAs or MTTR improvements', 'Leaving out CI/CD tooling details']
  },
  'cybersecurity-analyst': {
    roleCategory: 'cybersecurity_infosec',
    displayTitle: 'Cybersecurity & SOC / Threat Intelligence Analyst',
    coreSkills: ['SIEM', 'Splunk', 'CrowdStrike', 'EDR', 'Incident Response', 'Vulnerability Management', 'NIST CSF', 'MITRE ATT&CK', 'SOC 2', 'Python'],
    secondarySkills: ['Microsoft Sentinel', 'Tenable Nessus', 'Qualys', 'Wireshark', 'IAM', 'Firewalls', 'Zero Trust', 'PCI-DSS', 'ISO 27001'],
    toolsAndPlatforms: ['Splunk Enterprise', 'CrowdStrike Falcon', 'Tenable Nessus', 'Wireshark', 'Okta', 'Cortex XSOAR'],
    recommendedCertifications: ['CISSP', 'CompTIA Security+', 'GIAC Certified Incident Handler (GCIH)', 'CEH'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Investigated', 'Mitigated', 'Neutralized', 'Triaged', 'Remediated', 'Audited', 'Hardened', 'Defended'],
    exemplarBulletPatterns: [
      'Monitored and triaged {X}+ daily security alerts in {SIEM}, reducing Mean Time to Detect (MTTD) by {Y}%.',
      'Engineered {X}+ custom correlation rules mapped to MITRE ATT&CK, decreasing false positive alarms by {Y}%.',
      'Conducted vulnerability assessments with {tool}, prioritizing remediation for {X}+ high and critical CVEs across {Y} endpoints.'
    ],
    commonPitfalls: ['Not citing recognized security frameworks (NIST, MITRE)', 'Omitting specific SIEM/EDR tool names', 'Failing to quantify incident volume or response speed']
  },
  'frontend-developer': {
    roleCategory: 'frontend_engineering',
    displayTitle: 'Senior Frontend / UI Engineer',
    coreSkills: ['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'GraphQL', 'Redux Toolkit', 'Core Web Vitals'],
    secondarySkills: ['Storybook', 'Jest', 'Playwright', 'Zustand', 'REST APIs', 'WCAG 2.1 AA', 'Webpack', 'Vite'],
    toolsAndPlatforms: ['Vercel', 'Figma', 'Storybook', 'Chrome DevTools', 'GitHub', 'Sentry'],
    recommendedCertifications: ['Meta Front-End Developer Professional Certificate', 'AWS Cloud Practitioner'],
    targetMetricDensity: 0.60,
    exemplarActionVerbs: ['Engineered', 'Optimized', 'Designed', 'Integrated', 'Standardized', 'Accelerated', 'Implemented', 'Refactored'],
    exemplarBulletPatterns: [
      'Optimized Core Web Vitals (LCP/CLS) using Next.js Server Components, reducing page load time by {X}% and boosting conversion by {Y}%.',
      'Architected enterprise component design system in React and Storybook, adopted across {X} engineering squads and {Y} apps.',
      'Authored automated test suites with Playwright and Jest, increasing frontend test coverage from {X}% to {Y}%.'
    ],
    commonPitfalls: ['Lacking web performance / Core Web Vitals metrics', 'Ignoring accessibility (WCAG) compliance', 'Listing CSS without modern frameworks (Tailwind/Design Systems)']
  },
  'backend-java-architect': {
    roleCategory: 'backend_architecture',
    displayTitle: 'Principal Backend Architect (Java / Distributed Systems)',
    coreSkills: ['Java', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Microservices', 'Distributed Systems', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
    secondarySkills: ['gRPC', 'Domain-Driven Design (DDD)', 'Hibernate', 'SQL', 'Terraform', 'Prometheus', 'Event-Driven Architecture'],
    toolsAndPlatforms: ['Spring Cloud', 'Kafka Streams', 'PostgreSQL', 'AWS EKS', 'Docker', 'Grafana'],
    recommendedCertifications: ['Oracle Certified Master Java Enterprise Architect', 'Confluent Certified Developer for Apache Kafka (CCDAK)', 'AWS Solutions Architect Professional'],
    targetMetricDensity: 0.70,
    exemplarActionVerbs: ['Architected', 'Spearheaded', 'Decoupled', 'Scaled', 'Sharded', 'Optimized', 'Governed', 'Engineered'],
    exemplarBulletPatterns: [
      'Architected high-throughput transaction engine with Java and Kafka, processing {X}+ TPS with sub-{Y}ms p99 latency.',
      'Decoupled legacy monolith into {X} event-driven microservices on Kubernetes, improving system availability to 99.99%.',
      'Designed multi-region PostgreSQL sharding and Redis caching strategy, cutting database query load by {X}%.'
    ],
    commonPitfalls: ['Omitting throughput and concurrency numbers (TPS, QPS, latency)', 'Not mentioning architectural paradigms (Event-driven, Microservices)', 'Lacking database optimization specifics']
  },
  'mobile-engineer': {
    roleCategory: 'mobile_engineering',
    displayTitle: 'Mobile Application Engineer (iOS & Android)',
    coreSkills: ['React Native', 'Swift', 'Kotlin', 'TypeScript', 'iOS', 'Android', 'SwiftUI', 'Jetpack Compose', 'Fastlane', 'Redux'],
    secondarySkills: ['GraphQL', 'REST APIs', 'SQLite', 'Firebase', 'Bluetooth LE', 'HealthKit', 'App Store Optimization', 'Detox'],
    toolsAndPlatforms: ['Xcode', 'Android Studio', 'Fastlane', 'TestFlight', 'Google Play Console', 'Firebase Crashlytics'],
    recommendedCertifications: ['Meta Certified React Native Specialist', 'Apple Certified iOS Developer'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Shipped', 'Architected', 'Published', 'Optimized', 'Integrated', 'Streamlined', 'Reduced', 'Refactored'],
    exemplarBulletPatterns: [
      'Shipped cross-platform {framework} app to Apple App Store and Google Play with {X}M+ active users and {Y}+ star rating.',
      'Optimized app cold launch time from {X}s to {Y}s and reduced memory usage by {Z}% using native profiling.',
      'Automated mobile CI/CD deployment with Fastlane and GitHub Actions, cutting release cycles from {X} days to {Y} hours.'
    ],
    commonPitfalls: ['Not mentioning App Store ratings or user download scale', 'Omitting mobile release tooling (Fastlane/TestFlight)', 'Leaving out crash-free session metrics']
  },
  'machine-learning-engineer': {
    roleCategory: 'ai_machine_learning',
    displayTitle: 'Machine Learning & AI Engineer',
    coreSkills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'RAG', 'LangChain', 'Vector Databases', 'Pinecone', 'Hugging Face', 'MLOps', 'SQL'],
    secondarySkills: ['MLflow', 'Kubeflow', 'Docker', 'Kubernetes', 'vLLM', 'TensorRT', 'AWS SageMaker', 'Apache Spark', 'Scikit-learn'],
    toolsAndPlatforms: ['AWS SageMaker', 'Pinecone', 'Qdrant', 'MLflow', 'Triton Inference Server', 'Hugging Face Hub'],
    recommendedCertifications: ['AWS Certified Machine Learning - Specialty', 'DeepLearning.AI TensorFlow / NLP Specialization'],
    targetMetricDensity: 0.70,
    exemplarActionVerbs: ['Trained', 'Fine-Tuned', 'Architected', 'Deployed', 'Optimized', 'Evaluated', 'Scaled', 'Engineered'],
    exemplarBulletPatterns: [
      'Architected enterprise RAG system with PyTorch, LangChain, and Pinecone, indexing {X}M+ documents with {Y}% retrieval accuracy.',
      'Optimized LLM inference with vLLM and TensorRT on NVIDIA A100 GPUs, cutting latency from {X}s to {Y}ms and compute costs by {Z}%.',
      'Fine-tuned domain-specific transformer models using LoRA/QLoRA, improving F1 score by {X}% over baseline.'
    ],
    commonPitfalls: ['Listing algorithms without deployment/MLOps context', 'Lacking model accuracy (F1, AUC, latency, CTR) numbers', 'Not highlighting modern LLM/RAG vector search skills']
  },
  'data-engineer': {
    roleCategory: 'data_engineering',
    displayTitle: 'Data Platform & Analytics Engineer',
    coreSkills: ['Snowflake', 'dbt', 'Python', 'SQL', 'Apache Spark', 'Apache Airflow', 'Apache Kafka', 'Data Modeling', 'ETL', 'AWS'],
    secondarySkills: ['BigQuery', 'Redshift', 'Delta Lake', 'Great Expectations', 'PostgreSQL', 'Docker', 'Terraform', 'CI/CD'],
    toolsAndPlatforms: ['Snowflake', 'dbt Cloud', 'Apache Airflow', 'AWS S3', 'Fivetran', 'Datadog'],
    recommendedCertifications: ['SnowPro Core Certified', 'dbt Certified Developer', 'AWS Certified Data Analytics - Specialty'],
    targetMetricDensity: 0.70,
    exemplarActionVerbs: ['Architected', 'Engineered', 'Automated', 'Modeled', 'Orchestrated', 'Optimized', 'Ingested', 'Validated'],
    exemplarBulletPatterns: [
      'Architected modern data warehouse with Snowflake and dbt, processing {X}TB+ daily data for {Y}+ internal stakeholders.',
      'Refactored legacy SQL pipelines into modular dbt dimensional models, slashing runtimes by {X}% and saving ${Y}K in compute.',
      'Built real-time streaming pipeline using Kafka and Spark, reducing analytics dashboard latency from {X} hours to {Y} seconds.'
    ],
    commonPitfalls: ['Failing to specify data volume (GB/TB/PB) or pipeline SLAs', 'Omitting orchestration (Airflow/Prefect) and transformation (dbt) tools', 'Not mentioning data quality or testing frameworks']
  },
  'data-scientist': {
    roleCategory: 'data_science',
    displayTitle: 'Data Scientist / Quantitative Analyst',
    coreSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistical Modeling', 'A/B Testing', 'Pandas', 'Scikit-learn', 'Tableau', 'Hypothesis Testing'],
    secondarySkills: ['Deep Learning', 'PyTorch', 'XGBoost', 'Power BI', 'BigQuery', 'Snowflake', 'Data Visualization', 'Feature Engineering'],
    toolsAndPlatforms: ['Jupyter', 'Tableau', 'AWS', 'GitHub', 'Snowflake', 'Looker'],
    recommendedCertifications: ['AWS Machine Learning Specialty', 'Google Professional Data Engineer', 'SAS Certified Data Scientist'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Modeled', 'Analyzed', 'Predicted', 'Quantified', 'Engineered', 'Discovered', 'Automated', 'Formulated'],
    exemplarBulletPatterns: [
      'Built predictive churn model using XGBoost and Scikit-learn, improving customer retention by {X}% and saving ${Y}M.',
      'Designed and analyzed {X}+ multi-variant A/B tests across {Y}M active users, driving a {Z}% lift in conversion rate.',
      'Engineered automated feature extraction pipelines in SQL and Python, reducing model training time by {X}%.'
    ],
    commonPitfalls: ['Focusing purely on academic theory without business ROI impact', 'Omitting A/B testing and experimentation rigor', 'Failing to mention SQL and business intelligence tools']
  },
  'qa-automation-engineer': {
    roleCategory: 'qa_quality_engineering',
    displayTitle: 'QA Automation Engineer & Test Architect',
    coreSkills: ['Playwright', 'Cypress', 'Selenium', 'TypeScript', 'JavaScript', 'API Testing', 'Postman', 'k6', 'Jest', 'CI/CD'],
    secondarySkills: ['Python', 'Java', 'Appium', 'SQL', 'GitHub Actions', 'Jenkins', 'Docker', 'BDD Cucumber', 'TestRail'],
    toolsAndPlatforms: ['Playwright', 'Cypress Cloud', 'Postman', 'GitHub Actions', 'Jira', 'BrowserStack'],
    recommendedCertifications: ['ISTQB Certified Tester Advanced Level - Test Automation Engineer', 'ISTQB Foundation (CTFL)'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Automated', 'Architected', 'Executed', 'Intercepted', 'Orchestrated', 'Reduced', 'Standardized', 'Verified'],
    exemplarBulletPatterns: [
      'Designed end-to-end test automation framework with TypeScript and Playwright, executing {X}+ automated tests across all browsers.',
      'Reduced regression test suite execution time by {X}% (from {Y} hours to {Z} minutes) via parallel GitHub Actions runners.',
      'Built automated API test suite covering {X}% of endpoints, catching {Y}+ critical bugs before production release.'
    ],
    commonPitfalls: ['Listing manual testing duties without automated code coverage', 'Omitting framework names (Playwright, Cypress) and languages', 'Not quantifying reduction in bug escape rates or test execution times']
  },
  'product-manager': {
    roleCategory: 'product_management',
    displayTitle: 'Senior Product Manager',
    coreSkills: ['Product Strategy', 'Roadmapping', 'Agile', 'Scrum', 'User Stories', 'A/B Testing', 'Data Analytics', 'SQL', 'User Research', 'GTM'],
    secondarySkills: ['Jira', 'Figma', 'Amplitude', 'Mixpanel', 'Market Sizing', 'Stakeholder Management', 'PRDs', 'Feature Prioritization'],
    toolsAndPlatforms: ['Jira', 'Amplitude', 'Mixpanel', 'Figma', 'Confluence', 'Pendo'],
    recommendedCertifications: ['Product School Certified Product Manager (CPM)', 'Pragmatic Institute Certified', 'PSPO I'],
    targetMetricDensity: 0.70,
    exemplarActionVerbs: ['Spearheaded', 'Launched', 'Defined', 'Prioritized', 'Grew', 'Validated', 'Scaled', 'Negotiated'],
    exemplarBulletPatterns: [
      'Spearheaded end-to-end product lifecycle for {product}, driving ${X}M in new ARR and increasing active users by {Y}%.',
      'Defined product vision, roadmap, and PRDs across {X} engineering squads, shipping {Y} major features ahead of schedule.',
      'Leveraged user research and Amplitude product analytics to optimize checkout flow, improving conversion funnel by {X}%.'
    ],
    commonPitfalls: ['Describing daily tasks instead of product outcomes and business metrics (ARR, MAU, retention)', 'Failing to mention data-driven decision making and analytics tools', 'Lacking cross-functional leadership signals']
  },
  'business-analyst': {
    roleCategory: 'business_analysis',
    displayTitle: 'Senior Business Systems Analyst',
    coreSkills: ['Business Analysis', 'Requirements Elicitation', 'BRD', 'FSD', 'User Stories', 'BPMN', 'SQL', 'Tableau', 'Power BI', 'UAT', 'Jira'],
    secondarySkills: ['Gap Analysis', 'Agile', 'Advanced Excel', 'Lucidchart', 'Visio', 'Confluence', 'Root Cause Analysis', 'Salesforce'],
    toolsAndPlatforms: ['Jira', 'Confluence', 'Tableau', 'Power BI', 'SQL Server', 'Lucidchart'],
    recommendedCertifications: ['Certified Business Analysis Professional (CBAP) - IIBA', 'PMI-PBA', 'PSPO I'],
    targetMetricDensity: 0.60,
    exemplarActionVerbs: ['Elicited', 'Mapped', 'Engineered', 'Facilitated', 'Streamlined', 'Analyzed', 'Authored', 'Coordinated'],
    exemplarBulletPatterns: [
      'Led requirements gathering and process re-engineering for ${X}M systems migration, reducing turnaround time from {Y} days to {Z} hours.',
      'Authored {X}+ detailed BRDs, user stories, and acceptance criteria in Jira, facilitating sprint delivery across {Y} business units.',
      'Built automated Tableau dashboards querying Snowflake/SQL, delivering real-time KPI insights and saving ${X}M in operating costs.'
    ],
    commonPitfalls: ['Not specifying requirement documentation types (BRDs, FSDs, user stories)', 'Failing to mention SQL or BI dashboarding capabilities', 'Omitting UAT facilitation metrics']
  },
  'scrum-master': {
    roleCategory: 'agile_delivery',
    displayTitle: 'Scrum Master & Agile Delivery Coach',
    coreSkills: ['Scrum', 'Kanban', 'SAFe', 'Agile Coaching', 'Sprint Planning', 'Sprint Retrospectives', 'Jira', 'Velocity Tracking', 'Servant Leadership'],
    secondarySkills: ['Confluence', 'Miro', 'PI Planning', 'Backlog Refinement', 'Cycle Time', 'OKRs', 'Team Facilitation', 'Burndown'],
    toolsAndPlatforms: ['Jira Software', 'Confluence', 'Miro', 'Azure DevOps', 'Slack'],
    recommendedCertifications: ['Certified ScrumMaster (CSM)', 'Advanced Certified ScrumMaster (A-CSM)', 'SAFe Scrum Master (SSM)'],
    targetMetricDensity: 0.60,
    exemplarActionVerbs: ['Coached', 'Facilitated', 'Optimized', 'Removed', 'Boosted', 'Spearheaded', 'Standardized', 'Trained'],
    exemplarBulletPatterns: [
      'Facilitated Scrum ceremonies for {X} engineering squads totaling {Y} developers, improving sprint predictability from {Z}% to {W}%.',
      'Spearheaded SAFe Agile transformation and PI planning for {X}+ stakeholders, accelerating feature time-to-market by {Y}%.',
      'Coached Product Owners on backlog decomposition and WIP limits, increasing average team velocity by {X}% within 6 months.'
    ],
    commonPitfalls: ['Listing standard Scrum ceremonies without showing velocity or delivery improvements', 'Omitting recognized certifications (CSM, SAFe)', 'Lacking metric-driven agile governance results']
  },
  'technical-program-manager': {
    roleCategory: 'program_management',
    displayTitle: 'Principal Technical Program Manager (TPM)',
    coreSkills: ['Technical Program Management', 'Cloud Migrations', 'Roadmap Planning', 'Risk Mitigation', 'Critical Path Analysis', 'Stakeholder Management', 'AWS', 'Jira', 'PMP'],
    secondarySkills: ['Confluence', 'Agile', 'SDLC Governance', 'Budget Management', 'RACI Matrix', 'Microservices', 'Distributed Systems'],
    toolsAndPlatforms: ['Jira', 'Confluence', 'SmartSheet', 'MS Project', 'AWS Console', 'Tableau'],
    recommendedCertifications: ['Project Management Professional (PMP)', 'PMI Agile Certified Practitioner (PMI-ACP)', 'AWS Cloud Practitioner'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Orchestrated', 'Delivered', 'Governed', 'Spearheaded', 'Mitigated', 'Aligned', 'Standardized', 'Executed'],
    exemplarBulletPatterns: [
      'Orchestrated cross-functional cloud migration program spanning {X} engineering squads, migrating {Y}+ services and saving ${Z}M annually.',
      'Governed a ${X}M strategic engineering portfolio, delivering {Y}% of critical milestones on schedule and within budget.',
      'Identified and resolved high-impact cross-team dependencies and architectural blockers, accelerating release cadence by {X}%.'
    ],
    commonPitfalls: ['Focusing only on project coordination without technical architecture depth', 'Failing to mention program budget sizes ($M+) and scale', 'Leaving out risk mitigation and critical path methods']
  },
  'human-resources-partner': {
    roleCategory: 'human_resources',
    displayTitle: 'Senior HR Business Partner (HRBP)',
    coreSkills: ['Talent Management', 'Employee Relations', 'Organizational Design', 'Workday HRIS', 'Performance Management', 'Compensation Structuring', 'Employment Law', 'SHRM-SCP'],
    secondarySkills: ['Culture Amp', 'Lattice', 'Succession Planning', 'HR Analytics', 'Turnover Reduction', 'DEI Strategy', 'EEOC', 'FLSA'],
    toolsAndPlatforms: ['Workday', 'Culture Amp', 'Lattice', 'BambooHR', 'LinkedIn Talent Insights'],
    recommendedCertifications: ['SHRM-SCP', 'Senior Professional in Human Resources (SPHR) - HRCI'],
    targetMetricDensity: 0.60,
    exemplarActionVerbs: ['Partnered', 'Designed', 'Executed', 'Restructured', 'Decreased', 'Spearheaded', 'Calibrated', 'Resolved'],
    exemplarBulletPatterns: [
      'Partnered with C-suite leadership across {X} employees, reducing voluntary annual turnover from {Y}% to {Z}% and saving ${W}M in hiring costs.',
      'Spearheaded enterprise talent review and compensation calibration in Workday across {X} managers with zero compliance violations.',
      'Overhauled onboarding and leadership coaching programs, improving 90-day retention to {X}% and employee satisfaction by {Y} points.'
    ],
    commonPitfalls: ['Failing to quantify turnover reduction or headcount scale', 'Omitting enterprise HRIS systems (Workday, SuccessFactors)', 'Not citing compliance standards and employment law knowledge']
  },
  'technical-recruiter': {
    roleCategory: 'talent_acquisition',
    displayTitle: 'Senior Technical Recruiter & Sourcing Lead',
    coreSkills: ['Technical Recruiting', 'Full-Cycle Recruiting', 'Greenhouse ATS', 'LinkedIn Recruiter', 'Boolean Search', 'Offer Negotiation', 'Sourcing', 'Time-to-Hire'],
    secondarySkills: ['Lever', 'Gem', 'Ashby', 'Diversity Sourcing', 'Candidate Experience', 'HackerRank', 'Pipeline Analytics', 'Compensation Banding'],
    toolsAndPlatforms: ['Greenhouse', 'LinkedIn Recruiter', 'Gem', 'Lever', 'GoodTime', 'Codility'],
    recommendedCertifications: ['Certified Diversity and Inclusion Recruiter (CDR)', 'LinkedIn Certified Professional Recruiter'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Sourced', 'Closed', 'Negotiated', 'Screened', 'Accelerated', 'Partnered', 'Streamlined', 'Built'],
    exemplarBulletPatterns: [
      'Managed full-cycle technical recruiting for Engineering and AI teams, closing {X}+ senior hires annually with an {Y}% offer acceptance rate.',
      'Reduced average time-to-hire from {X} days to {Y} days while increasing hiring manager satisfaction to {Z}%.',
      'Built proactive outbound sourcing campaigns using LinkedIn Recruiter and Boolean search, achieving a {X}% cold response rate.'
    ],
    commonPitfalls: ['Failing to mention exact ATS platforms (Greenhouse/Lever)', 'Omitting critical recruiting metrics (Offer acceptance rate, Time-to-fill, Hires/year)', 'Not stating engineering disciplines recruited']
  },
  'customer-success-manager': {
    roleCategory: 'customer_success',
    displayTitle: 'Enterprise Customer Success Manager (CSM)',
    coreSkills: ['Customer Success', 'Enterprise SaaS', 'Gainsight', 'Salesforce CRM', 'Net Revenue Retention (NRR)', 'QBRs', 'Churn Reduction', 'Account Expansion', 'Onboarding'],
    secondarySkills: ['Customer Health Scoring', 'Gross Retention Rate', 'Zendesk', 'Mixpanel', 'CSAT', 'NPS', 'Stakeholder Management', 'Renewals'],
    toolsAndPlatforms: ['Gainsight', 'Salesforce', 'ChurnZero', 'Zendesk', 'Mixpanel', 'HubSpot'],
    recommendedCertifications: ['Certified Customer Success Manager (CCSM) Level 3', 'Salesforce Certified Administrator'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Retained', 'Expanded', 'Delivered', 'Onboarded', 'Mitigated', 'Negotiated', 'Facilitated', 'Grew'],
    exemplarBulletPatterns: [
      'Managed portfolio of {X} enterprise accounts representing ${Y}M in ARR, achieving {Z}% Net Revenue Retention (NRR).',
      'Delivered {X}+ Executive Business Reviews (QBRs) with C-level stakeholders, driving ${Y}M in up-sell and contract expansion.',
      'Developed proactive health scoring models in Gainsight, identifying churn risks early and saving {X} at-risk accounts (${Y}M ARR).'
    ],
    commonPitfalls: ['Omitting portfolio ARR value and Net Revenue Retention (NRR) percentages', 'Not mentioning CS platforms (Gainsight, ChurnZero)', 'Failing to highlight executive QBR facilitation experience']
  },
  'content-seo-specialist': {
    roleCategory: 'seo_content_marketing',
    displayTitle: 'Lead SEO Strategist & Content Operations Lead',
    coreSkills: ['SEO', 'Content Strategy', 'Ahrefs', 'Semrush', 'Google Search Console', 'Google Analytics 4 (GA4)', 'Technical SEO', 'Keyword Research', 'Schema Markup'],
    secondarySkills: ['Screaming Frog', 'Topic Clusters', 'Core Web Vitals', 'WordPress', 'SurferSEO', 'Looker Studio', 'Link Building', 'HTML/CSS'],
    toolsAndPlatforms: ['Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'GA4', 'WordPress'],
    recommendedCertifications: ['Google Analytics 4 Certification', 'Semrush Technical SEO Certification', 'HubSpot Inbound Marketing'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Scaled', 'Optimized', 'Audited', 'Published', 'Ranked', 'Captured', 'Grew', 'Engineered'],
    exemplarBulletPatterns: [
      'Scaled monthly organic search traffic from {X}K to {Y}M visits ({Z}% growth) generating ${W}M in attributed revenue.',
      'Conducted technical SEO audits using Screaming Frog and GSC, resolving {X}+ crawl errors and boosting rich snippet CTR by {Y}%.',
      'Designed topic cluster strategy capturing {X}+ page-one Google rankings for high-intent competitive keywords.'
    ],
    commonPitfalls: ['Listing content creation without organic traffic numbers or keyword rankings', 'Omitting technical SEO tools (Ahrefs, Screaming Frog, GSC)', 'Lacking revenue attribution metrics']
  },
  'executive-assistant': {
    roleCategory: 'executive_support',
    displayTitle: 'Senior Executive Assistant to C-Suite',
    coreSkills: ['Executive Support', 'C-Suite Calendar Management', 'Board of Directors Meetings', 'Travel Logistics', 'Concur Expense Management', 'Confidentiality', 'Event Planning'],
    secondarySkills: ['Google Workspace', 'Microsoft Office 365', 'PowerPoint', 'DocuSign', 'Meeting Minutes', 'Vendor Negotiation', 'Budget Oversight'],
    toolsAndPlatforms: ['Microsoft 365', 'Google Workspace', 'Concur', 'DocuSign', 'Slack', 'Zoom'],
    recommendedCertifications: ['Certified Administrative Professional (CAP)', 'Project Management Essentials (PMEC)'],
    targetMetricDensity: 0.55,
    exemplarActionVerbs: ['Coordinated', 'Managed', 'Organized', 'Prepared', 'Negotiated', 'Screened', 'Orchestrated', 'Audited'],
    exemplarBulletPatterns: [
      'Managed dynamic calendar and international travel logistics for CEO across {X} timezones, boosting executive efficiency by {Y}%.',
      'Compiled and distributed {X}+ page board decks and documented official meeting minutes for quarterly Board of Directors meetings.',
      'Planned corporate leadership summit for {X}+ attendees, managing a ${Y}K budget with ${Z}K under-spend.'
    ],
    commonPitfalls: ['Failing to specify C-level executive tier (CEO, CFO, Board)', 'Not mentioning expense management software (Concur, Expensify)', 'Omitting budget management or attendance numbers']
  },
  'supply-chain-specialist': {
    roleCategory: 'supply_chain_logistics',
    displayTitle: 'Senior Supply Chain & Logistics Operations Manager',
    coreSkills: ['Supply Chain', 'Logistics', 'Procurement', 'SAP S/4HANA', 'Demand Forecasting', 'Inventory Optimization', 'Carrier Negotiation', 'Lean Six Sigma', 'Vendor Management'],
    secondarySkills: ['Power BI', 'Warehouse Management (WMS)', 'MRP', '3PL Management', 'OTIF', 'Customs Compliance', 'Cost Reduction'],
    toolsAndPlatforms: ['SAP S/4HANA', 'Oracle SCM', 'Power BI', 'Blue Yonder', 'Excel Solver'],
    recommendedCertifications: ['Certified Supply Chain Professional (CSCP) - APICS', 'Certified in Production and Inventory Management (CPIM)', 'Six Sigma Green Belt'],
    targetMetricDensity: 0.65,
    exemplarActionVerbs: ['Negotiated', 'Optimized', 'Procured', 'Forecasted', 'Reduced', 'Automated', 'Streamlined', 'Audited'],
    exemplarBulletPatterns: [
      'Managed global procurement budget of ${X}M across {Y}+ suppliers, cutting annual freight costs by ${Z}M ({W}% savings).',
      'Implemented demand forecasting models in SAP ERP, cutting excess inventory by {X}% while reaching {Y}% on-time order fulfillment.',
      'Automated warehouse distribution workflows using Lean Six Sigma, increasing fulfillment throughput by {X}%.'
    ],
    commonPitfalls: ['Failing to specify ERP software (SAP S/4HANA, Oracle)', 'Omitting procurement dollar budget and freight savings numbers', 'Not listing recognized certifications (CSCP, CPIM, Six Sigma)']
  },
  'clinical-data-manager': {
    roleCategory: 'clinical_research',
    displayTitle: 'Lead Clinical Data Manager',
    coreSkills: ['Clinical Data Management', 'Medidata Rave', 'EDC', 'CDISC', 'SDTM', 'CDASH', 'Database Lock', 'GCP', 'FDA 21 CFR Part 11', 'eCRF Design'],
    secondarySkills: ['MedDRA Coding', 'WHO Drug', 'Data Management Plans (DMP)', 'Edit Checks', 'SAS', 'JReview', 'UAT', 'Query Management'],
    toolsAndPlatforms: ['Medidata Rave', 'Oracle InForm', 'Veeva Vault CDMS', 'SAS', 'JReview'],
    recommendedCertifications: ['Certified Clinical Data Manager (CCDM) - SCDM', 'Good Clinical Practice (ICH-GCP)'],
    targetMetricDensity: 0.60,
    exemplarActionVerbs: ['Directed', 'Authored', 'Validated', 'Executed', 'Programmed', 'Integrated', 'Standardized', 'Locked'],
    exemplarBulletPatterns: [
      'Directed clinical data management for {X} Phase II/III trials across {Y} investigator sites, achieving 100% on-time database locks.',
      'Authored and validated {X}+ complex edit check specifications in Medidata Rave, reducing site query rates by {Y}%.',
      'Led eCRF design complying with CDISC SDTM/CDASH and FDA regulations with zero major audit findings.'
    ],
    commonPitfalls: ['Omitting specific clinical trial phases (Phase I-IV) or therapeutic areas', 'Not naming standard EDC systems (Medidata Rave, Oracle InForm)', 'Failing to cite CDISC SDTM/CDASH and FDA standards']
  },
  'legal-counsel': {
    roleCategory: 'legal_compliance',
    displayTitle: 'Senior Corporate & Commercial Legal Counsel',
    coreSkills: ['Commercial Contracts', 'SaaS Agreements', 'Master Service Agreements (MSAs)', 'Data Privacy (GDPR, CCPA)', 'Ironclad', 'Contract Negotiation', 'Intellectual Property', 'Risk Mitigation'],
    secondarySkills: ['DocuSign CLM', 'SLAs', 'Statements of Work (SOWs)', 'M&A Due Diligence', 'Corporate Governance', 'Legal Compliance', 'CIPP/E'],
    toolsAndPlatforms: ['Ironclad', 'DocuSign CLM', 'Salesforce', 'LexisNexis', 'Jira'],
    recommendedCertifications: ['Active State Bar License (e.g. California / New York)', 'CIPP/E - IAPP', 'CIPP/US'],
    targetMetricDensity: 0.55,
    exemplarActionVerbs: ['Negotiated', 'Drafted', 'Advised', 'Governed', 'Streamlined', 'Mitigated', 'Structured', 'Resolved'],
    exemplarBulletPatterns: [
      'Drafted and negotiated {X}+ enterprise SaaS customer agreements and MSAs representing ${Y}M+ in annual contract value.',
      'Streamlined contract review workflows in Ironclad, reducing standard sales deal negotiation cycle from {X} weeks to {Y} days.',
      'Governed enterprise data privacy compliance (GDPR/CCPA), implementing standard DPAs with zero regulatory violations.'
    ],
    commonPitfalls: ['Failing to state Bar admission and jurisdiction in good standing', 'Omitting contract dollar volumes ($M+) or deal cycle acceleration', 'Not mentioning data privacy (GDPR, CCPA) frameworks']
  },
  'ai-solutions-architect': {
    roleCategory: 'ai_solutions_architecture',
    displayTitle: 'Principal AI Solutions Architect & Enterprise Generative AI Lead',
    coreSkills: ['Generative AI', 'RAG Architectures', 'Large Language Models (LLMs)', 'Vector Databases', 'LangChain', 'Azure OpenAI', 'AWS Bedrock', 'Solutions Architecture', 'Pre-Sales'],
    secondarySkills: ['Pinecone', 'Qdrant', 'Kubernetes', 'Docker', 'Python', 'AI Safety & Governance', 'Prompt Engineering', 'Fine-Tuning', 'Multi-Agent Systems'],
    toolsAndPlatforms: ['Azure OpenAI', 'AWS Bedrock', 'Pinecone', 'Qdrant', 'LangChain', 'Triton Inference Server'],
    recommendedCertifications: ['AWS Certified Solutions Architect - Professional', 'Microsoft Certified: Azure Solutions Architect Expert', 'AWS Machine Learning Specialty'],
    targetMetricDensity: 0.70,
    exemplarActionVerbs: ['Architected', 'Deployed', 'Advised', 'Delivered', 'Automated', 'Scaled', 'Closed', 'Engineered'],
    exemplarBulletPatterns: [
      'Architected and delivered {X}+ enterprise Generative AI and RAG platforms for Fortune 500 clients using Azure OpenAI, LangChain, and Qdrant.',
      'Engineered multi-agent autonomous system automating {X}% of support workflows and saving ${Y}M in annual operational costs.',
      'Advised enterprise executive stakeholders on AI blueprints, closing ${X}M in new software and cloud contracts.'
    ],
    commonPitfalls: ['Listing theoretical AI concepts without enterprise architecture blueprints', 'Omitting pre-sales revenue or contract closing figures', 'Failing to mention AI safety, token cost optimization, or latency benchmarks']
  }
};

export function getDomainKnowledge(roleOrCategory: string): DomainKnowledgeProfile {
  const normalized = roleOrCategory.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  // 1. Direct match by benchmark ID
  if (DOMAIN_KNOWLEDGE_PROFILES[normalized]) {
    return DOMAIN_KNOWLEDGE_PROFILES[normalized];
  }

  // 2. Substring matching
  for (const [key, profile] of Object.entries(DOMAIN_KNOWLEDGE_PROFILES)) {
    if (normalized.includes(key) || key.includes(normalized) || normalized.includes(profile.roleCategory)) {
      return profile;
    }
  }

  // 3. Fallback to generic software/tech profile
  return DOMAIN_KNOWLEDGE_PROFILES['software-engineer'];
}
