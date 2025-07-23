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
} from "lucide-react";

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { icon: <Code size={24} />, number: "50+", label: "Projects Delivered" },
    { icon: <Users size={24} />, number: "25+", label: "Happy Clients" },
    { icon: <Award size={24} />, number: "3+", label: "Years Experience" },
    { icon: <Zap size={24} />, number: "100%", label: "Success Rate" },
  ];

  const technologies = [
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "TypeScript",
    "GraphQL",
    "Next.js",
    "Django",
    "Flutter",
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
      className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
    >
      {/* Enhanced Floating Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-10 sm:w-16 h-10 sm:h-16 bg-indigo-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-8 sm:left-20 w-8 sm:w-12 h-8 sm:h-12 bg-blue-400 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-6 sm:w-8 h-6 sm:h-8 bg-indigo-200 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-1/3 right-4 sm:right-10 w-4 sm:w-6 h-4 sm:h-6 bg-blue-300 rounded-full opacity-25 animate-pulse"></div>
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 sm:mb-6 leading-tight">
                Innovative Software
                <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                  Solutions
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
                Transforming concepts into powerful, user-friendly applications
                that drive business growth across Zimbabwe and beyond.
              </p>
            </div>

            {/* CTA Buttons - Enhanced Mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <motion.a
                href="#contact"
                className="group bg-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>
              <motion.a
                href="#portfolio"
                className="group bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-blue-900 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
                <Play
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </motion.a>
            </div>

            {/* Animated Stats - Mobile Optimized */}
            <div className="mb-6 sm:mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-sm mx-auto lg:mx-0 border border-gray-100">
                <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                  <div className="text-blue-900 p-2 bg-blue-50 rounded-lg">
                    {stats[currentStat].icon}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-900">
                      {stats[currentStat].number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stats[currentStat].label}
                    </div>
                  </div>
                </div>
                {/* Progress indicator */}
                <div className="flex justify-center lg:justify-start mt-3 sm:mt-4 space-x-2">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStat ? "bg-blue-900" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Code Block - Mobile Optimized */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 relative z-10 border border-gray-100">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex space-x-2">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">Bitstudio.jsx</span>
                </div>
                <pre className="text-xs sm:text-sm text-gray-800 overflow-x-auto leading-relaxed">
                  <code className="font-mono">
                    {`function Bitstudio() {
  return (
    <div className="innovation">
      {solutions.map(solution => (
        <DeliverExcellence 
          key={solution.id}
          title={solution.title}
          client={solution.client}
          impact={solution.impact}
        />
      ))}
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl -z-10 opacity-90"></div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Section - Enhanced Mobile */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-5xl mx-auto border border-gray-100">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Our Technology Stack
              </h3>
              <p className="text-gray-600 text-sm">
                Building with cutting-edge technologies for optimal performance
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-blue-200 hover:scale-105 transition-transform duration-200 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
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
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-900 group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-900">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
        {service.description}
      </p>
      <ul className="space-y-2">
        {service.features.map((feature, idx) => (
          <motion.li
            key={idx}
            className="flex items-center text-sm text-gray-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 0 : -10 }}
            transition={{ delay: idx * 0.1 }}
          >
            <CheckCircle
              size={14}
              className="text-green-500 mr-2 flex-shrink-0"
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

  const stats = [
    {
      number: "50+",
      label: "Projects Delivered",
      icon: <CheckCircle size={20} />,
    },
    { number: "30+", label: "Happy Clients", icon: <Users size={20} /> },
    { number: "5+", label: "Years Experience", icon: <Award size={20} /> },
    { number: "24/7", label: "Support", icon: <Shield size={20} /> },
  ];

  // Enhanced scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = [
        "home",
        "about",
        "services",
        "portfolio",
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
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch within 24 hours.", {
      duration: 4000,
    });
  };

  const services = [
    {
      icon: <Code size={24} />,
      title: "Custom Software",
      description:
        "Tailored applications designed specifically for your unique business requirements and workflow optimization.",
      features: [
        "Enterprise Solutions",
        "API Development",
        "System Integration",
        "Legacy Modernization",
      ],
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
      features: [
        "React Native",
        "Flutter",
        "Native iOS/Android",
        "Progressive Web Apps",
      ],
    },
    {
      icon: <Globe size={24} />,
      title: "Web Development",
      description:
        "Responsive, scalable websites and web applications built with modern frameworks and best practices.",
      features: [
        "React/Vue.js",
        "Next.js/Nuxt.js",
        "E-commerce Solutions",
        "CMS Development",
      ],
    },
    {
      icon: <Database size={24} />,
      title: "Enterprise Solutions",
      description:
        "Complex ERP and business management systems that streamline operations and improve efficiency.",
      features: [
        "ERP Systems",
        "CRM Solutions",
        "Business Intelligence",
        "Workflow Automation",
      ],
    },
    {
      icon: <Wifi size={24} />,
      title: "IoT Solutions",
      description:
        "Smart device integration and embedded systems that connect the physical and digital worlds.",
      features: [
        "Hardware Integration",
        "Sensor Networks",
        "Smart Devices",
        "Real-time Monitoring",
      ],
    },
    {
      icon: <Settings size={24} />,
      title: "UI/UX Design",
      description:
        "Intuitive interfaces that prioritize user experience and drive engagement through thoughtful design.",
      features: [
        "User Research",
        "Prototyping",
        "Design Systems",
        "Usability Testing",
      ],
    },
  ];

  const projects = [
    {
      title: "CGI Trading Platform",
      location: "Zimbabwe",
      category: "FinTech",
      description:
        "Advanced trading platform with real-time market data, portfolio management, and automated trading features.",
      tech: ["Python", "Django", "React", "PostgreSQL", "Redis"],
      impact: "300% increase in trading volume",
    },
    {
      title: "Auto Eden Marketplace",
      location: "Zimbabwe",
      category: "E-commerce",
      description:
        "Comprehensive vehicle marketplace with advanced search, filtering, and dealer management system.",
      tech: ["React", "Node.js", "MongoDB", "Redis", "Stripe"],
      impact: "50,000+ active users",
    },
    {
      title: "Deutsche Aircraft Simulation",
      location: "Germany",
      category: "Aviation",
      description:
        "Flight simulation scripts and training modules for pilot education and aircraft testing.",
      tech: ["Python", "C++", "OpenGL", "Real-time Systems"],
      impact: "Enhanced pilot training efficiency",
    },
    {
      title: "Africa International RECs",
      location: "Multi-country",
      category: "Energy",
      description:
        "Regional energy certificate trading platform facilitating renewable energy credit transactions.",
      tech: ["Django", "React", "PostgreSQL", "Docker", "AWS"],
      impact: "Sustainable energy adoption",
    },
  ];

  const team = [
    {
      name: "Simbarashe Mutombe",
      role: "Software Engineer",
      expertise: "Full-Stack Development & System Architecture",
      description:
        "Specializes in scalable web applications and modern JavaScript frameworks.",
    },
    {
      name: "Newlife Marangwanda",
      role: "Lead Engineer",
      expertise: "Enterprise Solutions & Cloud Architecture",
      description:
        "Expert in designing and implementing large-scale enterprise systems.",
    },
    {
      name: "James Wilson",
      role: "DevOps Engineer",
      expertise: "Cloud Infrastructure & Automation",
      description:
        "Focuses on deployment automation and cloud infrastructure optimization.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">
      <Toaster position="top-right" richColors />

      {/* Enhanced Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                <img
                  src="./logo.png"
                  alt="Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-blue-900">
                Bit Studio
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {[
                "home",
                "about",
                "services",
                "portfolio",
                "team",
                "contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative ${
                    activeSection === item
                      ? "text-blue-900"
                      : "text-gray-600 hover:text-blue-900"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {activeSection === item && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-900"
                      layoutId="activeSection"
                      transition={{ type: "spring", duration: 0.3 }}
                    />
                  )}
                </a>
              ))}
              <motion.a
                href="#contact"
                className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-900 focus:outline-none p-2 rounded-lg hover:bg-blue-50 transition-colors"
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

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {[
                  "home",
                  "about",
                  "services",
                  "portfolio",
                  "team",
                  "contact",
                ].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeSection === item
                        ? "text-blue-900 bg-blue-50 border-l-4 border-blue-900"
                        : "text-gray-600 hover:text-blue-900 hover:bg-gray-50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={closeMenu}
                  className="block mx-4 mt-4 bg-blue-900 text-white px-6 py-3 rounded-full text-center font-medium hover:bg-blue-800 transition-colors shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section - Enhanced */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
                About Bit Studio
              </h2>
              <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
                We're a cutting-edge software development company specializing
                in creating innovative digital solutions. Founded on excellence,
                creativity, and forward-thinking, we transform concepts into
                powerful applications that drive real business results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-3">
                    <Target className="text-blue-900 mr-2" size={20} />
                    <h4 className="font-semibold text-blue-900">Our Mission</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Empower businesses with exceptional software solutions that
                    solve real-world problems and drive sustainable growth.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-indigo-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-3">
                    <Lightbulb className="text-indigo-900 mr-2" size={20} />
                    <h4 className="font-semibold text-indigo-900">
                      Our Vision
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Be the leading catalyst for technological innovation and
                    digital transformation across Africa.
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
                {["Innovation", "Quality", "Reliability", "Excellence"].map(
                  (value, index) => (
                    <span
                      key={value}
                      className="bg-white text-blue-900 px-3 sm:px-4 py-2 rounded-full text-sm font-medium border-2 border-blue-200 hover:bg-blue-50 transition-colors cursor-default"
                    >
                      {value}
                    </span>
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
                  className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-4 sm:p-6 rounded-xl text-center hover:from-blue-800 hover:to-blue-600 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white/80 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm opacity-90">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Comprehensive software development solutions tailored to your
              business needs, from concept to deployment and beyond.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Enhanced */}
      <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
              Our Portfolio
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Successful projects delivered across multiple industries and
              countries, showcasing our expertise and commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-blue-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin size={16} className="flex-shrink-0" />
                      {project.location}
                    </div>
                    {project.impact && (
                      <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                        <TrendingUp size={16} className="flex-shrink-0" />
                        {project.impact}
                      </div>
                    )}
                  </div>
                  <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      <section id="team" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Talented developers, designers, and consultants passionate about
              creating exceptional software solutions that make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
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

      {/* Contact Section - Enhanced */}
      <section
        id="contact"
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/3 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Let's Work Together
              </h2>
              <p className="text-blue-100 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Ready to turn your ideas into reality? Get in touch for a free
                consultation and let's discuss how we can help transform your
                business.
              </p>

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
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-all duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {contact.title}
                      </h3>
                      <p className="text-blue-100 text-sm sm:text-base">
                        {contact.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6 sm:mt-8">
                {[
                  { icon: <Github size={20} />, href: "#" },
                  { icon: <Twitter size={20} />, href: "#" },
                  { icon: <Linkedin size={20} />, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
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
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6">
                  Send us a message
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Type
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="text-gray-800">
                        Select a service
                      </option>
                      <option value="web" className="text-gray-800">
                        Web Development
                      </option>
                      <option value="mobile" className="text-gray-800">
                        Mobile App
                      </option>
                      <option value="enterprise" className="text-gray-800">
                        Enterprise Solution
                      </option>
                      <option value="iot" className="text-gray-800">
                        IoT Solution
                      </option>
                      <option value="consulting" className="text-gray-800">
                        Consulting
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-white text-blue-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message <ArrowRight size={20} />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="./logo.png"
                  alt="Logo"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="text-xl font-bold">Bit Studio (Pvt) Ltd</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Crafting exceptional software solutions that drive business
                growth and innovation across Zimbabwe and beyond. Your trusted
                partner in digital transformation.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Github size={20} />, href: "#" },
                  { icon: <Twitter size={20} />, href: "#" },
                  { icon: <Linkedin size={20} />, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                    whileHover={{ scale: 1.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {[
                  "Custom Software",
                  "Mobile Apps",
                  "Web Development",
                  "Enterprise Solutions",
                  "IoT Solutions",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
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

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} Bit Studio Pvt Ltd. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
