// =========================================
// BIT STUDIO - SITE DATA & CONTENT
// =========================================

export const companyInfo = {
  name: "Bit Studio",
  tagline: "Where Innovation Meets Intelligence",
  description: "We architect digital experiences that transcend conventional boundaries. Through the fusion of artificial intelligence, elegant design, and engineering excellence, we transform visionary ideas into market-defining products.",
  founded: 2019,
  location: "Harare, Zimbabwe",
  phone: "+263 78 594 8128",
  email: "admin@bitstudio.co.zw",
  website: "www.bitstudio.co.zw",
  social: {
    github: "https://github.com/Mutombe",
    linkedin: "https://www.linkedin.com/company/bbitstudio/",
    facebook: "https://www.facebook.com/profile.php?id=61577381903711",
    twitter: "#"
  }
};

export const stats = [
  { number: "50+", label: "Projects Delivered", description: "Across diverse industries" },
  { number: "30+", label: "Global Clients", description: "Trusted partnerships" },
  { number: "8", label: "Countries", description: "Worldwide reach" },
  { number: "99%", label: "Client Satisfaction", description: "Excellence guaranteed" }
];

export const services = [
  {
    id: "ai-solutions",
    icon: "Brain",
    title: "AI & Machine Learning",
    shortDescription: "Intelligent systems that learn, adapt, and evolve",
    description: "We engineer sophisticated AI solutions that transform raw data into actionable intelligence. From predictive analytics to neural networks, our systems don't just process information—they understand it.",
    features: [
      "Custom Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision Systems",
      "Predictive Analytics",
      "Deep Learning Networks",
      "AI-Powered Automation"
    ],
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "scikit-learn"],
    color: "#af2c47",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"
  },
  {
    id: "web-development",
    icon: "Globe",
    title: "Web Development",
    shortDescription: "Digital experiences that captivate and convert",
    description: "We craft web applications that blend stunning aesthetics with flawless functionality. Every pixel is purposeful, every interaction intentional, creating experiences that users remember.",
    features: [
      "Progressive Web Applications",
      "E-Commerce Platforms",
      "Enterprise Dashboards",
      "Real-time Applications",
      "API Development",
      "Cloud Architecture"
    ],
    technologies: ["React", "Next.js", "Node.js", "Django", "PostgreSQL", "AWS"],
    color: "#3b82f6",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
  },
  {
    id: "mobile-apps",
    icon: "Smartphone",
    title: "Mobile Applications",
    shortDescription: "Native experiences in your pocket",
    description: "We build mobile applications that feel native to every platform while maintaining code efficiency. Smooth animations, intuitive gestures, and offline-first architecture define our approach.",
    features: [
      "Cross-Platform Development",
      "Native iOS & Android",
      "Offline-First Architecture",
      "Push Notifications",
      "In-App Purchases",
      "Analytics Integration"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800"
  },
  {
    id: "data-analytics",
    icon: "BarChart3",
    title: "Data Analytics",
    shortDescription: "Insights that drive decisions",
    description: "We transform complex data landscapes into clear, actionable insights. Our analytics solutions reveal patterns invisible to the naked eye, empowering data-driven decision making.",
    features: [
      "Business Intelligence",
      "Real-time Dashboards",
      "Data Visualization",
      "Predictive Modeling",
      "ETL Pipelines",
      "Custom Reporting"
    ],
    technologies: ["Python", "Tableau", "Power BI", "Apache Spark", "Snowflake"],
    color: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
  },
  {
    id: "process-automation",
    icon: "Zap",
    title: "Process Automation",
    shortDescription: "Efficiency engineered",
    description: "We identify bottlenecks and eliminate them through intelligent automation. Our solutions reduce manual effort, minimize errors, and free your team to focus on what matters most.",
    features: [
      "Robotic Process Automation",
      "Workflow Optimization",
      "Document Processing",
      "Integration Services",
      "Custom Bot Development",
      "Process Mining"
    ],
    technologies: ["Python", "UiPath", "Zapier", "n8n", "Power Automate"],
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800"
  },
  {
    id: "cloud-security",
    icon: "Shield",
    title: "Cloud & Security",
    shortDescription: "Secure, scalable infrastructure",
    description: "We architect cloud solutions that scale effortlessly while maintaining fortress-level security. Your data is protected, your uptime is guaranteed, your growth is unlimited.",
    features: [
      "Cloud Architecture",
      "Security Audits",
      "DevOps & CI/CD",
      "Threat Detection",
      "Compliance Management",
      "Disaster Recovery"
    ],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Docker"],
    color: "#ef4444",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
  }
];

export const projects = [
  {
    id: "hsp",
    title: "House of Stone Properties",
    subtitle: "Real Estate Platform",
    category: "Real Estate",
    year: "2023",
    description: "Elegant property listing and management platform showcasing Zimbabwe's finest real estate.",
    challenge: "Create a sophisticated platform that elevates the property search experience while providing powerful tools for agents.",
    solution: "Immersive property showcases with virtual tours, intelligent matching algorithms, and comprehensive CRM.",
    results: ["200+ properties listed", "40% faster property transactions", "Integrated virtual tours"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://hsp.co.zw",
    logo: "/hsp.png",
    featured: true,
    color: "#f59e0b"
  },
  {
    id: "zim-rec",
    title: "Zim-Rec",
    subtitle: "Green Energy Certificates",
    category: "Energy",
    year: "2023",
    description: "Zimbabwe's dedicated renewable energy certificate registry for international markets.",
    challenge: "Build a compliant, transparent system for issuing and tracking renewable energy certificates.",
    solution: "Robust registry with automated verification, international standard compliance, and detailed analytics.",
    results: ["National registry adoption", "100% audit compliance", "International market access"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://zim-rec.co.zw",
    logo: "/zimrec2.png",
    featured: false,
    color: "#10b981"
  },
  {
    id: "sacmar",
    title: "Sacmar Leaf Tobacco",
    subtitle: "Agricultural Excellence",
    category: "Agriculture",
    year: "2023",
    description: "Digital presence for Zimbabwe's tobacco industry leader with heritage showcase.",
    challenge: "Create a digital platform that communicates brand heritage while providing modern functionality.",
    solution: "Elegant brand showcase with investor relations, sustainability reporting, and partner portals.",
    results: ["Enhanced brand visibility", "Investor engagement platform", "Sustainability dashboard"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://sacmarleaftobacco.co.zw",
    logo: "/slt.png",
    featured: false,
    color: "#84cc16"
  },
  {
    id: "lunaj-motors",
    title: "Lunaj Motors",
    subtitle: "Automotive Showroom",
    category: "Automotive",
    year: "2024",
    description: "Premium car dealership digital experience with immersive galleries and inquiry systems.",
    challenge: "Create a premium digital showroom that matches the quality of the vehicles being sold.",
    solution: "High-end visual experience with detailed vehicle galleries, financing calculators, and appointment booking.",
    results: ["Premium brand positioning", "50% increase in qualified leads", "Reduced showroom visits needed"],
    technologies: ["React", "PostgreSQL", "Framer Motion", "Lucide React"],
    link: "https://lunajmotors.co.zw",
    logo: "/lunaj.svg",
    featured: false,
    color: "#1e3a8a"
  },
  {
    id: "gemak-security",
    title: "Gemak Security",
    subtitle: "Security Solutions",
    category: "Security",
    year: "2024",
    description: "Comprehensive digital platform for a leading security firm, streamlining operations and client management.",
    challenge: "Build an integrated system for security operations, patrol tracking, and client reporting.",
    solution: "Custom security management platform with real-time monitoring dashboards and automated incident reporting.",
    results: ["Operational efficiency improved", "Real-time patrol tracking", "Automated client reports"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://gemaksecurity.co.zw",
    logo: "/GEMAK SECURITY SERVICES LOGO.png",
    featured: true,
    color: "#6366f1"
  },
  {
    id: "silver-carbon",
    title: "Silver Carbon",
    subtitle: "Carbon Credits Platform",
    category: "Energy",
    year: "2024",
    description: "Carbon credit marketplace enabling sustainable environmental trading and verification.",
    challenge: "Create a transparent carbon credit trading platform that meets international environmental standards.",
    solution: "Verified carbon credit marketplace with real-time trading, audit trails, and sustainability analytics.",
    results: ["Transparent credit trading", "International standard compliance", "Sustainability tracking"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://silvercarbon.co.zw",
    logo: "/silverc.png",
    featured: true,
    color: "#059669"
  },
  {
    id: "drive-zimbabwe",
    title: "Drive Zimbabwe",
    subtitle: "Mobility Platform",
    category: "Automotive",
    year: "2024",
    description: "Zimbabwe's driving and mobility information hub connecting drivers with essential resources.",
    challenge: "Build a comprehensive platform for driving resources, licensing info, and road safety content.",
    solution: "Information-rich platform with interactive tools, licensing guides, and community features.",
    results: ["Growing user base", "Comprehensive resource library", "Community engagement"],
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    link: "https://drivezim.co.zw",
    logo: "/drivezim.png",
    featured: false,
    color: "#0ea5e9"
  },
  {
    id: "bridge-one",
    title: "Bridge One",
    subtitle: "Financial Solutions",
    category: "Finance",
    year: "2024",
    description: "Financial bridging and investment platform connecting investors with opportunities.",
    challenge: "Create a secure, user-friendly platform for financial transactions and investment management.",
    solution: "Robust financial platform with secure transactions, portfolio management, and analytics dashboards.",
    results: ["Secure transaction processing", "Portfolio management tools", "Investor analytics"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://boa-66yv.onrender.com/",
    logo: "/boa.png",
    featured: false,
    color: "#d97706"
  },
  {
    id: "glens-removals",
    title: "Glens Removals",
    subtitle: "Moving & Logistics",
    category: "Shipping & Moving",
    year: "2024",
    description: "Professional moving and removals service platform with booking and tracking capabilities.",
    challenge: "Digitize a traditional removals business with online booking and real-time logistics tracking.",
    solution: "Modern booking platform with instant quotes, scheduling, and customer communication tools.",
    results: ["Online booking system", "Streamlined operations", "Customer satisfaction boost"],
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    link: "https://glensremovals.co.zw",
    logo: "/logo.webp",
    featured: false,
    color: "#dc2626"
  },
  {
    id: "silvergill",
    title: "Silvergill",
    subtitle: "Business Solutions",
    category: "Consulting",
    year: "2024",
    description: "Corporate consulting firm's digital presence showcasing expertise and service offerings.",
    challenge: "Build a professional digital presence that conveys trust, expertise, and corporate authority.",
    solution: "Elegant corporate website with service showcases, team profiles, and client engagement tools.",
    results: ["Professional brand positioning", "Lead generation pipeline", "Client engagement platform"],
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://silvergill.co.zw",
    logo: "/silver.png",
    featured: false,
    color: "#7c3aed"
  },
  {
    id: "mama-vee",
    title: "Mama Vee",
    subtitle: "Food & Lifestyle Brand",
    category: "Food & Beverage",
    year: "2024",
    description: "Vibrant food and lifestyle brand platform with e-commerce and content features.",
    challenge: "Create an engaging brand experience that drives product sales and community building.",
    solution: "E-commerce enabled platform with recipes, lifestyle content, and seamless product ordering.",
    results: ["E-commerce integration", "Content-driven engagement", "Brand community growth"],
    technologies: ["React", "Django", "PostgreSQL", "Tailwind CSS"],
    link: "https://mamavee.co.zw",
    logo: "/vn.png",
    featured: false,
    color: "#e11d48"
  },
    {
    id: "auto-eden",
    title: "Auto Eden",
    subtitle: "Marketplace Revolution",
    category: "E-Commerce",
    year: "2024",
    description: "Zimbabwe's premier vehicle marketplace featuring intelligent search, dealer management, and seamless transactions.",
    challenge: "Create a trusted marketplace that connects buyers and sellers while providing tools for dealerships to manage their inventory effectively.",
    solution: "A comprehensive platform with advanced filtering, secure communications, dealer dashboards, and integrated payment systems.",
    results: ["300% increase in dealer engagement", "50K+ monthly active users", "4.8/5 user satisfaction rating"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS", "Redis"],
    link: "https://autoeden.co.zw",
    logo: "/ae.png",
    featured: false,
    color: "#af2c47"
  },
  {
    id: "deutsche-aircraft",
    title: "Deutsche Aircraft",
    subtitle: "Aviation Simulation",
    category: "Aviation",
    year: "2024",
    description: "Advanced flight simulation platform for pilot training modules with realistic aviation experiences.",
    challenge: "Build an immersive simulation environment that accurately replicates real-world flight scenarios for training purposes.",
    solution: "Custom simulation engine with physics-accurate flight dynamics, realistic cockpit interfaces, and comprehensive training modules.",
    results: ["Used by 5+ flight schools", "95% training accuracy", "Reduced training costs by 40%"],
    technologies: ["Django", "React", "Framer Motion", "WebGL"],
    link: "https://deutscheaircraft.com",
    logo: null,
    featured: false,
    color: "#3b82f6"
  },
  {
    id: "africa-recs",
    title: "Africa RECs",
    subtitle: "Energy Trading Platform",
    category: "Energy",
    year: "2023",
    description: "Renewable energy certificate trading platform connecting African energy producers with global markets.",
    challenge: "Create a transparent, efficient marketplace for renewable energy certificates that meets international standards.",
    solution: "Blockchain-inspired ledger system with real-time trading, automated verification, and comprehensive reporting.",
    results: ["$2M+ certificates traded", "15+ energy producers onboarded", "Carbon neutral verification"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://africarecs.com",
    logo: "/ari.png",
    featured: false,
    color: "#10b981"
  },
  {
    id: "stuttafords",
    title: "Stuttafords Zimbabwe",
    subtitle: "Logistics Excellence",
    category: "Shipping & Moving",
    year: "2023",
    description: "Digital transformation of Zimbabwe's trusted moving and shipping company with streamlined logistics.",
    challenge: "Modernize a traditional logistics business with digital booking, tracking, and customer management systems.",
    solution: "End-to-end digital platform with instant quotes, real-time tracking, and automated customer communications.",
    results: ["60% reduction in booking time", "Real-time shipment tracking", "Digital payment integration"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://stuttafordszimbabwe.com",
    logo: "/stuttafords.png",
    featured: false,
    color: "#8b5cf6"
  },
];

export const clients = [
  { name: "Silver Carbon", logo: "/silverc.png", link: "https://silvercarbon.co.zw" },
  { name: "Drive Zimbabwe", logo: "/drivezim.png", link: "https://drivezim.co.zw" },
  { name: "Bridge One", logo: "/boa.png", link: "https://boa-66yv.onrender.com" },
  { name: "Glens Removals", logo: "/logo.webp", link: "https://glensremovals.co.zw" },
  { name: "Silvergill", logo: "/silver.png", link: "https://silvergill.co.zw" },
  { name: "Stuttafords Zimbabwe", logo: "/stuttafords.png", link: "https://stuttafordszimbabwe.com" },
  { name: "House of Stone", logo: "/hsp.png", link: "https://hsp.co.zw" },
  { name: "Raphaela Psychotherapy", logo: "/raphaela.png", link: "https://raphaelapsychotherapy.ca" },
  { name: "SACMAR Leaf", logo: "/slt.png", link: "https://sacmarleaftobacco.co.zw" },
  { name: "Africa RECs", logo: "/ari.png", link: "https://africarecs.com" },
  { name: "COCAZ", logo: "/cocaz.png", link: "https://cocaz.org.zw" },
  { name: "Zim-Rec", logo: "/zimrec2.png", link: "https://zim-rec.co.zw" },
  { name: "Greylink", logo: "/greylink.png", link: "https://greylink.onrender.com" },
  { name: "Gemak Security", logo: "/GEMAK SECURITY SERVICES LOGO.png", link: "https://gemaksecurity.co.zw" },
  { name: "Mama Vee", logo: "/vn.png", link: "https://mamavee.co.zw" }
];

export const products = [
  {
    id: "parameter",
    title: "Parameter",
    tagline: "Real Estate Accounting",
    description: "Comprehensive real estate accounting platform that simplifies property financial management, tenant billing, and revenue tracking for property managers and landlords.",
    features: ["Property Financial Management", "Tenant Billing & Invoicing", "Revenue Analytics", "Expense Tracking", "Multi-property Support", "Automated Reporting"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://parameter.co.zw",
    logo: "/parameter.png",
    color: "#af2c47",
    status: "Live",
    icon: "BarChart3"
  },
  {
    id: "exam-revise",
    title: "Exam Revise",
    tagline: "Best ZIMSEC Revision Platform with AI",
    description: "AI-powered revision platform helping Zimbabwean students ace their ZIMSEC exams with intelligent question generation, adaptive learning paths, and comprehensive study materials.",
    features: ["AI Question Generation", "Adaptive Learning Paths", "Past Paper Analysis", "Performance Tracking", "Subject-wise Revision", "Smart Study Planner"],
    technologies: ["React", "Django", "OpenAI", "PostgreSQL", "TensorFlow"],
    link: "https://examrevise.co.zw",
    logo: "/exam.png",
    color: "#3b82f6",
    status: "Live",
    icon: "Brain"
  }
];

export const team = [
  {
    id: "simba",
    name: "Simbarashe Mutombe",
    role: "Founder & Lead Engineer",
    title: "AI Engineer & Full-Stack Developer",
    expertise: ["Machine Learning", "Neural Networks", "System Architecture", "React", "Python"],
    description: "Visionary technologist specializing in building scalable AI solutions and intelligent web applications. With a passion for pushing technological boundaries, Simba leads our team in creating products that matter.",
    image: null,
    social: {
      github: "https://github.com/Mutombe",
      linkedin: "#"
    }
  },
  {
    id: "newlife",
    name: "Newlife Marangwanda",
    role: "Lead AI Architect",
    title: "Deep Learning & Cloud Solutions",
    expertise: ["Deep Learning", "Enterprise AI", "Cloud Architecture", "MLOps", "TensorFlow"],
    description: "Expert in designing large-scale AI systems and cloud infrastructure. Newlife brings enterprise-grade reliability to every solution, ensuring our AI systems perform flawlessly at scale.",
    image: null,
    social: {
      github: "#",
      linkedin: "#"
    }
  },
  {
    id: "james",
    name: "James Wilson",
    role: "ML Engineer & DevOps",
    title: "Model Deployment & Automation",
    expertise: ["MLOps", "Model Deployment", "CI/CD", "Kubernetes", "Docker"],
    description: "Focuses on AI model optimization and automated deployment pipelines. James ensures our solutions go from concept to production seamlessly, with robust infrastructure that scales.",
    image: null,
    social: {
      github: "#",
      linkedin: "#"
    }
  }
];

export const testimonials = [
  {
    quote: "Bit Studio transformed our vision into a platform that exceeded every expectation. Their AI expertise is unmatched.",
    author: "Client Representative",
    company: "Africa RECs",
    rating: 5
  },
  {
    quote: "The attention to detail and technical excellence delivered by the team set a new standard for our digital presence.",
    author: "Project Lead",
    company: "Stuttafords Zimbabwe",
    rating: 5
  },
  {
    quote: "Working with Bit Studio felt like having an extension of our own team. They understood our needs perfectly.",
    author: "CEO",
    company: "House of Stone Properties",
    rating: 5
  }
];

export const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Django", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" }
];

export const values = [
  {
    title: "Innovation First",
    description: "We don't follow trends—we create them. Every solution we build pushes the boundaries of what's possible.",
    icon: "Lightbulb"
  },
  {
    title: "Excellence Always",
    description: "Mediocrity is not in our vocabulary. We obsess over every detail until perfection is achieved.",
    icon: "Award"
  },
  {
    title: "Impact Driven",
    description: "We measure success by the real-world impact our solutions create for businesses and communities.",
    icon: "Target"
  },
  {
    title: "Partnership Mindset",
    description: "We're not vendors—we're partners. Your success is our success, and we're invested in your journey.",
    icon: "Users"
  }
];

export const process = [
  {
    step: 1,
    title: "Discovery",
    description: "We dive deep into understanding your vision, challenges, and objectives. This foundation shapes everything that follows."
  },
  {
    step: 2,
    title: "Strategy",
    description: "Armed with insights, we architect a comprehensive solution strategy that aligns technology with business goals."
  },
  {
    step: 3,
    title: "Design",
    description: "We craft intuitive interfaces and experiences that delight users while achieving your objectives."
  },
  {
    step: 4,
    title: "Development",
    description: "Our engineers bring designs to life with clean, scalable code that's built to last."
  },
  {
    step: 5,
    title: "Launch",
    description: "We deploy with precision, ensuring a smooth transition and immediate impact."
  },
  {
    step: 6,
    title: "Evolve",
    description: "Post-launch, we continue optimizing based on real-world performance and emerging opportunities."
  }
];

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" }
];
