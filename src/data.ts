export const profile = {
  name: "Harry Wu",
  email: "harry.wu.hx@gmail.com",
  github: "https://github.com/harrywutech",
  linkedin: "https://www.linkedin.com/in/harry-wu-hx/",
};

export const commands = [
  {
    name: "About",
    description: "The person behind the prompt",
    group: "portfolio",
  },
  {
    name: "Skills",
    description: "My tools, technologies & craft",
    group: "portfolio",
  },
  {
    name: "Projects",
    description: "Selected things I’ve built",
    group: "portfolio",
  },
  {
    name: "Experience",
    description: "A decade of building for the web",
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
    id: "interview-platform",
    number: "01",
    name: "AI Learning & Interview Platform",
    type: "PERSONAL PROJECT · IN DEVELOPMENT",
    description:
      "A learning and interview platform with real-time voice interviews, streamed responses, and document-grounded assessment workflows.",
    details: [
      "Vue 3 and TypeScript frontend with Python/FastAPI, MySQL, token-based authentication, and SSE streaming.",
      "RTC voice interviews with backend-issued access tokens, live captions, and persisted transcripts.",
      "LangChain/LangGraph orchestration with OCR fallback, Qdrant retrieval, relevance filtering, and references to source documents.",
      "Session summaries and cross-session profiles, with rate limiting, upload validation, and graceful degradation.",
    ],
    tags: ["Vue 3", "FastAPI", "LangGraph", "Qdrant", "SSE"],
  },
  {
    id: "commerce",
    number: "02",
    name: "Enterprise Commerce Re-platforming",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    description:
      "Helped move a high-traffic Magento 2 monolith to a flexible Commercetools microservices architecture.",
    details: [
      "Hands-on technical lead for a five-developer team across architecture, implementation, code reviews, and mentoring.",
      "Delivered catalog, search, cart, checkout, payments, accounts, and orders across React, Vue, Laravel, GraphQL, and REST.",
      "Consolidated GraphQL calls and redesigned shared checkout state, reducing cart and checkout response time from approximately 3s to 1s.",
      "Strengthened release practices, production monitoring, distributed tracing, and failure alerts.",
    ],
    tags: ["React", "Commercetools", "GraphQL", "Laravel"],
  },
  {
    id: "shopping-assistant",
    number: "03",
    name: "RAG Shopping Assistant",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    description:
      "An AI shopping assistant for grounded product Q&A, side-by-side comparisons, and personalized suggested questions.",
    details: [
      "Orchestrated workflows using LangChain and LangGraph.",
      "Grounded responses in GraphQL product data and a Cloudflare KV knowledge base.",
      "Used LangSmith tracing and evaluation to guide response-quality improvements.",
    ],
    tags: ["RAG", "LangChain", "LangGraph", "LangSmith"],
  },
  {
    id: "indexing",
    number: "04",
    name: "Event-driven Product Indexing",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    description:
      "A product-change pipeline that kept approximately 8,700 products synchronized with Algolia.",
    details: [
      "Node.js published commercetools Subscription events to Google Cloud Pub/Sub.",
      "Laravel and MongoDB services on Cloud Run applied delta updates to Algolia.",
      "Daily batched full syncs and automated retries complemented event-driven updates.",
    ],
    tags: ["Node.js", "Pub/Sub", "Laravel", "Algolia"],
  },
  {
    id: "automation",
    number: "05",
    name: "Inventory Operations Automation",
    type: "TRAIL APPLIANCES · PROFESSIONAL WORK",
    description:
      "An n8n workflow that refreshed warehouse clearance inventory hourly and saved approximately 20 staff hours each week.",
    details: [
      "Automated inventory operations despite the absence of a direct API integration.",
      "Replaced repetitive manual refresh work with an hourly workflow.",
    ],
    tags: ["n8n", "Automation", "Inventory operations"],
  },
];

export const experience = [
  {
    period: "OCT 2018 — MAR 2026",
    company: "Trail Appliances",
    role: "Full Stack Software Developer",
    place: "Richmond, BC",
    description:
      "Led enterprise commerce re-platforming, built AI shopping experiences, and shipped reliable full-stack features. Hands-on technical lead for five developers, with a focus on architecture, implementation, performance, and mentorship.",
  },
  {
    period: "JUL 2016 — FEB 2018",
    company: "Alive Health Centre",
    role: "Web Developer",
    place: "Richmond, BC",
    description:
      "Developed and maintained a Magento 2 commerce platform using PHP, JavaScript, MySQL, and Zend Framework. Delivered platform enhancements and content migrations with business stakeholders.",
  },
  {
    period: "JAN 2013 — JAN 2016",
    company: "Various companies",
    role: "Web Developer & IT roles",
    place: "",
    description:
      "Built web applications and digital solutions across commerce, agency, travel, and higher education using PHP, WordPress, Magento, Drupal, and CMS platforms.",
  },
];
