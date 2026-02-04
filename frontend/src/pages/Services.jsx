import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Brain, Globe, Smartphone, BarChart3,
  Zap, Shield, CheckCircle, Layers, Code, Database, Cloud,
  Cpu, Sparkles, Star
} from 'lucide-react';
import { services, process } from '../data/siteData';

// ============================================
// SERVICES HERO
// ============================================
const ServicesHero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920')`,
        }}
      />
      {/* Image Overlay - Creates blend effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-[#12121a]/90 to-[#0a0a0f]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/85 via-transparent to-[#0a0a0f]/60" />
      <div className="absolute inset-0 mesh-bg opacity-30" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(175, 44, 71, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-primary mb-4 md:mb-6 lg:mb-8"
          >
            <Layers size={12} className="text-[#af2c47] md:w-[14px] md:h-[14px]" />
            <span className="text-xs md:text-sm text-white/80">What We Do</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl text-white mb-4 md:mb-6 lg:mb-8"
          >
            Services that{' '}
            <span className="text-gradient">transform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            From concept to deployment, we provide end-to-end digital solutions
            that drive real business results. Every service is crafted with
            precision, powered by innovation.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICE DETAIL CARD
// ============================================
const ServiceDetail = ({ service, index, isReversed }) => {
  const iconMap = {
    Brain: Brain,
    Globe: Globe,
    Smartphone: Smartphone,
    BarChart3: BarChart3,
    Zap: Zap,
    Shield: Shield
  };
  const IconComponent = iconMap[service.icon];

  return (
    <section
      id={service.id}
      className={`section relative overflow-hidden ${index % 2 === 0 ? 'bg-[#0a0a0f]' : 'bg-[#12121a]'}`}
    >
      <div className="container-xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isReversed ? 'lg:col-start-2' : ''}
          >
            {/* Service Number */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl font-display font-bold text-[#af2c47]/20">
                0{index + 1}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#af2c47]/30 to-transparent" />
            </div>

            {/* Icon & Title */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ background: `${service.color}20`, color: service.color }}
              >
                {IconComponent && <IconComponent size={32} />}
              </div>
              <h2 className="heading-md text-white">{service.title}</h2>
            </div>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              {service.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {service.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={16} className="text-[#af2c47] flex-shrink-0" />
                  <span className="text-white/70 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <p className="text-white/40 text-sm mb-3">Technologies:</p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm text-white/50 bg-white/5 rounded border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#af2c47] font-display font-medium hover:gap-3 transition-all"
            >
              Discuss This Service
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 p-6 rounded-lg glass-strong max-w-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Star className="text-[#af2c47]" size={20} />
                  <span className="text-white font-display font-medium">Excellence Delivered</span>
                </div>
                <p className="text-white/50 text-sm">
                  Every project meets our rigorous quality standards
                </p>
              </motion.div>

              {/* Glow Effect */}
              <div
                className="absolute -inset-4 rounded-lg -z-10 opacity-30"
                style={{
                  background: `radial-gradient(circle at center, ${service.color}30 0%, transparent 70%)`,
                  filter: 'blur(40px)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICES OVERVIEW GRID
// ============================================
const ServicesOverview = () => {
  const iconMap = {
    Brain: Brain,
    Globe: Globe,
    Smartphone: Smartphone,
    BarChart3: BarChart3,
    Zap: Zap,
    Shield: Shield
  };

  return (
    <section className="section relative overflow-hidden bg-[#12121a]">
      <div className="container-xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-sm uppercase tracking-widest mb-4"
          >
            Overview
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            Full-spectrum{' '}
            <span className="text-gradient">capabilities</span>
          </motion.h2>
        </div>

        {/* Quick Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.a
                key={service.id}
                href={`#${service.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-lg bg-[#0a0a0f] border border-white/5 hover:border-[#af2c47]/30 transition-all duration-300 text-center group"
              >
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: `${service.color}15`, color: service.color }}
                >
                  {IconComponent && <IconComponent size={24} />}
                </div>
                <h3 className="font-display font-medium text-white text-sm group-hover:text-[#af2c47] transition-colors">
                  {service.title.split(' ')[0]}
                </h3>
              </motion.a>
            );
          })}
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
    <section className="section relative overflow-hidden bg-[#0a0a0f]">
      <div className="container-xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-sm uppercase tracking-widest mb-4"
          >
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            How we bring{' '}
            <span className="text-gradient">ideas to life</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg"
          >
            A proven methodology refined over hundreds of successful projects.
            Transparent, collaborative, and results-driven.
          </motion.p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#af2c47]/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#12121a] border-2 border-[#af2c47]/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-display font-bold text-[#af2c47]">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHY CHOOSE US
// ============================================
const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Brain size={28} />,
      title: "AI-First Approach",
      description: "Every solution we build leverages the latest in artificial intelligence to deliver smarter, more efficient results."
    },
    {
      icon: <Code size={28} />,
      title: "Engineering Excellence",
      description: "Clean, scalable code that's built to last. We don't just ship—we architect for the future."
    },
    {
      icon: <Sparkles size={28} />,
      title: "Design Obsession",
      description: "We believe beautiful design and powerful functionality can coexist. Every pixel matters."
    },
    {
      icon: <Cloud size={28} />,
      title: "Cloud Native",
      description: "Modern infrastructure that scales effortlessly. Your applications grow with your business."
    }
  ];

  return (
    <section className="section relative overflow-hidden bg-[#12121a]">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#af2c47] font-display text-sm uppercase tracking-widest mb-4"
            >
              Why Bit Studio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg text-white mb-6"
            >
              What makes us{' '}
              <span className="text-gradient">different</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg mb-8"
            >
              We're not just another agency. We're technologists who are deeply
              invested in your success. Here's what sets us apart.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/contact" className="btn-primary">
                Work With Us
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-[#0a0a0f] border border-white/5 hover:border-[#af2c47]/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#af2c47]/10 flex items-center justify-center mb-4 text-[#af2c47] group-hover:bg-[#af2c47]/20 transition-colors">
                  {reason.icon}
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CtaSection = () => {
  return (
    <section className="section relative overflow-hidden bg-[#0a0a0f]">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 lg:p-20 rounded-lg overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#af2c47]/20 via-[#681b29]/10 to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(175, 44, 71, 0.15) 0%, transparent 50%)`
          }} />

          <div className="relative z-10 max-w-2xl">
            <h2 className="heading-lg text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Let's discuss your project and explore how our services can drive
              your business forward.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Start a Project
                <ArrowRight size={16} />
              </Link>
              <Link to="/work" className="btn-secondary">
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN SERVICES PAGE
// ============================================
const Services = () => {
  const location = useLocation();

  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main>
      <ServicesHero />
      <ServicesOverview />
      {services.map((service, index) => (
        <ServiceDetail
          key={service.id}
          service={service}
          index={index}
          isReversed={index % 2 !== 0}
        />
      ))}
      <ProcessSection />
      <WhyChooseUs />
      <CtaSection />
    </main>
  );
};

export default Services;
