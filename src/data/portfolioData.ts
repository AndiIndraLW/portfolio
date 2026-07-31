export interface Project {
  id: string;
  title: string;
  category: string;
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
    id: "kopakopi-app",
    title: "KopaKopi App",
    category: "Coffee Shop Directory App",
    tagline: "Coffee Shop Directory App",
    description: "This app helps coffee enthusiasts discover their favorite coffee shops with ease. It offers comprehensive filters for various categories and café facilities, with additional options being introduced over time. The app also features an interactive map to help users explore nearby cafés and includes a QR code scanner for accessing and using digital loyalty cards.",
    longDescription: "This app helps coffee enthusiasts discover their favorite coffee shops with ease. It offers comprehensive filters for various categories and café facilities, with additional options being introduced over time. The app also features an interactive map to help users explore nearby cafés and includes a QR code scanner for accessing and using digital loyalty cards.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Geolocation API", "Ios App", "Android App", "Figma"],
    year: "2026",
    featured: true,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://kopakopi.co",
  },
  {
    id: "basicare-australia",
    title: "basicare.com.au",
    category: "Corporate Website",
    tagline: "Corporate Website",
    description: "Basicare Australia is a website that offers a wide range of products, including skincare tools, hair accessories, manicure and pedicure kits, makeup accessories, travel essentials, and personal grooming products. It allows customers to browse products by category, view product details, and a responsive design to help customers easily discover everyday beauty essentials.",
    longDescription: "Basicare Australia is a website that offers a wide range of products, including skincare tools, hair accessories, manicure and pedicure kits, makeup accessories, travel essentials, and personal grooming products. It allows customers to browse products by category, view product details, and a responsive design to help customers easily discover everyday beauty essentials.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2025",
    featured: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://basicare.com.au",
  },
  {
    id: "fisip-ub",
    title: "fisip.ub.ac.id",
    category: "Corporate Website",
    tagline: "Corporate Website",
    description: "FISIP Universitas Brawijaya is the official website of the Faculty of Social and Political Sciences at Universitas Brawijaya. It provides information about academic programs, admissions, news, events, research, and campus services, making it easy for students, staff, and prospective students to access important faculty information.",
    longDescription: "FISIP Universitas Brawijaya is the official website of the Faculty of Social and Political Sciences at Universitas Brawijaya. It provides information about academic programs, admissions, news, events, research, and campus services, making it easy for students, staff, and prospective students to access important faculty information.",
    tags: ["WordPress", "Elementor", "Custom CSS", "Custom HTML"],
    year: "2025",
    featured: true,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://fisip.ub.ac.id",
  },
  {
    id: "sarangan-medicare",
    title: "saranganmedicare.co.id",
    category: "Web Apps",
    tagline: "Web Apps",
    description: "Sarangan Medicare is a healthcare website for a medical clinic that provides information about its medical services, doctors, operating hours, and patient registration. It also allows patients to view their vaccination history and automatically sends vaccination reminders through WhatsApp to help them stay on schedule.",
    longDescription: "Sarangan Medicare is a healthcare website for a medical clinic that provides information about its medical services, doctors, operating hours, and patient registration. It also allows patients to view their vaccination history and automatically sends vaccination reminders through WhatsApp to help them stay on schedule.",
    tags: ["WordPress", "Elementor", "Custom CSS", "Custom HTML", "Figma"],
    year: "2025",
    featured: true,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://saranganmedicare.co.id",
  },
  {
    id: "handall-id",
    title: "handall.id",
    category: "Company Profile",
    tagline: "Company Profile",
    description: "Handall is a specialty coffee shop website that showcases its menu, location, promotions, and online reservation services. It also allows customers to make reservations, place online orders, and easily access information about the café through a clean and responsive interface.",
    longDescription: "Handall is a specialty coffee shop website that showcases its menu, location, promotions, and online reservation services. It also allows customers to make reservations, place online orders, and easily access information about the café through a clean and responsive interface.",
    tags: ["WordPress", "Elementor", "Custom CSS"],
    year: "2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://handall.id",
  },
  {
    id: "artcofest",
    title: "artcofest.com",
    category: "E-Commerce Website",
    tagline: "E-Commerce Website",
    description: "ArtcoFest is an event and e-commerce website that allows visitors to purchase tickets for the festival online. The project also includes an Android ticket-scanning app that enables event staff to quickly and seamlessly verify tickets using a smartphone, providing a smooth check-in experience for attendees.",
    longDescription: "ArtcoFest is an event and e-commerce website that allows visitors to purchase tickets for the festival online. The project also includes an Android ticket-scanning app that enables event staff to quickly and seamlessly verify tickets using a smartphone, providing a smooth check-in experience for attendees.",
    tags: ["WordPress", "Elementor", "Custom CSS", "Custom HTML", "Figma"],
    year: "2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://artcofest.com",
  },
  {
    id: "ibschool-batu",
    title: "ibschool-batu.com",
    category: "School Website",
    tagline: "School Website",
    description: "Islamic Brilliant School is a school website that provides information about the school's academic programs, admissions, news, events, and student activities. It also includes online registration and payment features, making it easier for parents and prospective students to access school services and information.",
    longDescription: "Islamic Brilliant School is a school website that provides information about the school's academic programs, admissions, news, events, and student activities. It also includes online registration and payment features, making it easier for parents and prospective students to access school services and information.",
    tags: ["WordPress", "Elementor", "Custom CSS", "Custom HTML", "Figma"],
    year: "2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://ibschool-batu.com",
  },
  {
    id: "pauau",
    title: "pauau.com",
    category: "Corporate Website",
    tagline: "Corporate Website",
    description: "Pauau is a multi-faceted company website that showcases various services, including villa rentals and property purchases, concierge services, and business consulting. The website provides users with information about the company's offerings and makes it easier for clients to explore and connect with its services.",
    longDescription: "Pauau is a multi-faceted company website that showcases various services, including villa rentals and property purchases, concierge services, and business consulting. The website provides users with information about the company's offerings and makes it easier for clients to explore and connect with its services.",
    tags: ["WordPress", "Divi", "Custom CSS", "Custom HTML", "Figma"],
    year: "2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://pauau.com",
  },
];

export const TECH_SKILLS = [
  { name: "Next.js", category: "Core Framework", icon: "⚡" },
  { name: "React", category: "UI Library", icon: "⚛️" },
  { name: "TypeScript", category: "Language", icon: "📘" },
  { name: "Tailwind CSS", category: "Styling", icon: "🎨" },
  { name: "Figma", category: "UI/UX Design", icon: "📐" },
  { name: "GSAP", category: "Animation", icon: "🚀" },
  { name: "WordPress", category: "DevOps", icon: "📚" },
  { name: "Elementor", category: "DevOps", icon: "✨" },
  { name: "Divi", category: "DevOps", icon: "🎲" },
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
