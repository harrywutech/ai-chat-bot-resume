export const profile = {
  name: "Harry Wu",
  email: "harry.wu.hx@gmail.com",
  github: "https://github.com/harrywutech",
  linkedin: "https://www.linkedin.com/in/harry-wu-hx/",
};

export const commands = [
  {
    name: "Skills",
    description: "Core technologies & where I use them",
    group: "portfolio",
  },
  {
    name: "Projects",
    description: "Delivered work & measurable outcomes",
    group: "portfolio",
  },
  {
    name: "Experience",
    description: "Professional roles & achievements",
    group: "portfolio",
  },
  {
    name: "About",
    description: "The person behind the prompt",
    group: "portfolio",
  },
  {
    name: "Impact",
    description: "Engineering, measured in outcomes",
    group: "portfolio",
  },
  { name: "Resume", description: "Read or download my resume", group: "more" },
  {
    name: "Education",
    description: "Education & certifications",
    group: "more",
  },
  { name: "Contact", description: "Let’s start a conversation", group: "more" },
  {
    name: "Help",
    description: "Commands & keyboard shortcuts",
    group: "utility",
  },
  {
    name: "Theme",
    description: "Find your favorite color scheme",
    group: "utility",
  },
  {
    name: "History",
    description: "This session’s command history",
    group: "utility",
  },
  { name: "Clear", description: "A fresh terminal", group: "utility" },
  { name: "Home", description: "Back to the welcome screen", group: "utility" },
];

export const expertise = [
  {
    title: "Full-stack delivery",
    stack: "React · TypeScript · Node.js · PHP/Laravel",
    evidence: "10+ years shipping web applications.",
  },
  {
    title: "AI & automation",
    stack: "Python/FastAPI · LangChain · LangGraph · LangSmith · RAG · n8n",
    evidence: "RAG assistants and workflow automation.",
  },
  {
    title: "Reliable systems",
    stack: "AWS · CI/CD · APIs · Microservices",
    evidence: "Performance, integration & production support.",
  },
];

export const skills = [
  {
    name: "Frontend",
    tools: ["React", "TypeScript", "Vue", "JavaScript", "HTML", "CSS"],
    context:
      "Customer-facing commerce experiences, React PWAs, and real-time interfaces.",
    project: "commerce",
    label: "Commerce platform",
  },
  {
    name: "Backend",
    tools: [
      "Node.js",
      "Python",
      "FastAPI",
      "PHP",
      "Laravel",
      "GraphQL",
      "REST APIs",
      "Java",
      "Spring Boot",
      "Webhooks",
    ],
    context:
      "APIs, payment integrations, authentication, and event-driven services.",
    project: "indexing",
    label: "Product indexing pipeline",
  },
  {
    name: "AI",
    tools: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "RAG",
      "Qdrant",
      "Vector retrieval",
      "n8n",
    ],
    context:
      "Grounded assistants, multi-agent assessment workflows, and practical automation.",
    project: "interview-platform",
    label: "AI learning & interview platform",
  },
  {
    name: "Architecture",
    tools: [
      "Microservices",
      "Event-driven systems",
      "Caching",
      "System integration",
      "Software architecture",
    ],
    context:
      "Monolith-to-microservices migration, resilient pipelines, and reliable checkout.",
    project: "commerce",
    label: "Commerce re-platforming",
  },
  {
    name: "Data",
    tools: [
      "MySQL",
      "MariaDB",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "Google Cloud Pub/Sub",
      "RabbitMQ",
    ],
    context:
      "Application persistence, search indexing, messaging, and retrieval.",
    project: "indexing",
    label: "Event-driven product indexing",
  },
  {
    name: "Cloud",
    tools: [
      "AWS",
      "Docker",
      "Azure DevOps",
      "CI/CD",
      "Git",
      "GitHub",
      "Linux",
      "New Relic",
    ],
    context:
      "Deployment pipelines, distributed tracing, monitoring, and production support.",
    project: "commerce",
    label: "Enterprise commerce platform",
  },
];

export const projects = [
  {
    id: "commerce",
    number: "01",
    name: "Commerce Platform & Checkout",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    featured: true,
    description:
      "Led a Magento 2 to Commercetools migration and delivered catalog, checkout, payments, and customer-account features.",
    result: "67% lower cart & checkout response time · ~3s → ~1s",
    details: [
      "Consolidated GraphQL calls and redesigned shared checkout state to reduce response time by 67%.",
      "Served as hands-on technical lead for a five-developer team, covering architecture, code reviews, mentoring, and release readiness.",
      "Delivered React/Vue and Laravel features, including payment callbacks, mobile redirects, and duplicate-safe order creation.",
      "Improved production visibility with New Relic monitoring, distributed tracing, and failure alerts.",
    ],
    tags: ["React", "TypeScript", "GraphQL", "Laravel", "Commercetools"],
  },
  {
    id: "shopping-assistant",
    number: "02",
    name: "RAG Shopping Assistant",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    featured: true,
    description:
      "Built a shopping assistant that answers product questions and compares products using catalog-backed retrieval.",
    result: "Delivered grounded product Q&A and side-by-side comparisons",
    details: [
      "Grounded responses in GraphQL product data and a Cloudflare KV knowledge base.",
      "Orchestrated workflows with LangChain/LangGraph and used LangSmith tracing and evaluation to guide response quality.",
    ],
    tags: ["RAG", "LangGraph", "LangChain", "LangSmith", "GraphQL"],
  },
  {
    id: "automation",
    number: "03",
    name: "Inventory Operations Automation",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    featured: true,
    description:
      "Replaced repetitive warehouse inventory refreshes with an hourly n8n workflow, despite no direct API integration.",
    result: "Approximately 20 staff hours saved each week",
    details: [
      "Automated clearance-inventory refreshes on an hourly schedule without a direct API integration.",
      "Saved approximately 20 staff hours per week by reducing recurring manual operations.",
    ],
    tags: ["n8n", "Workflow automation", "Systems integration"],
  },
  {
    id: "indexing",
    number: "04",
    name: "Event-driven Product Indexing",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    featured: false,
    description:
      "Kept catalog data synchronized with Algolia using event-driven updates, retries, and daily full syncs.",
    result: "Approximately 8,700 products synchronized",
    details: [
      "Published commercetools product-change events with Node.js and Google Cloud Pub/Sub; Laravel/MongoDB services on Cloud Run applied Algolia delta updates.",
      "Added automated retries and daily batched full syncs to complement incremental updates.",
    ],
    tags: ["Node.js", "Pub/Sub", "Laravel", "MongoDB", "Algolia"],
  },
  {
    id: "interview-platform",
    number: "05",
    name: "AI Learning & Interview Platform",
    type: "PERSONAL PROJECT · IN DEVELOPMENT",
    featured: false,
    description:
      "Building a learning platform with voice interviews, streamed responses, and document-grounded assessments.",
    result: "Voice interviews + document-grounded assessment workflows",
    details: [
      "Built Vue 3/TypeScript and Python/FastAPI features with authentication, SSE streaming, live captions, and persisted interview transcripts.",
      "Implemented LangGraph workflows and Qdrant retrieval with OCR fallback, relevance filtering, and source references.",
      "Added dialogue memory, rate limiting, upload validation, and graceful handling of retrieval/cache failures.",
    ],
    tags: ["Vue 3", "Python", "FastAPI", "LangGraph", "Qdrant"],
  },
];

export const experience = [
  {
    period: "OCT 2018 — MAR 2026",
    company: "Trail Appliances",
    role: "Full Stack Software Developer",
    place: "Richmond, BC",
    description:
      "Hands-on developer and technical lead for a five-developer team, delivering commerce, AI, and automation systems.",
    highlights: [
      {
        lead: "67% lower response time.",
        detail:
          "Reduced cart & checkout from approximately 3 seconds to 1 second.",
      },
      {
        lead: "~20 staff hours saved weekly.",
        detail: "Automated recurring warehouse inventory refreshes.",
      },
      {
        lead: "Led commerce re-platforming.",
        detail:
          "Migrated Magento 2 to Commercetools and delivered catalog, checkout, payment, and account features.",
      },
      {
        lead: "AI assistants & product indexing.",
        detail:
          "Built a grounded shopping assistant and an event-driven search pipeline for approximately 8,700 products.",
      },
    ],
    tags: ["React", "TypeScript", "Node.js", "Laravel", "GraphQL", "LangGraph"],
  },
  {
    period: "JUL 2016 — FEB 2018",
    company: "Alive Health Centre",
    role: "Web Developer",
    place: "Richmond, BC",
    description:
      "Built and maintained Magento 2 commerce features with PHP, JavaScript, and MySQL, delivering platform enhancements and content migrations with business stakeholders.",
    highlights: [],
    tags: [],
  },
  {
    period: "JAN 2013 — JAN 2016",
    company: "Various companies",
    role: "Web Developer & IT roles",
    place: "",
    description:
      "Delivered PHP/CMS websites across commerce, agency, travel, and higher education, building experience in systems integration and production support.",
    highlights: [],
    tags: [],
  },
];
