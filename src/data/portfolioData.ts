export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack Apps' | 'Creative AI' | 'UI/UX Systems' | 'Mobile';
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  client?: string;
  featured: boolean;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon: string; level: number }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export const PERSONAL_INFO = {
  name: "ANDI INDRA LESTYA WICAKSONO",
  designerName: "Andi Indra Lestya Wicaksono",
  title: "CREATIVE DEVELOPER & UI ARCHITECT",
  location: "Jakarta, Indonesia (UTC+7)",
  status: "Available for Freelance & Full-time",
  bio: "Crafting digital experiences at the intersection of high-performance engineering, fluid motion design, and bold typography.",
  email: "hello@andiindra.dev",
  github: "https://github.com/AndiIndraLW",
  linkedin: "https://linkedin.com/in/andiindralw",
  twitter: "https://x.com/andiindralw",
  dribbble: "https://dribbble.com",
};

export const PROJECTS: Project[] = [
  {
    id: "kopakopi-platform",
    title: "Kopakopi Cafe Finder",
    category: "Full-Stack Apps",
    tagline: "AI-Powered Specialty Coffee Discovery Platform",
    description: "An interactive web platform enabling coffee enthusiasts to discover curated specialty coffee shops across Indonesia with real-time distance sorting and photo verification.",
    longDescription: "Built with Next.js App Router and TypeScript, Kopakopi connects coffee lovers with artisanal local roasters. Includes dynamic photo verification workflows, custom interactive map filters, and live operational status.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Geolocation API", "Supabase"],
    year: "2026",
    client: "Kopakopi Indonesia",
    featured: true,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://kopakopi.vercel.app",
    githubUrl: "https://github.com/AndiIndraLW/kopakopi",
    stats: [
      { label: "Active Cafes", value: "250+" },
      { label: "Avg Load Speed", value: "0.8s" },
      { label: "User Rating", value: "4.9/5" },
    ],
  },
  {
    id: "antigravity-ai-suite",
    title: "Autonomous Agent Studio",
    category: "Creative AI",
    tagline: "Multi-Agent Workflow & Design Automation Tool",
    description: "A canvas-based workspace for orchestrating autonomous AI agents, visually debugging system prompts, and automating code generation pipelines.",
    longDescription: "Leverages ReactFlow and Web Audio/WebGL shader overlays to provide developers with real-time telemetry and visual node graphs for AI agent decision trees.",
    tags: ["React", "TypeScript", "WebGL", "Framer Motion", "Node.js"],
    year: "2025",
    client: "Open Agent Labs",
    featured: true,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://agent-studio.dev",
    githubUrl: "https://github.com/AndiIndraLW/agent-studio",
    stats: [
      { label: "Agents Executed", value: "10M+" },
      { label: "Latency", value: "< 120ms" },
      { label: "Satisfaction", value: "99.2%" },
    ],
  },
  {
    id: "lumina-design-system",
    title: "Lumina Design System",
    category: "UI/UX Systems",
    tagline: "Accessible Dark-Mode Component Library",
    description: "An enterprise design system featuring 60+ customizable React components, built for fluid dark-mode aesthetics and sub-millisecond interaction feedback.",
    longDescription: "Strictly typed design tokens, automatic ARIA compliance, container queries, and built-in micro-interactions for high-scale enterprise web applications.",
    tags: ["Design System", "Tailwind CSS", "Storybook", "Accessibility", "React"],
    year: "2025",
    client: "Lumina Enterprise",
    featured: true,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://lumina-ds.design",
    githubUrl: "https://github.com/AndiIndraLW/lumina-ds",
    stats: [
      { label: "Components", value: "65+" },
      { label: "Downloads", value: "45k/mo" },
      { label: "Accessibility", value: "100%" },
    ],
  },
  {
    id: "4am-skin-ecommerce",
    title: "4AM Skin Experience",
    category: "Full-Stack Apps",
    tagline: "High-End Kinetic E-Commerce Showcase",
    description: "Immersive storefront built for luxury skincare brand, featuring 3D product previews, smooth Lenis inertial scroll, and instant checkout flows.",
    longDescription: "Inspired by modern editorial typography and liquid web GL transitions, 4AM Skin delivers a 60fps interactive shopping journey built on Next.js and Shopify Headless API.",
    tags: ["Next.js", "Three.js", "Shopify API", "Framer Motion", "GSAP"],
    year: "2025",
    client: "4AM Skin Co.",
    featured: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://4amskin.com",
    githubUrl: "https://github.com/AndiIndraLW/4am-skin",
    stats: [
      { label: "Conversion Rate", value: "+38%" },
      { label: "FPS Performance", value: "60 FPS" },
      { label: "Awwwards", value: "Nominee" },
    ],
  },
  {
    id: "pulse-health-tracker",
    title: "Pulse Bio-Metrics Mobile",
    category: "Mobile",
    tagline: "Real-time Personal Health & Sleep Companion",
    description: "Cross-platform mobile application tracking heart-rate variability, circadian rhythms, and recovery metrics with dark OLED visual charts.",
    longDescription: "Built with React Native and Expo, incorporating smooth gesture handling, haptic vibration feedback, and local offline sync with SQLite.",
    tags: ["React Native", "Expo", "TypeScript", "OLED Dark Theme", "Reanimated"],
    year: "2024",
    client: "Pulse Health",
    featured: false,
    image: "https://images.unsplash.com/photo-1510519138161-58446230f71b?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://pulse-health.app",
    githubUrl: "https://github.com/AndiIndraLW/pulse-app",
    stats: [
      { label: "App Store", value: "4.8 ★" },
      { label: "Active Users", value: "85k" },
    ],
  },
];

export const TECH_SKILLS = [
  { name: "Next.js 15", category: "Core Framework", icon: "⚡" },
  { name: "React 19", category: "UI Library", icon: "⚛️" },
  { name: "TypeScript", category: "Language", icon: "📘" },
  { name: "Tailwind CSS", category: "Styling", icon: "🎨" },
  { name: "Framer Motion", category: "Animation", icon: "✨" },
  { name: "Three.js / WebGL", category: "3D & Shaders", icon: "🌐" },
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "PostgreSQL / Supabase", category: "Database", icon: "🗄️" },
  { name: "Figma", category: "UI/UX Design", icon: "📐" },
  { name: "Lenis Scroll", category: "Motion", icon: "🌊" },
  { name: "GSAP", category: "Animation", icon: "🚀" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
];

export const SERVICES: Service[] = [
  {
    id: "fullstack-dev",
    number: "01",
    title: "Full-Stack Web Development",
    description: "Building scalable, high-performance web applications with Next.js, TypeScript, and modern API architectures engineered for speed and precision.",
    features: ["App Router & Server Actions", "Type-safe APIs & Databases", "Sub-second Page Load Speeds", "SEO & Core Web Vitals Optimization"],
    iconName: "Code2",
  },
  {
    id: "creative-engineering",
    number: "02",
    title: "Creative Engineering & Motion",
    description: "Elevating web experiences with fluid Lenis scrolling, custom cursor physics, Framer Motion animations, and WebGL interactive visual canvas effects.",
    features: ["Smooth Inertial Scrolling", "Custom Micro-interactions", "3D WebGL / Canvas Effects", "Awwwards-Grade Motion"],
    iconName: "Sparkles",
  },
  {
    id: "ui-ux-design",
    number: "03",
    title: "UI/UX & Design Systems",
    description: "Crafting crisp, modern dark-themed user interfaces, component libraries, and visual identity systems that leave an indelible impression.",
    features: ["Accessible Design Tokens", "Figma to Code Fidelity", "Responsive Mobile-First UI", "Interactive Prototypes"],
    iconName: "Layers",
  },
  {
    id: "ai-tooling",
    number: "04",
    title: "AI Integration & Architecture",
    description: "Integrating LLMs, autonomous agent workflows, and smart search interfaces into modern web applications with seamless user feedback loops.",
    features: ["OpenAI & Gemini SDKs", "RAG & Vector Search", "Streaming AI Responses", "Interactive Node Graphs"],
    iconName: "Cpu",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2024 — Present",
    role: "Senior Creative Technologist",
    company: "Andi Indra Studio",
    location: "Jakarta / Remote",
    description: "Leading frontend architecture and creative engineering for high-growth tech startups and global brand campaigns.",
    highlights: [
      "Architected 10+ web applications delivering 99.8+ Lighthouse performance scores.",
      "Pioneered brand design systems adopting dark glassmorphism and kinetic typography.",
      "Mentored junior engineers in TypeScript best practices and Framer Motion layout physics.",
    ],
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL"],
  },
  {
    id: "exp-2",
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    company: "Kopakopi Tech Labs",
    location: "Jakarta, Indonesia",
    description: "Engineered core platform services, geospatial search algorithms, and responsive user interfaces for specialty beverage platforms.",
    highlights: [
      "Reduced client-side bundle size by 42% using Next.js dynamic imports.",
      "Built real-time photo submission and admin validation dashboards.",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "exp-3",
    period: "2021 — 2023",
    role: "Frontend Engineer & UI Designer",
    company: "Nexus Digital Agency",
    location: "Remote",
    description: "Designed and implemented interactive brand websites, landing pages, and web apps for fintech and e-commerce clients.",
    highlights: [
      "Delivered 15+ client projects with 100% on-time milestone satisfaction.",
      "Created custom interactive GSAP scroll triggers and WebGL background shaders.",
    ],
    skills: ["JavaScript (ES6+)", "CSS3 / SCSS", "GSAP", "Figma", "HTML5"],
  },
];
