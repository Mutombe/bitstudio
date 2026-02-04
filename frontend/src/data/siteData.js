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
    id: "auto-eden",
    title: "Auto Eden",
    subtitle: "Marketplace Revolution",
    category: "E-Commerce",
    year: "2024",
    description: "Zimbabwe's premier vehicle marketplace featuring intelligent search, dealer management, and seamless transactions. We built a platform that transformed how vehicles are bought and sold across the nation.",
    challenge: "Create a trusted marketplace that connects buyers and sellers while providing tools for dealerships to manage their inventory effectively.",
    solution: "A comprehensive platform with advanced filtering, secure communications, dealer dashboards, and integrated payment systems.",
    results: ["300% increase in dealer engagement", "50K+ monthly active users", "4.8/5 user satisfaction rating"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS", "Redis"],
    link: "https://autoeden.co.zw",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
    featured: true,
    color: "#af2c47"
  },
  {
    id: "deutsche-aircraft",
    title: "Deutsche Aircraft",
    subtitle: "Aviation Simulation",
    category: "Aviation",
    year: "2024",
    description: "Advanced flight simulation platform for pilot training modules. We developed sophisticated scripts and interfaces that bring realistic aviation experiences to aspiring pilots.",
    challenge: "Build an immersive simulation environment that accurately replicates real-world flight scenarios for training purposes.",
    solution: "Custom simulation engine with physics-accurate flight dynamics, realistic cockpit interfaces, and comprehensive training modules.",
    results: ["Used by 5+ flight schools", "95% training accuracy", "Reduced training costs by 40%"],
    technologies: ["Django", "React", "Framer Motion", "WebGL"],
    link: "https://deutscheaircraft.com",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    featured: true,
    color: "#3b82f6"
  },
  {
    id: "africa-recs",
    title: "Africa RECs",
    subtitle: "Energy Trading Platform",
    category: "Energy",
    year: "2023",
    description: "Revolutionary renewable energy certificate trading platform connecting African energy producers with global markets. Enabling the green energy transition across the continent.",
    challenge: "Create a transparent, efficient marketplace for renewable energy certificates that meets international standards.",
    solution: "Blockchain-inspired ledger system with real-time trading, automated verification, and comprehensive reporting.",
    results: ["$2M+ certificates traded", "15+ energy producers onboarded", "Carbon neutral verification"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://africarecs.com",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200",
    featured: true,
    color: "#10b981"
  },
  {
    id: "stuttafords",
    title: "Stuttafords Zimbabwe",
    subtitle: "Logistics Excellence",
    category: "Shipping & Moving",
    year: "2023",
    description: "Digital transformation of Zimbabwe's trusted moving and shipping company. A modern platform that streamlines logistics operations and customer interactions.",
    challenge: "Modernize a traditional logistics business with digital booking, tracking, and customer management systems.",
    solution: "End-to-end digital platform with instant quotes, real-time tracking, and automated customer communications.",
    results: ["60% reduction in booking time", "Real-time shipment tracking", "Digital payment integration"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://stuttafordszimbabwe.com",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
    featured: false,
    color: "#8b5cf6"
  },
  {
    id: "hsp",
    title: "House of Stone Properties",
    subtitle: "Real Estate Platform",
    category: "Real Estate",
    year: "2023",
    description: "Elegant property listing and management platform showcasing Zimbabwe's finest real estate. Connecting property seekers with their dream homes.",
    challenge: "Create a sophisticated platform that elevates the property search experience while providing powerful tools for agents.",
    solution: "Immersive property showcases with virtual tours, intelligent matching algorithms, and comprehensive CRM.",
    results: ["200+ properties listed", "40% faster property transactions", "Integrated virtual tours"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://hsp.co.zw",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
    featured: false,
    color: "#f59e0b"
  },
  {
    id: "zim-rec",
    title: "Zim-Rec",
    subtitle: "Green Energy Certificates",
    category: "Energy",
    year: "2023",
    description: "Zimbabwe's dedicated renewable energy certificate registry. Tracking and verifying the nation's green energy production for international markets.",
    challenge: "Build a compliant, transparent system for issuing and tracking renewable energy certificates.",
    solution: "Robust registry with automated verification, international standard compliance, and detailed analytics.",
    results: ["National registry adoption", "100% audit compliance", "International market access"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://zim-rec.co.zw",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
    featured: false,
    color: "#10b981"
  },
  {
    id: "sacmar",
    title: "Sacmar Leaf Tobacco",
    subtitle: "Agricultural Excellence",
    category: "Agriculture",
    year: "2023",
    description: "Digital presence for Zimbabwe's tobacco industry leader. Showcasing heritage, quality, and commitment to sustainable agriculture.",
    challenge: "Create a digital platform that communicates brand heritage while providing modern functionality.",
    solution: "Elegant brand showcase with investor relations, sustainability reporting, and partner portals.",
    results: ["Enhanced brand visibility", "Investor engagement platform", "Sustainability dashboard"],
    technologies: ["Django", "React", "PostgreSQL", "Tailwind CSS"],
    link: "https://sacmarleaftobacco.co.zw",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200",
    featured: false,
    color: "#84cc16"
  },
  {
    id: "lunaj-motors",
    title: "Lunaj Motors",
    subtitle: "Automotive Showroom",
    category: "Automotive",
    year: "2024",
    description: "Premium car dealership digital experience. Showcasing luxury vehicles with immersive galleries and seamless inquiry systems.",
    challenge: "Create a premium digital showroom that matches the quality of the vehicles being sold.",
    solution: "High-end visual experience with detailed vehicle galleries, financing calculators, and appointment booking.",
    results: ["Premium brand positioning", "50% increase in qualified leads", "Reduced showroom visits needed"],
    technologies: ["React", "PostgreSQL", "Framer Motion", "Lucide React"],
    link: "https://lunajmotors.co.zw",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
    featured: false,
    color: "#1e3a8a"
  }
];

export const clients = [
  { name: "Stuttafords Zimbabwe", logo: "/stuttafords.png", link: "https://stuttafordszimbabwe.com" },
  { name: "House of Stone", logo: "/hsp.png", link: "https://hsp.co.zw" },
  { name: "Raphaela Psychotherapy", logo: "/raphaela.png", link: "https://raphaelapsychotherapy.ca" },
  { name: "SACMAR Leaf", logo: "/slt.png", link: "https://sacmarleaftobacco.co.zw" },
  { name: "Africa RECs", logo: "/ari.png", link: "https://africarecs.com" },
  { name: "COCAZ", logo: "/cocaz.png", link: "https://cocaz.org.zw" },
  { name: "Zim-Rec", logo: "/zimrec2.png", link: "https://zim-rec.co.zw" },
  { name: "Greylink", logo: "/greylink.png", link: "https://greylink.co.zw" }
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
