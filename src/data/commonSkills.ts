/**
 * Comprehensive list of common skills, tools, technologies, and industry terms
 * across 30+ professions used for client-side ATS keyword extraction and matching.
 */

export const COMMON_SKILLS: string[] = [
  // Programming Languages & Runtimes
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Golang', 'Rust',
  'PHP', 'Ruby', 'Swift', 'Kotlin', 'R', 'Scala', 'Dart', 'Perl', 'Haskell', 'Elixir',
  'SQL', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Sass', 'SCSS', 'Bash', 'Shell', 'PowerShell',

  // Frontend & Web
  'React', 'React.js', 'Next.js', 'Vue', 'Vue.js', 'Nuxt.js', 'Angular', 'Astro',
  'Svelte', 'SvelteKit', 'Tailwind', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'MUI',
  'Chakra UI', 'Redux', 'Redux Toolkit', 'Zustand', 'GraphQL', 'REST API', 'RESTful APIs',
  'WebSockets', 'Webpack', 'Vite', 'Babel', 'DOM', 'Responsive Design', 'Web Accessibility',
  'a11y', 'WCAG', 'WCAG 2.1 AA', 'Progressive Web Apps', 'PWA', 'Single Page Applications',
  'SPA', 'Micro-frontends', 'Storybook', 'Core Web Vitals',

  // Backend, Microservices & Databases
  'Node.js', 'Express', 'Express.js', 'NestJS', 'FastAPI', 'Django', 'Flask', 'Spring Boot',
  'Spring Cloud', 'Quarkus', 'Ruby on Rails', 'ASP.NET', 'Laravel', 'PostgreSQL', 'Postgres',
  'MySQL', 'MongoDB', 'Redis', 'SQLite', 'MariaDB', 'DynamoDB', 'Cassandra', 'Elasticsearch',
  'Supabase', 'Firebase', 'Prisma', 'TypeORM', 'Sequelize', 'Mongoose', 'Microservices',
  'gRPC', 'Object-Relational Mapping', 'ORM', 'Message Queues', 'RabbitMQ', 'Apache Kafka',
  'Kafka Streams', 'Distributed Systems', 'Domain-Driven Design', 'DDD', 'CQRS', 'Sharding',

  // Cloud, Infrastructure & DevOps / SRE
  'AWS', 'Amazon Web Services', 'Azure', 'Microsoft Azure', 'Google Cloud', 'GCP', 'Docker',
  'Kubernetes', 'K8s', 'EKS', 'ECS', 'Terraform', 'Terragrunt', 'Ansible', 'Jenkins',
  'GitHub Actions', 'GitLab CI', 'CI/CD', 'CloudFormation', 'Serverless', 'Lambda', 'S3',
  'EC2', 'CloudFront', 'Route53', 'Nginx', 'Apache', 'Linux', 'Unix', 'DevOps', 'SRE',
  'Site Reliability Engineering', 'Infrastructure as Code', 'IaC', 'GitOps', 'ArgoCD',
  'Helm', 'Istio', 'Prometheus', 'Grafana', 'Datadog', 'ELK Stack', 'OpenTelemetry',
  'HashiCorp Vault', 'Zero Trust',

  // Testing & Quality Engineering
  'Jest', 'Cypress', 'Playwright', 'Vitest', 'Selenium', 'Mocha', 'Chai', 'Testing Library',
  'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'E2E Testing', 'TDD',
  'Test-Driven Development', 'BDD', 'Cucumber', 'QA', 'Quality Assurance', 'Automated Testing',
  'Test Automation', 'API Testing', 'Postman', 'Newman', 'k6', 'JMeter', 'Appium',
  'Regression Testing', 'Xray', 'TestRail', 'BrowserStack',

  // Data Engineering, Lakes & Warehouses
  'Snowflake', 'dbt', 'Apache Spark', 'PySpark', 'Apache Airflow', 'Airflow', 'BigQuery',
  'Amazon Redshift', 'Delta Lake', 'ETL', 'ELT', 'Data Pipelines', 'Data Modeling',
  'Dimensional Modeling', 'Kimball', 'Data Warehouse', 'Data Lake', 'Great Expectations',
  'Monte Carlo', 'Data Governance', 'Hadoop',

  // Data Science, ML, AI & Generative AI
  'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'AI', 'Generative AI',
  'Data Science', 'Pandas', 'NumPy', 'SciPy', 'Scikit-learn', 'TensorFlow', 'PyTorch',
  'Keras', 'Hugging Face', 'Transformers', 'NLP', 'Natural Language Processing',
  'Computer Vision', 'OpenCV', 'Data Visualization', 'Tableau', 'Power BI', 'Matplotlib',
  'Seaborn', 'LLMs', 'Large Language Models', 'RAG', 'Retrieval-Augmented Generation',
  'LangChain', 'LlamaIndex', 'Vector Databases', 'Pinecone', 'Qdrant', 'Milvus', 'Weaviate',
  'MLflow', 'Kubeflow', 'Triton Inference Server', 'vLLM', 'TensorRT', 'SageMaker',
  'Azure OpenAI', 'AWS Bedrock', 'Prompt Engineering', 'Fine-Tuning', 'LoRA', 'A/B Testing',

  // Mobile Development
  'React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose',
  'Mobile App Development', 'Xcode', 'Android Studio', 'Fastlane', 'CocoaPods', 'Gradle',
  'Bluetooth LE', 'HealthKit', 'App Store', 'Google Play',

  // Product, Design & UX
  'Figma', 'UI Design', 'UX Design', 'User Experience', 'User Interface', 'Wireframing',
  'Prototyping', 'User Research', 'Design Systems', 'Adobe XD', 'Sketch', 'Photoshop',
  'Illustrator', 'Product Management', 'Product Strategy', 'Roadmapping', 'Agile', 'Scrum',
  'Kanban', 'SAFe', 'Jira', 'Confluence', 'User Stories', 'PRDs', 'Feature Prioritization',
  'Product Analytics', 'Amplitude', 'Mixpanel', 'Pendo',

  // Business Analysis & Delivery
  'Business Analysis', 'Business Systems Analyst', 'Requirements Elicitation', 'BRD', 'FSD',
  'BPMN', 'Process Modeling', 'Gap Analysis', 'Root Cause Analysis', 'UAT', 'User Acceptance Testing',
  'Traceability Matrix', 'Sprint Planning', 'Sprint Retrospectives', 'Scrum Master', 'Agile Coach',
  'Velocity Tracking', 'Burndown', 'PI Planning', 'Technical Program Management', 'TPM',
  'Program Management', 'Critical Path Analysis', 'Risk Mitigation', 'SDLC Governance',

  // Human Resources & Talent Acquisition
  'Human Resources', 'HRBP', 'HR Business Partner', 'Talent Management', 'Employee Relations',
  'Organizational Design', 'Succession Planning', 'Compensation', 'Benefits', 'Performance Management',
  'Workday', 'HRIS', 'Culture Amp', 'Lattice', 'BambooHR', 'Technical Recruiting',
  'Talent Acquisition', 'Full-Cycle Recruiting', 'Sourcing', 'Boolean Search', 'Greenhouse',
  'Lever', 'LinkedIn Recruiter', 'Gem', 'Time-to-Hire', 'Offer Negotiation', 'Diversity Sourcing',

  // Customer Success & Sales
  'Customer Success', 'Customer Success Manager', 'CSM', 'Enterprise SaaS', 'Gainsight',
  'Net Revenue Retention', 'NRR', 'Gross Retention Rate', 'GRR', 'QBR', 'Quarterly Business Reviews',
  'Customer Onboarding', 'Churn Reduction', 'Churn Mitigation', 'Account Expansion',
  'Customer Health Scoring', 'Zendesk', 'HubSpot', 'Salesforce', 'CRM', 'B2B Sales',
  'Enterprise Sales', 'Lead Generation', 'Sales Pipeline',

  // SEO & Content Strategy
  'SEO', 'Search Engine Optimization', 'Technical SEO', 'Keyword Research', 'Content Strategy',
  'Content Marketing', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console',
  'Google Analytics', 'Google Analytics 4', 'GA4', 'Looker Studio', 'Schema Markup',
  'JSON-LD', 'Topic Clusters', 'WordPress', 'Copywriting',

  // Executive Support & Administration
  'Executive Support', 'Executive Assistant', 'Calendar Management', 'Board of Directors',
  'Meeting Minutes', 'Travel Logistics', 'Expense Management', 'Concur', 'DocuSign',
  'Event Planning', 'Confidentiality', 'Google Workspace', 'Microsoft Office 365', 'PowerPoint',

  // Supply Chain & Operations
  'Supply Chain', 'Logistics', 'Procurement', 'Global Procurement', 'SAP ERP', 'SAP S/4HANA',
  'Oracle SCM', 'Demand Forecasting', 'Inventory Optimization', 'Warehouse Management',
  'Freight Negotiation', 'Carrier Management', 'Vendor Management', '3PL', 'Lean Six Sigma',
  'Six Sigma', 'MRP',

  // Clinical Research & Healthcare
  'Clinical Data Management', 'Clinical Trials', 'Medidata Rave', 'Oracle InForm', 'EDC',
  'CDISC', 'SDTM', 'CDASH', 'Database Lock', 'Data Management Plans', 'eCRF', 'Edit Checks',
  'Medical Coding', 'MedDRA', 'WHO Drug', 'GCP', 'ICH-GCP', 'FDA 21 CFR Part 11',

  // Legal & Compliance
  'Commercial Contracts', 'SaaS Agreements', 'Master Service Agreements', 'MSA', 'SLA',
  'Statements of Work', 'SOW', 'Contract Negotiation', 'Intellectual Property', 'Data Privacy',
  'GDPR', 'CCPA', 'CPRA', 'Ironclad', 'DocuSign CLM', 'Corporate Governance', 'Legal Compliance',
  'Due Diligence',

  // Soft Skills & Leadership
  'Leadership', 'Team Leadership', 'Cross-Functional Leadership', 'Mentorship', 'Problem Solving',
  'Critical Thinking', 'Communication', 'Collaboration', 'Time Management', 'Conflict Resolution',
  'Negotiation', 'Presentation Skills', 'Stakeholder Management',

  // Certifications & Governance Standards
  'AWS Certified', 'AWS Solutions Architect', 'CKA', 'CKAD', 'PMP', 'PMI-ACP', 'CSM',
  'A-CSM', 'CSPO', 'CISSP', 'CompTIA Security+', 'GCIH', 'CBAP', 'SHRM-SCP', 'SPHR',
  'CCSM', 'SnowPro Core', 'dbt Certified', 'CSCP', 'CPIM', 'CCDM', 'CIPP/E', 'CIPP/US',
  'ISTQB', 'ISO 27001', 'SOC 2', 'HIPAA', 'PCI-DSS', 'CPA', 'CFA'
];

/** Stopwords to ignore during keyword extraction */
export const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are',
  'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both',
  'but', 'by', 'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does',
  'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll',
  'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its',
  'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out',
  'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t',
  'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves',
  'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when',
  'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s',
  'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve',
  'your', 'yours', 'yourself', 'yourselves', 'job', 'description', 'role', 'position',
  'candidate', 'requirements', 'responsibilities', 'qualifications', 'looking', 'seeking',
  'ability', 'work', 'working', 'experience', 'years', 'team', 'company', 'skills', 'strong',
  'must', 'will', 'able', 'proven', 'track', 'record', 'well', 'join', 'opportunity'
]);
