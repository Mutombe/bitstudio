import React from "react";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Users,
  Laptop,
  Zap,
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Cpu,
  Wifi,
  Settings,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Play,
  Pause,
  TrendingUp,
  Shield,
  Award,
  ExternalLink,
  ChevronDown,
  Target,
  Lightbulb,
  Brain,
  Sparkles,
  BarChart3,
  Lock,
  Layers,
  Facebook,
} from "lucide-react";

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { icon: <Brain size={24} />, number: "50+", label: "AI Solutions" },
    { icon: <Users size={24} />, number: "30+", label: "Global Clients" },
    { icon: <Award size={24} />, number: "5+", label: "Years Excellence" },
    { icon: <Sparkles size={24} />, number: "100%", label: "Innovation Rate" },
  ];

  const aiCapabilities = [
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Predictive Analytics",
    "Deep Learning",
    "Neural Networks",
    "AI Automation",
    "Smart Algorithms",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section
      id="home"
      className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0c0a0a 0%, #3a3939 50%, #681b29 100%)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #af2c47 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, #681b29 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, #af2c47 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-[#af2c47] rounded-lg opacity-30"
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-40 h-40 border-2 border-[#af2c47] rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-[#af2c47] to-[#681b29] rounded-lg opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
          {/* Left Column - Content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 sm:mb-8">
              {/* Floating Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-6"
                style={{
                  background: "rgba(175, 44, 71, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Sparkles size={16} className="text-[#af2c47]" />
                <span className="text-sm font-medium text-white">
                  AI-Powered Solutions
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Transforming Business
                <span className="block text-transparent bg-gradient-to-r from-[#af2c47] to-[#681b29] bg-clip-text">
                  With Intelligent AI
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
                We craft cutting-edge AI solutions that revolutionize
                industries, automate workflows, and unlock unprecedented
                business value across Zimbabwe and beyond.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <motion.a
                href="#contact"
                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                style={{
                  background:
                    "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                  color: "white",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(175, 44, 71, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your AI Journey
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>
              <motion.a
                href="#case-studies"
                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                  color: "white",
                }}
                whileHover={{
                  scale: 1.05,
                  background: "rgba(175, 44, 71, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies
                <Play
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </motion.a>
            </div>

            {/* Animated Stat Card - Glassmorphism */}
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div
                className="rounded-sm shadow-xl p-4 sm:p-6 max-w-sm mx-auto lg:mx-0"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                }}
              >
                <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "rgba(175, 44, 71, 0.2)",
                      color: "#af2c47",
                    }}
                  >
                    {stats[currentStat].icon}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {stats[currentStat].number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300">
                      {stats[currentStat].label}
                    </div>
                  </div>
                </div>
                {/* Progress indicator */}
                <div className="flex justify-center lg:justify-start mt-3 sm:mt-4 space-x-2">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-sm transition-all duration-300 ${
                        index === currentStat
                          ? "w-8 bg-[#af2c47]"
                          : "w-2 bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive AI Visual */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Main Glassmorphism Card */}
              <div
                className="rounded-sm shadow-2xl p-6 sm:p-8 relative z-10"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                }}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[#af2c47] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#681b29] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#3a3939] rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="text-[#af2c47]" size={20} />
                    <span className="text-xs text-gray-300">AI.engine</span>
                  </div>
                </div>

                {/* AI Code Simulation */}
                <div className="space-y-3 mb-6">
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-sm"
                    style={{ background: "rgba(175, 44, 71, 0.1)" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Cpu className="text-[#af2c47]" size={20} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">
                        Processing Neural Network
                      </div>
                      <div className="text-xs text-gray-400">95% accuracy</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-sm"
                    style={{ background: "rgba(175, 44, 71, 0.1)" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                  >
                    <Database className="text-[#af2c47]" size={20} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">
                        Training ML Models
                      </div>
                      <div className="text-xs text-gray-400">
                        2.4M data points
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-sm"
                    style={{ background: "rgba(175, 44, 71, 0.1)" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                  >
                    <Zap className="text-[#af2c47]" size={20} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">
                        Real-time Analytics
                      </div>
                      <div className="text-xs text-gray-400">
                        Active monitoring
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Uptime", value: "99.9%" },
                    { label: "Speed", value: "<50ms" },
                    { label: "Scale", value: "∞" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="text-center p-3 rounded-sm"
                      style={{ background: "rgba(175, 44, 71, 0.1)" }}
                    >
                      <div className="text-lg font-bold text-[#af2c47]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Gradient Background */}
              <div
                className="absolute -top-4 -left-4 w-full h-full rounded-2xl -z-10 opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                  filter: "blur(20px)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* AI Capabilities Section */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className="rounded-sm shadow-lg p-6 sm:p-8 max-w-5xl mx-auto"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(175, 44, 71, 0.3)",
            }}
          >
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Our AI Expertise
              </h3>
              <p className="text-gray-300 text-sm">
                Powered by cutting-edge artificial intelligence technologies
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {aiCapabilities.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-xs sm:text-sm font-medium transition-all duration-200 cursor-default"
                  style={{
                    background: "rgba(175, 44, 71, 0.2)",
                    color: "#af2c47",
                    border: "1px solid rgba(175, 44, 71, 0.3)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    background: "rgba(175, 44, 71, 0.3)",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-4 sm:p-6 rounded-sm shadow-lg transition-all duration-300 hover:-translate-y-2 group"
      style={{
        background: isHovered
          ? "rgba(175, 44, 71, 0.1)"
          : "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(175, 44, 71, 0.3)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="rounded-sm w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{
          background: "rgba(175, 44, 71, 0.2)",
          color: "#af2c47",
        }}
      >
        {service.icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
        {service.title}
      </h3>
      <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
        {service.description}
      </p>
      <ul className="space-y-2">
        {service.features.map((feature, idx) => (
          <motion.li
            key={idx}
            className="flex items-center text-sm text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 0 : -10 }}
            transition={{ delay: idx * 0.1 }}
          >
            <CheckCircle
              size={14}
              className="text-[#af2c47] mr-2 flex-shrink-0"
            />
            {feature}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const stats = [
    {
      number: "50+",
      label: "AI Solutions",
      icon: <Brain size={20} />,
    },
    { number: "30+", label: "Happy Clients", icon: <Users size={20} /> },
    { number: "5+", label: "Years Experience", icon: <Award size={20} /> },
    { number: "24/7", label: "Support", icon: <Shield size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = [
        "home",
        "about",
        "services",
        "case-studies",
        "clients",
        "team",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowContactOptions(true);
  };

  const handleWhatsAppContact = () => {
    const phone = "263785948128"; // Your phone without + or spaces
    const serviceNames = {
      ai: "AI Solutions",
      mobile: "Mobile App Development",
      web: "Web Development",
      analytics: "Data Analytics",
      automation: "Process Automation",
      consulting: "AI Consulting",
    };

    const message = `Hello Bit Studio!

My name is ${formData.name}

Email: ${formData.email}
Service Interest: ${serviceNames[formData.service] || formData.service}

Message:
${formData.message}

Looking forward to hearing from you!`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    setFormData({ name: "", email: "", service: "", message: "" });
    setShowContactOptions(false);
    toast.success("Redirecting to WhatsApp...", { duration: 2000 });
  };

  const handleEmailContact = () => {
    const email = "admin@bitstudio.co.zw";
    const serviceNames = {
      ai: "AI Solutions",
      mobile: "Mobile App Development",
      web: "Web Development",
      analytics: "Data Analytics",
      automation: "Process Automation",
      consulting: "AI Consulting",
    };

    const subject = `New Inquiry - ${
      serviceNames[formData.service] || formData.service
    }`;
    const body = `Hello Bit Studio,

My name is ${formData.name}

Email: ${formData.email}
Service Interest: ${serviceNames[formData.service] || formData.service}

Message:
${formData.message}

Looking forward to hearing from you!`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setFormData({ name: "", email: "", service: "", message: "" });
    setShowContactOptions(false);
    toast.success("Opening your email client...", { duration: 2000 });
  };

  const services = [
    {
      icon: <Brain size={24} />,
      title: "AI Solutions",
      description:
        "Custom artificial intelligence systems powered by machine learning, neural networks, and advanced algorithms.",
      features: [
        "Machine Learning Models",
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision",
      ],
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications with AI integration for intelligent user experiences.",
      features: [
        "React Native & Flutter",
        "AI-Powered Features",
        "Real-time Analytics",
        "Cloud Integration",
      ],
    },
    {
      icon: <Globe size={24} />,
      title: "Web Development",
      description:
        "Intelligent web applications with responsive design, real-time features, and AI automation.",
      features: [
        "React/Next.js",
        "AI Chatbots",
        "Smart Automation",
        "Progressive Web Apps",
      ],
    },
    {
      icon: <Database size={24} />,
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights with advanced analytics and AI-powered visualization.",
      features: [
        "Big Data Processing",
        "Predictive Models",
        "Real-time Dashboards",
        "Business Intelligence",
      ],
    },
    {
      icon: <Zap size={24} />,
      title: "Process Automation",
      description:
        "Streamline operations with intelligent automation, reducing costs and improving efficiency.",
      features: [
        "RPA Solutions",
        "Workflow Automation",
        "AI Decision Making",
        "Integration Services",
      ],
    },
    {
      icon: <Lock size={24} />,
      title: "AI Security",
      description:
        "Advanced security solutions powered by AI for threat detection and prevention.",
      features: [
        "Threat Detection",
        "Anomaly Recognition",
        "Fraud Prevention",
        "Security Analytics",
      ],
    },
  ];

  const projects = [
    {
      title: "Auto Eden Marketplace",
      category: "E-commerce",
      description:
        "Vehicle marketplace with intelligent search and dealer management.",
      tech: ["Django", "ReactJS", "PostgreSQL", "Tailwind CSS", "Lucide React"],
      size: "large",
      link: "https://autoeden.co.zw",
    },
    {
      title: "Deutsche Aircraft Simulation",
      category: "Aviation",
      description: "Flight simulation scripts and pilot training modules.",
      tech: ["Django", "ReactJS", "Framer Motion"],
      size: "medium",
      link: "https://deutscheaircraft.com",
    },
    {
      title: "Africa RECs Platform",
      category: "Energy",
      description: "Renewable energy certificate trading platform.",
      tech: ["Django", "ReactJS", "PostgreSQL", "Tailwind CSS"],
      size: "medium",
      link: "https://africarecs.com",
    },
    {
      title: "Stuttafords Zimbabwe",
      category: "Shipping, Moving",
      description: "Online platform for shipping and moving services.",
      tech: ["Django", "ReactJS", "PostgreSQL", "Tailwind CSS"],
      size: "medium",
      link: "https://stuttafordszimbabwe.com",
    },
    {
      title: "House of Stone Properties",
      category: "Real Estate",
      description: "Property listing and management platform.",
      tech: ["Django", "ReactJS", "PostgreSQL", "Tailwind CSS"],
      size: "medium",
      link: "https://hsp.co.zw",
    },
    {
      title: "Zim-Rec",
      category: "Energy",
      description: "Renewable energy certificate trading platform.",
      tech: ["Django", "ReactJS", "PostgreSQL", "Tailwind CSS"],
      size: "medium",
      link: "https://zim-rec.co.zw",
    },
    {
      title: "Sacmar Leaf Tobacco",
      category: "Agriculture",
      description: "Tobacco company website",
      tech: ["Django", "ReactJS", "PostgreSQL", "Tailwind CSS"],
      size: "medium",
      link: "https://sacmarleaf.co.zw",
    },
    {
      title: "Lunaj Motors",
      category: "Automotive",
      description: "Car dealership and service website.",
      tech: ["ReactJS", "PostgreSQL", "Framer Motion", "Lucide React"],
      size: "small",
      link: "https://lunajmotors.co.zw",
    },
  ];

  const clients = [
    //{ name: "Auto Eden", logo: "/ae.png" },
    { name: "Stuttafords Zimbabwe", logo: "/favicon.png" },
    { name: "House of Stone", logo: "/hsp.png" },
    { name: "Raphaela", logo: "/raphaela.png" },
    { name: "SACMAR Leaf", logo: "/slt.png" },
    { name: "Africa RECs", logo: "/ari.png" },
    { name: "COCAZ", logo: "/cocaz.png" },
    { name: "Greylink", logo: "/greylink.png" },
    //{ name: "Autoward", logo: "/autoward.png" },
    { name: "Zim-Rec", logo: "/zimrec2.png" },
  ];

  const team = [
    {
      name: "Simbarashe Mutombe",
      role: "AI Engineer & Full-Stack Developer",
      expertise: "Machine Learning, Neural Networks & System Architecture",
      description:
        "Specializes in building scalable AI solutions and intelligent web applications.",
    },
    {
      name: "Newlife Marangwanda",
      role: "Lead AI Architect",
      expertise: "Deep Learning, Enterprise AI & Cloud Solutions",
      description:
        "Expert in designing large-scale AI systems and cloud infrastructure.",
    },
    {
      name: "James Wilson",
      role: "ML Engineer & DevOps",
      expertise: "MLOps, Model Deployment & Automation",
      description:
        "Focuses on AI model optimization and automated deployment pipelines.",
    },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden gellix-font"
      style={{ background: "#0c0a0a" }}
    >
      {" "}
      <style jsx>{`
        /* Century Gothic Font Face */
        @font-face {
          font-family: "Century Gothic Custom";
          src: url("./fonts/weezerfont.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Gellix";
          src: url("./fonts/Gellix-Light.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Gellix";
          src: url("./fonts/Gellix-Regular.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* Font utility classes */
        .gravesend-sans {
          font-family: "Gravesend Sans", "Inter", "Segoe UI", Tahoma, Geneva,
            Verdana, sans-serif;
        }

        .roboto-font {
          font-family: "Roboto", "Inter", "Segoe UI", Tahoma, Geneva, Verdana,
            sans-serif;
        }

        .gellix-font {
          font-family: "Gellix", "Inter", "Segoe UI", Tahoma, Geneva, Verdana,
            sans-serif;
        }

        body {
          overflow-x: hidden;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Toaster position="top-right" richColors />
      {/* Enhanced Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "shadow-lg" : ""
        }`}
        style={{
          background:
            scrollY > 50 ? "rgba(12, 10, 10, 0.95)" : "rgba(12, 10, 10, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom:
            scrollY > 50 ? "1px solid rgba(175, 44, 71, 0.3)" : "none",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div
                className="w-12 h-12 sm:w-12 sm:h-12 rounded-sm flex items-center justify-center"
                style={{
                  background: "",
                }}
              >
                <img
                  src="/logo.png"
                  alt="Bit Studio Logo"
                  className="w-9 h-9 sm:w-9 sm:h-9"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">
                Bit Studio
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {[
                "home",
                "about",
                "services",
                "case-studies",
                "clients",
                "team",
                "contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative ${
                    activeSection === item
                      ? "text-[#af2c47]"
                      : "text-gray-300 hover:text-[#af2c47]"
                  }`}
                >
                  {item === "case-studies"
                    ? "Case Studies"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                  {activeSection === item && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ background: "#af2c47" }}
                      layoutId="activeSection"
                      transition={{ type: "spring", duration: 0.3 }}
                    />
                  )}
                </a>
              ))}
              <motion.a
                href="#contact"
                className="px-4 py-2 rounded-sm text-sm font-medium text-white transition-all duration-300 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(175, 44, 71, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-[100]">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-[#af2c47] focus:outline-none p-2 rounded-lg transition-colors"
                style={{
                  background: isMenuOpen
                    ? "rgba(175, 44, 71, 0.1)"
                    : "transparent",
                }}
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation - Full Screen */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Full Screen Menu - Single Element for Better Performance */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="md:hidden"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100vh",
                  zIndex: 99999,
                  background: "#0c0a0a",
                  overflowY: "auto",
                }}
              >
                {/* Gradient Overlay for Visual Interest */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #0c0a0a 0%, #1a1818 50%, #2a1519 100%)",
                    opacity: 0.95,
                  }}
                />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col px-6 pt-6 pb-8">
                  {/* Header with Logo and Close Button */}
                  <div className="flex justify-between items-center mb-12">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-sm flex items-center justify-center">
                        <img
                          src="/logo.png"
                          alt="Bit Studio Logo"
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="text-xl font-bold text-white">
                        Bit Studio
                      </span>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={closeMenu}
                      className="text-gray-300 hover:text-[#af2c47] p-2 rounded-lg transition-colors"
                      style={{
                        background: "rgba(175, 44, 71, 0.1)",
                      }}
                      aria-label="Close menu"
                    >
                      <X size={28} />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 space-y-3">
                    {[
                      "home",
                      "about",
                      "services",
                      "case-studies",
                      "clients",
                      "team",
                      "contact",
                    ].map((item, index) => (
                      <motion.a
                        key={item}
                        href={`#${item}`}
                        onClick={closeMenu}
                        className={`block px-6 py-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                          activeSection === item
                            ? "text-white"
                            : "text-gray-300 hover:text-white"
                        }`}
                        style={{
                          background:
                            activeSection === item
                              ? "linear-gradient(135deg, #af2c47 0%, #681b29 100%)"
                              : "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(175, 44, 71, 0.3)",
                        }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            {item === "case-studies"
                              ? "Case Studies"
                              : item.charAt(0).toUpperCase() + item.slice(1)}
                          </span>
                          <ChevronRight
                            size={20}
                            className={
                              activeSection === item
                                ? "text-white"
                                : "text-[#af2c47]"
                            }
                          />
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Bottom Section with CTA and Social Links */}
                  <div className="mt-8 space-y-6">
                    {/* CTA Button */}
                    <motion.a
                      href="#contact"
                      onClick={closeMenu}
                      className="block w-full px-8 py-4 rounded-lg text-center font-semibold text-white transition-all shadow-2xl text-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.a>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      {[
                        {
                          icon: <Github size={20} />,
                          href: "https://github.com/Mutombe",
                        },
                        {
                          icon: <Facebook size={20} />,
                          href: "https://www.facebook.com/profile.php?id=61577381903711",
                        },
                        {
                          icon: <Linkedin size={20} />,
                          href: "https://www.linkedin.com/company/bbitstudio/",
                        },
                      ].map((social, idx) => (
                        <motion.a
                          key={idx}
                          href={social.href}
                          className="p-3 rounded-lg transition-all duration-300"
                          style={{
                            background: "rgba(175, 44, 71, 0.1)",
                            border: "1px solid rgba(175, 44, 71, 0.3)",
                            color: "#af2c47",
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                          whileHover={{
                            scale: 1.1,
                            background: "rgba(175, 44, 71, 0.2)",
                          }}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>

                    {/* Contact Info */}
                    <div className="text-center text-gray-400 text-sm">
                      <p>+263 78 594 8128</p>
                      <p>admin@bitstudio.co.zw</p>
                    </div>
                  </div>

                  {/* Background Decorative Elements */}
                  <div
                    className="absolute top-20 right-10 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, #af2c47 0%, transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute bottom-32 left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, #681b29 0%, transparent 70%)",
                    }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <section
        id="about"
        className="py-12 sm:py-16 lg:py-20"
        style={{ background: "#0c0a0a" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-6"
                style={{
                  background: "rgba(175, 44, 71, 0.1)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                }}
              >
                <Sparkles size={16} className="text-[#af2c47]" />
                <span className="text-sm font-medium text-[#af2c47]">
                  About Us
                </span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pioneering AI Innovation in Africa
              </h2>
              <p className="text-gray-300 mb-6 text-base sm:text-lg leading-relaxed">
                We're a cutting-edge AI development company specializing in
                transforming businesses through intelligent automation and
                machine learning. Founded on excellence, innovation, and
                forward-thinking, we deliver AI solutions that create measurable
                business impact.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <motion.div
                  className="p-4 sm:p-6 rounded-sm"
                  style={{
                    background: "rgba(175, 44, 71, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(175, 44, 71, 0.3)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    background: "rgba(175, 44, 71, 0.15)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-3">
                    <Target className="text-[#af2c47] mr-2" size={20} />
                    <h4 className="font-semibold text-white">Our Mission</h4>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Democratize AI technology and empower African businesses
                    with intelligent solutions that drive growth and efficiency.
                  </p>
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 rounded-sm"
                  style={{
                    background: "rgba(175, 44, 71, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(175, 44, 71, 0.3)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    background: "rgba(175, 44, 71, 0.15)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-3">
                    <Lightbulb className="text-[#af2c47] mr-2" size={20} />
                    <h4 className="font-semibold text-white">Our Vision</h4>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Be Africa's leading AI catalyst, transforming industries
                    through innovative artificial intelligence solutions.
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="flex flex-wrap gap-3 sm:gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {["AI-First", "Innovation", "Excellence", "Impact"].map(
                  (value, index) => (
                    <motion.span
                      key={value}
                      className="px-3 sm:px-4 py-2 rounded-sm text-sm font-medium cursor-default"
                      style={{
                        background: "rgba(175, 44, 71, 0.2)",
                        color: "#af2c47",
                        border: "1px solid rgba(175, 44, 71, 0.3)",
                      }}
                      whileHover={{
                        scale: 1.05,
                        background: "rgba(175, 44, 71, 0.3)",
                      }}
                    >
                      {value}
                    </motion.span>
                  )
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-sm group"
                  style={{
                    background:
                      "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(175, 44, 71, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white/80 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-white/90">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Services Section - Bento Layout */}
      <section
        id="services"
        className="py-12 sm:py-16 lg:py-20"
        style={{ background: "#0c0a0a" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-4"
              style={{
                background: "rgba(175, 44, 71, 0.1)",
                border: "1px solid rgba(175, 44, 71, 0.3)",
              }}
            >
              <Layers size={16} className="text-[#af2c47]" />
              <span className="text-sm font-medium text-[#af2c47]">
                Our Services
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              AI-Powered Solutions
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Comprehensive artificial intelligence and software development
              services tailored to revolutionize your business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* Portfolio Section - Bento Layout */}
      <section
        id="case-studies"
        className="py-12 sm:py-16 lg:py-20"
        style={{ background: "#0c0a0a" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-4"
              style={{
                background: "rgba(175, 44, 71, 0.1)",
                border: "1px solid rgba(175, 44, 71, 0.3)",
              }}
            >
              <Rocket size={16} className="text-[#af2c47]" />
              <span className="text-sm font-medium text-[#af2c47]">
                Our Work
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Featured Projects
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Innovative solutions built with modern technologies, delivering
              exceptional results for our clients.
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-sm p-6 sm:p-8 transition-all duration-300 group cursor-pointer ${
                  project.size === "large"
                    ? "md:col-span-2 lg:col-span-2"
                    : project.size === "medium"
                    ? "md:col-span-1 lg:col-span-1"
                    : "md:col-span-1 lg:col-span-1"
                }`}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                  boxShadow: "0 20px 60px rgba(175, 44, 71, 0.4)",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(175, 44, 71, 0.6)",
                }}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs px-3 py-1.5 rounded-sm font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                      color: "white",
                    }}
                  >
                    {project.category}
                  </span>
                  <motion.div
                    className="w-10 h-10 rounded-sm flex items-center justify-center"
                    style={{
                      background: "rgba(175, 44, 71, 0.2)",
                    }}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExternalLink size={18} className="text-[#af2c47]" />
                  </motion.div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#af2c47] transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#af2c47] uppercase tracking-wider">
                    <Layers size={14} />
                    <span>Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-sm font-medium"
                        style={{
                          background: "rgba(175, 44, 71, 0.15)",
                          color: "#af2c47",
                          border: "1px solid rgba(175, 44, 71, 0.3)",
                        }}
                        whileHover={{
                          scale: 1.05,
                          background: "rgba(175, 44, 71, 0.25)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect - Visit Project Link */}
                <motion.div
                  className="mt-6 pt-4 border-t flex items-center gap-2 text-sm font-medium rounded-sm"
                  style={{
                    borderColor: "rgba(175, 44, 71, 0.2)",
                    color: "#af2c47",
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span>Visit Project</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-6">Want to see more of our work?</p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-medium text-white transition-all duration-300 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(175, 44, 71, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Build Together
              <Rocket size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>
      {/* Clients Section - Glassmorphism Grid */}
      <section
        id="clients"
        className="py-12 sm:py-16 lg:py-20"
        style={{ background: "#0c0a0a" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-4"
              style={{
                background: "rgba(175, 44, 71, 0.1)",
                border: "1px solid rgba(175, 44, 71, 0.3)",
              }}
            >
              <Award size={16} className="text-[#af2c47]" />
              <span className="text-sm font-medium text-[#af2c47]">
                Trusted Partners
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Our Satisfied Clients
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Trusted by leading companies across Africa and beyond to deliver
              exceptional AI-powered solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-sm flex items-center justify-center group transition-all duration-300"
                style={{
                  background: "rgba(175, 44, 71, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  background: "rgba(175, 44, 71, 0.1)",
                  borderColor: "rgba(175, 44, 71, 0.5)",
                }}
              >
                <div className="text-center">
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-2 transition-colors"
                    style={{
                      background:
                        "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-16 mx-auto"
                    />
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Bar */}
          <motion.div
            className="mt-12 sm:mt-16 rounded-sm p-6 sm:p-8 max-w-4xl mx-auto"
            style={{
              background: "rgba(175, 44, 71, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(175, 44, 71, 0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: "30+", label: "Trusted Clients" },
                { number: "50+", label: "Projects Delivered" },
                { number: "8", label: "Countries Served" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl sm:text-3xl font-bold text-[#af2c47] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Team Section */}
      <section
        id="team"
        className="py-12 sm:py-16 lg:py-20"
        style={{ background: "#0c0a0a" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-4"
              style={{
                background: "rgba(175, 44, 71, 0.1)",
                border: "1px solid rgba(175, 44, 71, 0.3)",
              }}
            >
              <Users size={16} className="text-[#af2c47]" />
              <span className="text-sm font-medium text-[#af2c47]">
                Our Team
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              AI Experts & Innovators
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Meet the talented minds behind our groundbreaking AI solutions,
              passionate about pushing the boundaries of technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="rounded-sm p-6 sm:p-8 shadow-lg transition-all duration-300 text-center group"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(175, 44, 71, 0.3)",
                }}
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                  }}
                >
                  <Brain size={32} className="text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p
                  className="font-medium mb-2 text-sm sm:text-base"
                  style={{ color: "#af2c47" }}
                >
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {member.expertise}
                </p>
                {member.description && (
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {member.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0c0a0a 0%, #3a3939 50%, #681b29 100%)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-10 left-10 w-32 h-32 border-2 rounded-full"
            style={{ borderColor: "rgba(175, 44, 71, 0.3)" }}
          />
          <div
            className="absolute top-1/3 right-20 w-24 h-24 border-2 rounded-full"
            style={{ borderColor: "rgba(175, 44, 71, 0.3)" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-16 h-16 border-2 rounded-full"
            style={{ borderColor: "rgba(175, 44, 71, 0.3)" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-4"
              style={{
                background: "rgba(175, 44, 71, 0.2)",
                border: "1px solid rgba(175, 44, 71, 0.3)",
              }}
            >
              <MessageSquare size={16} className="text-[#af2c47]" />
              <span className="text-sm font-medium text-[#af2c47]">
                Get In Touch
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Ready to transform your business with AI? Get in touch for a free
              consultation and discover how we can help you achieve your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: <Phone size={20} />,
                    title: "Phone",
                    value: "+263 78 594 8128",
                  },
                  {
                    icon: <Mail size={20} />,
                    title: "Email",
                    value: "admin@bitstudio.co.zw",
                  },
                  {
                    icon: <Globe size={20} />,
                    title: "Website",
                    value: "www.bitstudio.co.zw",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 group p-4 rounded-sm transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(175, 44, 71, 0.3)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{
                      background: "rgba(175, 44, 71, 0.1)",
                    }}
                  >
                    <div
                      className="rounded-sm p-3 group-hover:scale-110 transition-transform"
                      style={{
                        background: "rgba(175, 44, 71, 0.2)",
                        color: "#af2c47",
                      }}
                    >
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {contact.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        {contact.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6 sm:mt-8">
                {[
                  {
                    icon: <Github size={20} />,
                    href: "https://github.com/Mutombe",
                  },
                  {
                    icon: <Facebook size={20} />,
                    href: "https://www.facebook.com/profile.php?id=61577381903711",
                  },
                  {
                    icon: <Linkedin size={20} />,
                    href: "https://www.linkedin.com/company/bbitstudio/",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="rounded-sm p-3 transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(175, 44, 71, 0.3)",
                      color: "#af2c47",
                    }}
                    whileHover={{
                      scale: 1.1,
                      background: "rgba(175, 44, 71, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="rounded-sm p-6 sm:p-8"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(175, 44, 71, 0.3)",
                }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">
                  Send us a message
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300"
                      placeholder="John Doe"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(175, 44, 71, 0.3)",
                        focusRing: "#af2c47",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300"
                      placeholder="john@example.com"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(175, 44, 71, 0.3)",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-sm text-white focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(175, 44, 71, 0.3)",
                      }}
                    >
                      <option value="" className="text-gray-800">
                        Select a service
                      </option>
                      <option value="ai" className="text-gray-800">
                        AI Solutions
                      </option>
                      <option value="mobile" className="text-gray-800">
                        Mobile App Development
                      </option>
                      <option value="web" className="text-gray-800">
                        Web Development
                      </option>
                      <option value="analytics" className="text-gray-800">
                        Data Analytics
                      </option>
                      <option value="automation" className="text-gray-800">
                        Process Automation
                      </option>
                      <option value="consulting" className="text-gray-800">
                        AI Consulting
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
                      placeholder="Tell us about your AI project requirements..."
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(175, 44, 71, 0.3)",
                      }}
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 rounded-sm font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(175, 44, 71, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue <ArrowRight size={20} />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer
        className="py-12"
        style={{
          background: "#0c0a0a",
          borderTop: "1px solid rgba(175, 44, 71, 0.3)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                  }}
                >
                  <Brain className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold text-white">
                  Bit Studio (Pvt) Ltd
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Pioneering AI-powered software solutions that transform
                businesses across Zimbabwe and beyond. Your trusted partner in
                digital innovation and intelligent automation.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    icon: <Github size={20} />,
                    href: "https://github.com/Mutombe",
                  },
                  {
                    icon: <Facebook size={20} />,
                    href: "https://www.facebook.com/profile.php?id=61577381903711",
                  },
                  {
                    icon: <Linkedin size={20} />,
                    href: "https://www.linkedin.com/company/bbitstudio/",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gray-400 transition-colors p-2 rounded-lg"
                    style={{
                      background: "rgba(175, 44, 71, 0.1)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      color: "#af2c47",
                      background: "rgba(175, 44, 71, 0.2)",
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Services
              </h3>
              <ul className="space-y-2">
                {[
                  "AI Solutions",
                  "Mobile Apps",
                  "Web Development",
                  "Data Analytics",
                  "Process Automation",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-[#af2c47] transition-colors text-sm"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Contact Info
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  +263 78 594 8128
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  admin@bitstudio.co.zw
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={16} />
                  www.bitstudio.co.zw
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center"
            style={{
              borderTop: "1px solid rgba(175, 44, 71, 0.3)",
            }}
          >
            <p className="text-gray-500 text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} Bit Studio Pvt Ltd. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-[#af2c47] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#af2c47] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Contact Method Selection Modal */}
      <AnimatePresence>
        {showContactOptions && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              className="max-w-md w-full rounded-sm p-6 sm:p-8"
              style={{
                background: "rgba(12, 10, 10, 0.95)",
                border: "1px solid rgba(175, 44, 71, 0.3)",
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Choose Contact Method
                </h3>
                <p className="text-gray-400 text-sm">
                  How would you like to reach us?
                </p>
              </div>

              <div className="space-y-3">
                {/* WhatsApp Button */}
                <motion.button
                  onClick={handleWhatsAppContact}
                  className="w-full py-4 px-6 rounded-sm font-medium text-white transition-all duration-300 flex items-center justify-center gap-3"
                  style={{
                    background: "#25D366",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(37, 211, 102, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare size={20} />
                  Continue with WhatsApp
                </motion.button>

                {/* Email Button */}
                <motion.button
                  onClick={handleEmailContact}
                  className="w-full py-4 px-6 rounded-sm font-medium text-white transition-all duration-300 flex items-center justify-center gap-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #af2c47 0%, #681b29 100%)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(175, 44, 71, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={20} />
                  Continue with Email
                </motion.button>

                {/* Cancel Button */}
                <motion.button
                  onClick={() => setShowContactOptions(false)}
                  className="w-full py-3 px-6 rounded-sm font-medium text-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(175, 44, 71, 0.3)",
                  }}
                  whileHover={{
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X size={18} />
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
