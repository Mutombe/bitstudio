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
} from "lucide-react";

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { icon: <Code size={32} />, number: "50+", label: "Projects Delivered" },
    { icon: <Users size={32} />, number: "25+", label: "Happy Clients" },
    { icon: <Award size={32} />, number: "3+", label: "Years Experience" },
    { icon: <Zap size={32} />, number: "100%", label: "Success Rate" },
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
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section
      id="home"
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
    >
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-400 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-indigo-200 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-1/3 right-10 w-6 h-6 bg-blue-300 rounded-full opacity-25 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                Innovative Software
                <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                  Solutions
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8">
                Transforming concepts into powerful, user-friendly applications
                that drive business growth across Zimbabwe and beyond.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a
                href="#contact"
                className="group bg-blue-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Project
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#portfolio"
                className="group bg-white text-blue-900 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-blue-900 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Our Work
                <Play
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
            </div>

            {/* Animated Stats */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto lg:mx-0 border border-gray-100">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="text-blue-900 p-2 bg-blue-50 rounded-lg">
                    {stats[currentStat].icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-900">
                      {stats[currentStat].number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stats[currentStat].label}
                    </div>
                  </div>
                </div>
                {/* Progress indicator */}
                <div className="flex justify-center lg:justify-start mt-4 space-x-2">
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
          </div>

          {/* Right Column - Code Block */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="bg-white rounded-xl shadow-2xl p-6 relative z-10 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">Bitstudio.jsx</span>
                </div>
                <pre className="text-sm text-gray-800 overflow-x-auto leading-relaxed">
                  <code className="font-mono">
                    {`function Bitstustudio() {
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
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl -z-10 opacity-90"></div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Technology Stack
              </h3>
              <p className="text-gray-600 text-sm">
                Building with cutting-edge technologies for optimal performance
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:scale-105 transition-transform duration-200 cursor-default"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.5s ease-out both",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStat, setCurrentStat] = useState(0);

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

  // Animated stats rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
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
    setIsOpen(!isOpen);
  };

  const handleContactSubmit = () => {
    toast.success("Message sent! We'll be in touch within 24 hours.");
  };

  const technologies = [
    "Python",
    "JavaScript",
    "PHP",
    "Java",
    "React",
    "Django",
    "Node.js",
    "MongoDB",
  ];

  const services = [
    {
      icon: <Code size={24} />,
      title: "Custom Software",
      description: "Tailored applications for your specific business needs",
      features: [
        "Enterprise Solutions",
        "API Development",
        "System Integration",
      ],
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Apps",
      description: "Native & cross-platform iOS/Android applications",
      features: ["React Native", "Flutter", "Native iOS/Android"],
    },
    {
      icon: <Globe size={24} />,
      title: "Web Development",
      description: "Responsive, scalable websites and web applications",
      features: ["React/Vue.js", "Progressive Web Apps", "E-commerce"],
    },
    {
      icon: <Database size={24} />,
      title: "Enterprise Solutions",
      description: "Complex ERP and business management systems",
      features: ["ERP Systems", "CRM Solutions", "Business Intelligence"],
    },
    {
      icon: <Wifi size={24} />,
      title: "IoT Solutions",
      description: "Smart device integration and embedded systems",
      features: ["Hardware Integration", "Sensor Networks", "Smart Devices"],
    },
    {
      icon: <Settings size={24} />,
      title: "UI/UX Design",
      description: "Intuitive interfaces that prioritize user experience",
      features: ["User Research", "Prototyping", "Design Systems"],
    },
  ];

  const projects = [
    {
      title: "CGI Trading Platform",
      location: "Zimbabwe",
      category: "FinTech",
      description: "Advanced trading platform with real-time market data",
      tech: ["Python", "Django", "React", "PostgreSQL"],
    },
    {
      title: "Auto Eden Marketplace",
      location: "Zimbabwe",
      category: "E-commerce",
      description: "Vehicle marketplace with advanced search and filtering",
      tech: ["React", "Node.js", "MongoDB", "Redis"],
    },
    {
      title: "Deutsche Aircraft Simulation",
      location: "Germany",
      category: "Aviation",
      description: "Flight simulation scripts for training purposes",
      tech: ["Python", "C++", "OpenGL", "Real-time Systems"],
    },
    {
      title: "Africa International RECs",
      location: "Multi-country",
      category: "Energy",
      description: "Regional energy certificate trading platform",
      tech: ["Django", "React", "PostgreSQL", "Docker"],
    },
  ];

  const team = [
    {
      name: "Simbarashe Mutombe",
      role: "Software Engineer",
      expertise: "Full-Stack Development",
      image: "/icon.png",
    },
    {
      name: "Newlife Marangwanda",
      role: "Lead Engineer",
      expertise: "System Architecture",
      image: "/icon.png",
    },
    {
      name: "James Wilson",
      role: "DevOps Engineer",
      expertise: "Cloud Infrastructure",
      image: "/icon.png",
    },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">
      <Toaster position="top-right" />

      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="/logo2.png" alt="Logo" className="w-10 h-10" />
              </div>
              <span className="text-xl font-bold text-blue-900">
                Bit Studio
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
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
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item
                      ? "text-blue-900 border-b-2 border-blue-900 pb-1"
                      : "text-gray-600 hover:text-blue-900"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
              <motion.a
                href="#contact"
                className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-all duration-300 hover:scale-105"
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
                className="text-gray-700 hover:text-blue-900 focus:outline-none p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
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
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeSection === item
                        ? "text-blue-900 bg-blue-50"
                        : "text-gray-600 hover:text-blue-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block mx-3 mt-4 bg-blue-900 text-white px-4 py-2 rounded-full text-center font-medium"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                About Bit Studio
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                We're a cutting-edge software development company specializing
                in creating innovative digital solutions. Founded on excellence,
                creativity, and forward-thinking, we transform concepts into
                powerful applications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Our Mission
                  </h4>
                  <p className="text-sm text-gray-600">
                    Empower businesses with exceptional software solutions that
                    solve real-world problems.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Our Vision
                  </h4>
                  <p className="text-sm text-gray-600">
                    Be a leading force in software development and technological
                    innovation catalyst.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 rounded-xl text-center"
                >
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive software development solutions tailored to your
              business needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-900">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Successful projects delivered across multiple industries and
              countries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      {project.location}
                    </div>
                  </div>
                  <span className="bg-blue-900 text-white text-xs px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
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

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Talented developers, designers, and consultants passionate about
              exceptional software solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-24 h-24 bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's Work Together
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Ready to turn your ideas into reality? Get in touch for a free
                consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-800 rounded-full p-3">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-blue-100">+263 78 594 8128</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-800 rounded-full p-3">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-blue-100">admin@bitstudio.co.zw</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-800 rounded-full p-3">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Website</h3>
                    <p className="text-blue-100">www.bitstudio.co.zw</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">
                  Send us a message
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Type
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option value="">Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="enterprise">Enterprise Solution</option>
                      <option value="iot">IoT Solution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleContactSubmit}
                    className="w-full bg-white text-blue-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Send Message <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-xl font-bold">Bit Studio (Pvt) Ltd</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Crafting exceptional software solutions that drive business
                growth and innovation across Zimbabwe and beyond.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Custom Software
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Enterprise Solutions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+263 78 594 8128</li>
                <li>admin@bitstudio.co.zw</li>
                <li>www.bitstudio.co.zw</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Bit Studio Pvt Ltd. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
