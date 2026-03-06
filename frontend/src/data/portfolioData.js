import {
    FaReact, FaAngular, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaAws,
    FaDatabase, FaServer, FaBrain, FaRocket, FaShieldAlt, FaCogs,
    FaChartLine, FaCode, FaLayerGroup, FaNetworkWired
} from 'react-icons/fa';
import {
    SiMongodb, SiExpress, SiFlask, SiFastapi, SiTailwindcss,
    SiTypescript, SiPostgresql, SiRedis, SiNginx,
    SiOpenai, SiLangchain, SiJavascript, SiHtml5, SiCss3
} from 'react-icons/si';

export const personalInfo = {
    name: 'Harsha',
    fullName: 'Harshavardhan Chandragiri',
    headline: 'Building Intelligent Systems for the AI-First World',
    subheading: 'Full Stack Engineer | MERN & MEAN Specialist | Python Backend Engineer | GenAI & RAG Systems Developer',
    bio: `I am a full-stack developer and AI enthusiast with 1 year of professional experience building real-world, scalable web applications. With hands-on experience in MEAN, MERN, Python, and Java, I craft responsive, user-focused solutions from frontend to backend. My interest in Generative AI and RAG drives me to create intelligent systems that combine LLMs with contextual data.`,
    about: `I don't just build features. I build robust systems. As a Full Stack + AI -minded engineer with strong systems thinking, I build frontend + backend + AI integration end-to-end. I understand performance, scaling, and clean code — and I bring product thinking to every line I write.`,
    tagline: "I don't just build features. I build robust systems.",
    github: 'https://github.com/harshachandragiri',
    linkedin: 'https://www.linkedin.com/in/harsha-chandragiri-2885a5240',
    instagram: 'https://www.instagram.com/harsha_.1904',
    resumeLink: 'https://drive.google.com/file/d/1mhzSCvSujx2gaBgOVdtnrqGHWpJLEet_/view?usp=drivesdk',
    email: 'harsha@example.com',
};

export const typingStrings = [
    'Building scalable backend systems',
    'Designing AI-powered applications',
    'Engineering RAG pipelines',
    'Integrating LLMs into production',
];

export const skillCategories = [
    {
        title: 'Full Stack Engineering',
        icon: FaCode,
        color: '#00f0ff',
        skills: [
            { name: 'React', icon: FaReact, level: 92 },
            { name: 'Angular', icon: FaAngular, level: 85 },
            { name: 'JavaScript', icon: SiJavascript, level: 95 },
            { name: 'TypeScript', icon: SiTypescript, level: 82 },
            { name: 'HTML5', icon: SiHtml5, level: 95 },
            { name: 'CSS3', icon: SiCss3, level: 90 },
            { name: 'Tailwind CSS', icon: SiTailwindcss, level: 88 },
        ],
    },
    {
        title: 'Backend Engineering',
        icon: FaServer,
        color: '#a855f7',
        skills: [
            { name: 'Node.js', icon: FaNodeJs, level: 93 },
            { name: 'Express', icon: SiExpress, level: 90 },
            { name: 'Python', icon: FaPython, level: 88 },
            { name: 'Flask', icon: SiFlask, level: 85 },
            { name: 'FastAPI', icon: SiFastapi, level: 83 },
            { name: 'Java', icon: FaJava, level: 78 },
        ],
    },
    {
        title: 'AI Engineering',
        icon: FaBrain,
        color: '#ec4899',
        skills: [
            { name: 'LLM Integration', icon: SiOpenai, level: 88 },
            { name: 'RAG Pipelines', icon: SiLangchain, level: 85 },
            { name: 'Prompt Engineering', icon: FaBrain, level: 90 },
            { name: 'Vector Databases', icon: FaDatabase, level: 82 },
            { name: 'AI APIs', icon: FaNetworkWired, level: 87 },
        ],
    },
    {
        title: 'Databases & Data',
        icon: FaDatabase,
        color: '#3b82f6',
        skills: [
            { name: 'MongoDB', icon: SiMongodb, level: 92 },
            { name: 'PostgreSQL', icon: SiPostgresql, level: 80 },
            { name: 'Redis', icon: SiRedis, level: 75 },
            { name: 'Schema Design', icon: FaLayerGroup, level: 88 },
        ],
    },
    {
        title: 'DevOps & Deployment',
        icon: FaRocket,
        color: '#f59e0b',
        skills: [
            { name: 'Docker', icon: FaDocker, level: 78 },
            { name: 'Git', icon: FaGitAlt, level: 90 },
            { name: 'AWS', icon: FaAws, level: 72 },
            { name: 'Nginx', icon: SiNginx, level: 75 },
        ],
    },
];

export const projects = [
    {
        title: 'AI-Powered Chat Application',
        description: 'Real-time messaging system with LLM integration, authentication, and role-based access control. Built with WebSocket for live communication and AI-assisted responses.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'OpenAI API', 'JWT'],
        category: 'AI',
        gradient: 'from-cyan-500/20 to-blue-500/20',
        borderColor: 'rgba(0, 240, 255, 0.3)',
        link: '#',
        architectureLink: '#',
    },
    {
        title: 'RAG Document Summarization System',
        description: 'End-to-end RAG pipeline with document chunking, embeddings generation, vector database storage, and intelligent retrieval + LLM-powered summarization.',
        techStack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'OpenAI', 'React'],
        category: 'AI',
        gradient: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'rgba(168, 85, 247, 0.3)',
        link: '#',
        architectureLink: '#',
    },
    {
        title: 'E-Commerce Automation System',
        description: 'Full-scale e-commerce backend with payment gateway integration, notification systems, inventory management, and horizontal scalability architecture.',
        techStack: ['Node.js', 'Express', 'MongoDB', 'React', 'Razorpay', 'Redis'],
        category: 'Full Stack',
        gradient: 'from-blue-500/20 to-indigo-500/20',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        link: '#',
        architectureLink: '#',
    },
    {
        title: 'Conversational Query SDK',
        description: 'Intelligent SDK enabling natural language to MongoDB queries, top-k result handling, markdown formatting, and seamless integration into any application.',
        techStack: ['Go', 'Python', 'MongoDB', 'OpenAI', 'WebSocket', 'React'],
        category: 'AI',
        gradient: 'from-emerald-500/20 to-teal-500/20',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        link: '#',
        architectureLink: '#',
    },
    {
        title: 'Multi-Tenant SaaS Platform',
        description: 'Enterprise-grade multi-tenant architecture with isolated data, tenant-specific configs, role-based admin dashboards, and automated onboarding workflows.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Docker'],
        category: 'Full Stack',
        gradient: 'from-orange-500/20 to-amber-500/20',
        borderColor: 'rgba(249, 115, 22, 0.3)',
        link: '#',
        architectureLink: '#',
    },
    {
        title: 'AI Diagram Extraction Pipeline',
        description: 'Automated pipeline extracting diagrams from PDFs, converting them to Mermaid.js code via LLMs, and building a searchable visual knowledge base.',
        techStack: ['Python', 'FastAPI', 'OpenAI Vision', 'Mermaid.js', 'MongoDB', 'React'],
        category: 'AI',
        gradient: 'from-rose-500/20 to-red-500/20',
        borderColor: 'rgba(244, 63, 94, 0.3)',
        link: '#',
        architectureLink: '#',
    },
    {
        title: 'Intelligent Task Management System',
        description: 'AI-powered project management tool with smart task prioritization, deadline prediction, workload analysis, and automated standup report generation.',
        techStack: ['Angular', 'Node.js', 'MongoDB', 'OpenAI', 'Socket.io', 'Redis'],
        category: 'AI',
        gradient: 'from-violet-500/20 to-fuchsia-500/20',
        borderColor: 'rgba(139, 92, 246, 0.3)',
        link: '#',
        architectureLink: '#',
    },
    {
        title: 'Real-Time Analytics Dashboard',
        description: 'High-performance analytics platform with live data streaming, custom metric builders, interactive charts, and automated alerting for business KPIs.',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'D3.js'],
        category: 'Full Stack',
        gradient: 'from-sky-500/20 to-cyan-500/20',
        borderColor: 'rgba(14, 165, 233, 0.3)',
        link: '#',
        architectureLink: '#',
    },
];

export const developmentFlow = [
    {
        step: '01',
        title: 'Requirement Analysis',
        description: 'Deep-dive into business requirements, user stories, and technical constraints. Map every edge case before writing a single line of code.',
        icon: FaChartLine,
    },
    {
        step: '02',
        title: 'DB Schema Planning',
        description: 'Design normalized, scalable schemas with indexing strategy. Plan for read/write patterns and data relationships upfront.',
        icon: FaDatabase,
    },
    {
        step: '03',
        title: 'API Structure Design',
        description: 'RESTful API design with versioning, rate limiting, pagination, and comprehensive error handling. OpenAPI spec first.',
        icon: FaNetworkWired,
    },
    {
        step: '04',
        title: 'Authentication Strategy',
        description: 'JWT-based auth with refresh tokens, role-based access control (RBAC), and secure session management.',
        icon: FaShieldAlt,
    },
    {
        step: '05',
        title: 'AI Integration Layer',
        description: 'LLM orchestration, prompt chains, RAG pipelines, vector stores, and fallback strategies for AI-powered features.',
        icon: FaBrain,
    },
    {
        step: '06',
        title: 'Scalability & Deployment',
        description: 'Containerized deployments, load balancing, caching strategies, logging, monitoring, and CI/CD pipelines.',
        icon: FaRocket,
    },
];

export const ownershipPrinciples = [
    {
        title: 'Product Thinking',
        description: 'Think in terms of products, not tasks. Every feature I build considers the user journey end-to-end.',
    },
    {
        title: 'Scalable Engineering',
        description: 'Design systems that handle 10x growth from day one. Horizontal scaling, caching, and async processing built-in.',
    },
    {
        title: 'Production-Ready Code',
        description: 'Write backend code that survives production: error handling, logging, monitoring, and graceful degradation.',
    },
    {
        title: 'Edge Case Handling',
        description: 'Real-world systems face real-world chaos. I anticipate and handle edge cases before they become incidents.',
    },
    {
        title: 'Security by Design',
        description: 'Secure APIs, input validation, rate limiting, and data encryption are not afterthoughts — they are foundations.',
    },
    {
        title: 'Clean Modular Design',
        description: 'Separation of concerns, clean interfaces, and modular design that any engineer can understand and extend.',
    },
];

export const education = [
    {
        year: '2020 - 2024',
        degree: 'B.Tech - Electronics & Communication Engineering',
        institution: 'Madanapalle Institute of Technology and Science',
        grade: '77% Aggregate',
        description: 'Gained comprehensive knowledge in electronics, communication systems, and signal processing. Developed strong programming skills in Java, Web Technologies (HTML, CSS, JS, React), and full-stack development through self-learning.',
    },
    {
        year: '2018 - 2020',
        degree: 'Intermediate Education (MPC)',
        institution: 'Narayana Junior College',
        grade: '90.5% Aggregate',
        description: 'Demonstrated academic excellence with a strong foundation in Mathematics, Physics, and Chemistry.',
    },
    {
        year: '2017 - 2018',
        degree: 'Secondary School Education (10th)',
        institution: 'Arogyamatha English Medium School',
        grade: '',
        description: 'Completed secondary education with a strong foundation in sciences, mathematics, and critical thinking.',
    },
];
