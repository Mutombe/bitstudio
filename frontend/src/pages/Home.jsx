import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ArrowRight, Play, Brain, Globe, Smartphone,
  BarChart3, Zap, Shield, Code, Sparkles, Star,
  ExternalLink, Quote, CheckCircle, Cpu, Database, Cloud,
  Users, Award, Target, Lightbulb
} from 'lucide-react';
import { stats, services, projects, clients, testimonials, values, process } from '../data/siteData';

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Intelligence', 'Innovation', 'Excellence', 'Impact'];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')`,
          }}
        />

        {/* Image Overlay - Creates blend effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-[#12121a]/90 to-[#0a0a0f]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/60" />

        {/* Mesh Gradient */}
        <div className="absolute inset-0 mesh-bg opacity-40" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(175, 44, 71, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            y
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(104, 27, 41, 0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="container-xl relative z-10 py-8 md:py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 xl:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-primary mb-4 md:mb-6"
            >
              <Sparkles size={12} className="text-[#af2c47] md:w-[14px] md:h-[14px]" />
              <span className="text-xs md:text-sm text-white/80">AI-Powered Digital Solutions</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-display font-bold text-white mb-4 md:mb-6 leading-tight"
            >
              We Build
              <br />
              Digital{' '}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-gradient"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="absolute -bottom-1 md:-bottom-2 left-0 h-0.5 md:h-1 bg-gradient-to-r from-[#af2c47] to-[#681b29]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-white/60 max-w-xl mb-6 md:mb-8 leading-relaxed"
            >
              We architect digital experiences that transcend conventional boundaries.
              Through AI, elegant design, and engineering excellence, we transform
              visionary ideas into market-defining products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12"
            >
              <Link to="/contact" className="btn-primary">
                Start Your Project
                <ArrowUpRight size={14} className="md:w-4 md:h-4" />
              </Link>
              <Link to="/work" className="btn-secondary">
                View Our Work
                <Play size={12} className="md:w-[14px] md:h-[14px]" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="group p-3 md:p-0">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-[#af2c47] transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-6 xl:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative max-w-md ml-auto"
            >
              {/* Main Card */}
              <div className="relative glass-strong rounded-lg p-5 xl:p-6 overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center gap-2 mb-4 xl:mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#af2c47]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#681b29]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 text-xs text-white/40">ai.engine.tsx</span>
                </div>

                {/* Code Animation */}
                <div className="space-y-4 font-mono text-sm">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-3 p-3 rounded bg-[#af2c47]/10"
                  >
                    <Cpu className="text-[#af2c47]" size={18} />
                    <div>
                      <div className="text-white">Neural Network Active</div>
                      <div className="text-xs text-white/40">Processing 2.4M parameters</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                    className="flex items-center gap-3 p-3 rounded bg-[#af2c47]/10"
                  >
                    <Database className="text-[#af2c47]" size={18} />
                    <div>
                      <div className="text-white">Model Training</div>
                      <div className="text-xs text-white/40">Accuracy: 97.8%</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                    className="flex items-center gap-3 p-3 rounded bg-[#af2c47]/10"
                  >
                    <Cloud className="text-[#af2c47]" size={18} />
                    <div>
                      <div className="text-white">Deployment Ready</div>
                      <div className="text-xs text-white/40">Latency: &lt;50ms</div>
                    </div>
                  </motion.div>
                </div>

                {/* Stats Row */}
                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                  {[
                    { label: 'Uptime', value: '99.9%' },
                    { label: 'Response', value: '<50ms' },
                    { label: 'Scale', value: '∞' }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-3 rounded bg-white/5">
                      <div className="text-lg font-bold text-[#af2c47]">{item.value}</div>
                      <div className="text-xs text-white/40">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#af2c47]/20 to-[#681b29]/20 rounded-lg blur-xl -z-10" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 w-16 h-16 glass-primary rounded-lg flex items-center justify-center"
              >
                <Brain className="text-[#af2c47]" size={28} />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 w-14 h-14 glass-primary rounded-lg flex items-center justify-center"
              >
                <Code className="text-[#af2c47]" size={24} />
              </motion.div>
            </motion.div>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => {
  const iconMap = {
    Brain: Brain,
    Globe: Globe,
    Smartphone: Smartphone,
    BarChart3: BarChart3,
    Zap: Zap,
    Shield: Shield
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-4 md:mb-6"
          >
            Capabilities that{' '}
            <span className="text-gradient">transform</span> businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-lg"
          >
            From AI-powered solutions to stunning digital experiences,
            we deliver end-to-end technology services that drive real business outcomes.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services#${service.id}`}
                  className="block h-full p-5 md:p-6 lg:p-8 rounded-lg bg-[#12121a] border border-white/5 hover:border-[#af2c47]/30 transition-all duration-500 group"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${service.color}20`, color: service.color }}
                  >
                    {IconComponent && <IconComponent size={24} className="md:w-7 md:h-7" />}
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg md:text-xl text-white mb-2 md:mb-3 group-hover:text-[#af2c47] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {service.shortDescription}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4 md:mb-6">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-white/40">
                        <CheckCircle size={12} className="text-[#af2c47] md:w-[14px] md:h-[14px]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-[#af2c47] text-xs md:text-sm font-medium group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FEATURED WORK SECTION
// ============================================
const FeaturedWorkSection = () => {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#12121a]">
      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
          <div className="max-w-2xl mb-6 md:mb-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#af2c47] font-display text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
            >
              Featured Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg text-white"
            >
              Projects that define our{' '}
              <span className="text-gradient">craft</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-white hover:text-[#af2c47] transition-colors font-display text-sm md:text-base"
            >
              View All Projects
              <ArrowRight size={14} className="md:w-4 md:h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-lg overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[#0a0a0f]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                  {/* Category */}
                  <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 rounded-full glass-primary text-[10px] md:text-xs text-[#af2c47] mb-2 md:mb-4">
                    {project.category} &middot; {project.year}
                  </div>

                  <h3 className="font-display font-bold text-lg md:text-xl lg:text-2xl text-white mb-1 md:mb-2 group-hover:text-[#af2c47] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 mb-3 md:mb-4 line-clamp-2 text-sm md:text-base">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs text-white/50 bg-white/5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Link Icon */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ExternalLink size={14} className="text-white md:w-[18px] md:h-[18px]" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROCESS SECTION
// ============================================
const ProcessSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-4 md:mb-6"
          >
            A proven process for{' '}
            <span className="text-gradient">exceptional</span> results
          </motion.h2>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-10 lg:gap-y-12">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-4 md:p-0"
            >
              {/* Step Number */}
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="text-4xl md:text-5xl font-display font-bold text-[#af2c47]/20">
                  0{step.step}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#af2c47]/30 to-transparent" />
              </div>

              <h3 className="font-display font-semibold text-lg md:text-xl text-white mb-2 md:mb-3">
                {step.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CLIENTS SECTION
// ============================================
const ClientsSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#12121a]">
      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
          >
            Trusted By
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-md text-white mb-4 md:mb-6"
          >
            Partnering with industry leaders across{' '}
            <span className="text-gradient">Africa</span>
          </motion.h2>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12"
        >
          {clients.map((client, index) => (
            <motion.a
              key={index}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 p-3 md:p-4 rounded-lg bg-white/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Testimonial */}
        {testimonials[0] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 lg:mt-20 max-w-3xl mx-auto text-center px-4"
          >
            <Quote size={32} className="text-[#af2c47]/30 mx-auto mb-4 md:mb-6 md:w-12 md:h-12" />
            <blockquote className="text-lg md:text-xl lg:text-2xl text-white/80 font-light mb-4 md:mb-6 leading-relaxed">
              "{testimonials[0].quote}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div>
                <p className="text-white font-display font-medium text-sm md:text-base">{testimonials[0].author}</p>
                <p className="text-white/40 text-xs md:text-sm">{testimonials[0].company}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ============================================
// VALUES SECTION
// ============================================
const ValuesSection = () => {
  const iconMap = {
    Lightbulb: Lightbulb,
    Award: Award,
    Target: Target,
    Users: Users
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#af2c47] font-display text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
            >
              Our Values
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg text-white mb-4 md:mb-6"
            >
              The principles that{' '}
              <span className="text-gradient">guide</span> us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-base md:text-lg mb-6 md:mb-8"
            >
              Every decision we make, every line of code we write, is guided by
              these core principles. They're not just words—they're our commitment
              to excellence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/about" className="btn-primary">
                Learn More About Us
                <ArrowRight size={14} className="md:w-4 md:h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right - Values Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 md:p-5 lg:p-6 rounded-lg bg-[#12121a] border border-white/5 hover:border-[#af2c47]/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#af2c47]/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#af2c47]/20 transition-colors">
                    {IconComponent && <IconComponent size={20} className="text-[#af2c47] md:w-6 md:h-6" />}
                  </div>
                  <h3 className="font-display font-semibold text-white mb-1 md:mb-2 text-sm md:text-base">
                    {value.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN HOME PAGE
// ============================================
const Home = () => {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <ProcessSection />
      <ClientsSection />
      <ValuesSection />
    </main>
  );
};

export default Home;
