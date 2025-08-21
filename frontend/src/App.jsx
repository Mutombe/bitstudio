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
  CreditCard,
  MessageCircle,
  Brain,
  Workflow,
  Bot,
  UserCheck,
  Search,
  Send,
  BarChart3,
  Sparkles,
  Eye,
  Video,
  Image,
  Mic,
  Calendar,
  Clock,
  Server,
  Lock,
  RefreshCw,
  PieChart,
  ArrowUpRight,
  CloudLightning,
  CpuIcon,
  Network,
  Bell,
  ShieldCheck,
  ZapIcon,
  BotIcon,
  MessageSquareText,
  UserCog,
  GlobeLock,
  HeartHandshake,
  BarChart,
  TargetIcon,
  UsersRound,
  ScanSearch,
  MailCheck,
  BrainCircuit,
  Cog,
  GitBranch,
  HeartPulse,
  BookOpen,
  Palette,
  PhoneCall,
  MessageCircleMore,
  BrainCog,
  BotMessageSquare,
  UserCircle2,
  ScanLine,
  RocketIcon,
  StarIcon,
  ChevronsRight,
  ChevronsLeft,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Move3d,
  Atom,
  Cable,
  Cctv,
  Component,
  CpuIcon as CpuIcon2,
  DatabaseBackup,
  Ear,
  Fingerprint,
  Gauge,
  HardDrive,
  KeyRound,
  NetworkIcon,
  QrCode,
  Radar,
  Satellite,
  ScanBarcode,
  ScanEye,
  ServerCrash,
  ShieldOff,
  SmartphoneNfc,
  Speaker,
  Telescope,
  Touchpad,
  Vibrate,
  VideoIcon,
  WifiOff,
  WorkflowIcon,
} from "lucide-react";

// New animated components
const FloatingShapes = () => {
  const shapes = [
    { icon: <Circle className="text-blue-200/40" size={20} />, delay: 0 },
    { icon: <Square className="text-indigo-300/40" size={18} />, delay: 0.5 },
    { icon: <Triangle className="text-purple-300/40" size={22} />, delay: 1 },
    { icon: <Hexagon className="text-blue-300/40" size={16} />, delay: 1.5 },
    { icon: <Octagon className="text-indigo-200/40" size={24} />, delay: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${20 + index * 15}%`,
            left: `${10 + index * 5}%`,
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [0, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            delay: shape.delay,
          }}
        >
          {shape.icon}
        </motion.div>
      ))}
      {shapes.map((shape, index) => (
        <motion.div
          key={index + shapes.length}
          className="absolute"
          style={{
            top: `${30 + index * 10}%`,
            right: `${5 + index * 8}%`,
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            delay: shape.delay + 1,
          }}
        >
          {shape.icon}
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

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
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % stats.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [stats.length, isPlaying]);

  return (
    <section
      id="home"
      className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
    >
      <AnimatedBackground />
      <FloatingShapes />

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
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Innovative Software
                <motion.span 
                  className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Solutions & AI
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Transforming concepts into powerful, user-friendly applications
                that drive business growth across Zimbabwe and beyond with cutting-edge AI automation.
              </motion.p>
            </div>

            {/* CTA Buttons - Enhanced Mobile */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
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
            </motion.div>

            {/* Animated Stats - Mobile Optimized */}
            <motion.div 
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
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
                {/* Progress indicator with play/pause */}
                <div className="flex justify-between items-center mt-3 sm:mt-4">
                  <div className="flex space-x-2">
                    {stats.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStat ? "bg-blue-900" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-gray-400 hover:text-blue-900 transition-colors"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Illustration */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 relative z-10 border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex space-x-2">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">AI_Automation.jsx</span>
                </div>
                
                {/* Animated code block */}
                <div className="relative">
                  <pre className="text-xs sm:text-sm text-gray-800 overflow-x-auto leading-relaxed">
                    <code className="font-mono">
{`function AIAutomation() {
  return (
    <div className="ai-agents">
      {agents.map(agent => (
        <IntelligentAgent 
          key={agent.id}
          type={agent.type}
          capabilities={agent.capabilities}
          impact={agent.impact}
        />
      ))}
    </div>
  );
}`}
                    </code>
                  </pre>
                  
                  {/* Animated elements around the code */}
                  <motion.div 
                    className="absolute -top-2 -right-2 text-blue-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Atom size={16} />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-2 -left-2 text-purple-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles size={14} />
                  </motion.div>
                </div>
                
                {/* Animated progress bar */}
                <motion.div 
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </div>
              
              {/* Floating elements around the card */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Bot size={16} className="text-blue-500" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <Brain size={16} className="text-purple-500" />
              </motion.div>
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
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-5xl mx-auto border border-gray-100 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full"></div>
            <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-indigo-500/5 rounded-full"></div>
            
            <div className="text-center mb-4 sm:mb-6 relative z-10">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Our Technology Stack
              </h3>
              <p className="text-gray-600 text-sm">
                Building with cutting-edge technologies for optimal performance
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 relative z-10">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-blue-200 hover:scale-105 transition-transform duration-200 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
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
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background element */}
      <motion.div 
        className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: `conic-gradient(from 180deg, ${service.color}, transparent)` }}
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10">
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
        
        {service.link && (
          <motion.a
            href={service.link}
            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium group-hover:underline"
            whileHover={{ x: 5 }}
          >
            Learn more <ArrowRight size={14} className="ml-1" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const AIAgentCard = ({ agent, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(circle at 70% 20%, ${agent.color} 0%, transparent 50%)`
        }}
        animate={{ 
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-3 text-blue-900 group-hover:scale-110 transition-transform duration-300">
            {agent.icon}
          </div>
          <motion.div
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </motion.div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {agent.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {agent.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Capabilities:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((capability, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <motion.a
            href={agent.link}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group-hover:underline"
            whileHover={{ x: 5 }}
          >
            See case study <ArrowRight size={14} className="ml-1" />
          </motion.a>
          
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-blue-100 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background element */}
      <motion.div 
        className="absolute -right-10 -top-10 w-28 h-28 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `conic-gradient(from 180deg, #3b82f6, transparent)` }}
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
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

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
      
      {project.link && (
        <motion.a
          href={project.link}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium group-hover:underline"
          whileHover={{ x: 5 }}
        >
          View project <ExternalLink size={14} className="ml-1" />
        </motion.a>
      )}
    </motion.div>
  );
};

const MediaElement = ({ type, src, alt, className = "" }) => {
  if (type === "image") {
    return (
      <motion.div 
        className={`overflow-hidden rounded-xl ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  }
  
  if (type === "video") {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    );
  }
  
  return null;
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
        "ai-agents",
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

  // Updated services with new additions
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
      color: "#3B82F6",
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
      color: "#8B5CF6",
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
      color: "#06B6D4",
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
      color: "#10B981",
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
      color: "#F59E0B",
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
      color: "#EC4899",
    },
    {
      icon: <CreditCard size={24} />,
      title: "Payment Integration",
      description:
        "Secure and seamless payment gateway integrations for your e-commerce and business applications.",
      features: [
        "Multiple Payment Methods",
        "Secure Transactions",
        "Recurring Billing",
        "Global Currencies",
      ],
      color: "#EF4444",
      link: "#payment-integration",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Chatbot Integration",
      description:
        "Intelligent chatbot solutions that enhance customer engagement and support operations.",
      features: [
        "AI-Powered Bots",
        "24/7 Support",
        "Multi-language",
        "CRM Integration",
      ],
      color: "#6366F1",
      link: "#chatbot-integration",
    },
  ];

  // AI Automation Agents
  const aiAgents = [
    {
      icon: <MessageSquareText size={24} />,
      title: "Advanced Customer Support Agents",
      description:
        "AI-powered support agents that provide instant, accurate responses to customer inquiries 24/7, reducing response times and improving satisfaction.",
      capabilities: [
        "Natural Language Processing",
        "Multi-channel Support",
        "Sentiment Analysis",
        "Escalation to Human Agents"
      ],
      color: "#3B82F6",
      link: "#customer-support-agents",
    },
    {
      icon: <UserCheck size={24} />,
      title: "Proactive Onboarding Agents",
      description:
        "Intelligent onboarding assistants that guide new users through your platform, increasing activation rates and reducing churn.",
      capabilities: [
        "Personalized Guidance",
        "Progress Tracking",
        "Automated Follow-ups",
        "Feedback Collection"
      ],
      color: "#8B5CF6",
      link: "#onboarding-agents",
    },
    {
      icon: <Globe size={24} />,
      title: "Omnichannel Service Agents",
      description:
        "Seamless customer service across all channels (web, mobile, social media) with consistent, contextualized interactions.",
      capabilities: [
        "Channel Integration",
        "Context Preservation",
        "Unified Customer View",
        "Cross-channel Analytics"
      ],
      color: "#06B6D4",
      link: "#omnichannel-agents",
    },
    {
      icon: <Search size={24} />,
      title: "Autonomous Market Research Agent",
      description:
        "AI agents that continuously monitor market trends, competitor activities, and customer sentiment to provide actionable insights.",
      capabilities: [
        "Data Aggregation",
        "Trend Analysis",
        "Competitor Monitoring",
        "Sentiment Analysis"
      ],
      color: "#10B981",
      link: "#market-research-agent",
    },
    {
      icon: <Send size={24} />,
      title: "Personalized Outreach Agent",
      description:
        "Intelligent outreach systems that personalize communications at scale based on user behavior and preferences.",
      capabilities: [
        "Behavioral Targeting",
        "Personalized Content",
        "A/B Testing",
        "Performance Analytics"
      ],
      color: "#F59E0B",
      link: "#outreach-agent",
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "Workflow Automation Agents",
      description:
        "AI agents that automate complex business processes, reducing manual effort and improving operational efficiency.",
      capabilities: [
        "Process Mapping",
        "Task Automation",
        "Exception Handling",
        "Integration with Existing Systems"
      ],
      color: "#EC4899",
      link: "#workflow-automation",
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
      link: "https://example.com/cgi-trading",
    },
    {
      title: "Auto Eden Marketplace",
      location: "Zimbabwe",
      category: "E-commerce",
      description:
        "Comprehensive vehicle marketplace with advanced search, filtering, and dealer management system.",
      tech: ["React", "Node.js", "MongoDB", "Redis", "Stripe"],
      impact: "50,000+ active users",
      link: "https://example.com/auto-eden",
    },
    {
      title: "Deutsche Aircraft Simulation",
      location: "Germany",
      category: "Aviation",
      description:
        "Flight simulation scripts and training modules for pilot education and aircraft testing.",
      tech: ["Python", "C++", "OpenGL", "Real-time Systems"],
      impact: "Enhanced pilot training efficiency",
      link: "https://example.com/deutsche-aircraft",
    },
    {
      title: "Africa International RECs",
      location: "Multi-country",
      category: "Energy",
      description:
        "Regional energy certificate trading platform facilitating renewable energy credit transactions.",
      tech: ["Django", "React", "PostgreSQL", "Docker", "AWS"],
      impact: "Sustainable energy adoption",
      link: "https://example.com/africa-recs",
    },
    {
      title: "Payment Gateway Integration",
      location: "South Africa",
      category: "FinTech",
      description:
        "Seamless payment processing system with multiple payment methods and currency support.",
      tech: ["Node.js", "React", "MongoDB", "Stripe API", "PayPal API"],
      impact: "99.9% uptime, 40% faster checkout",
      link: "https://example.com/payment-gateway",
    },
    {
      title: "AI Customer Support Chatbot",
      location: "Kenya",
      category: "AI",
      description:
        "Intelligent chatbot handling customer inquiries with natural language processing and sentiment analysis.",
      tech: ["Python", "TensorFlow", "React", "WebSockets", "NLP"],
      impact: "65% reduction in support tickets",
      link: "https://example.com/ai-chatbot",
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
    {
      name: "Sarah Johnson",
      role: "AI Specialist",
      expertise: "Machine Learning & Natural Language Processing",
      description:
        "Develops intelligent AI solutions and automation systems.",
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
                "ai-agents",
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
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
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
                  "ai-agents",
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
                    {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
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
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
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
                    <motion.span
                      key={value}
                      className="bg-white text-blue-900 px-3 sm:px-4 py-2 rounded-full text-sm font-medium border-2 border-blue-200 hover:bg-blue-50 transition-colors cursor-default"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
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
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-4 sm:p-6 rounded-xl text-center hover:from-blue-800 hover:to-blue-600 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gray-50 relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Comprehensive software development solutions tailored to your
              business needs, from concept to deployment and beyond.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Automation Agents Section */}
      <section id="ai-agents" className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="inline-flex items-center bg-blue-50 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain className="mr-2" size={16} />
              AI-Powered Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
              Workflow AI Automation Agents
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Intelligent automation solutions that transform business processes, enhance customer experiences, and drive growth through AI-powered agents.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {aiAgents.map((agent, index) => (
              <AIAgentCard key={index} agent={agent} index={index} />
            ))}
          </div>

          {/* Additional Media Section */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">See Our AI Agents in Action</h3>
                  <p className="text-blue-100 mb-6">
                    Watch how our AI automation agents can transform your business processes, reduce costs, and improve customer experiences.
                  </p>
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Request Demo
                    <ArrowRight size={20} className="ml-2" />
                  </motion.a>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <motion.div 
                      className="w-64 h-64 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      <Bot size={48} className="text-white" />
                    </motion.div>
                    <motion.div 
                      className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play size={16} className="text-white fill-current" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section - Enhanced */}
      <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-gray-50 relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
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
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* Media Gallery */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-8">
              Project Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MediaElement
                type="image"
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Web Development Project"
                className="h-48"
              />
              <MediaElement
                type="image"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Mobile App Project"
                className="h-48"
              />
              <MediaElement
                type="image"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Data Analytics Project"
                className="h-48"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      <section id="team" className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Talented developers, designers, and consultants passionate about
              creating exceptional software solutions that make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
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
              viewport={{ once: true, margin: "-50px" }}
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
              viewport={{ once: true, margin: "-50px" }}
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
                      <option value="ai" className="text-gray-800">
                        AI Automation
                      </option>
                      <option value="payment" className="text-gray-800">
                        Payment Integration
                      </option>
                      <option value="chatbot" className="text-gray-800">
                        Chatbot Integration
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
                  "AI Automation",
                  "Payment Integration",
                  "Chatbot Integration",
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