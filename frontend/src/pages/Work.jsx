import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ExternalLink, Filter, Grid, List,
  Sparkles, Code, Layers, ArrowRight
} from 'lucide-react';
import { projects, clients } from '../data/siteData';

// ============================================
// WORK HERO
// ============================================
const WorkHero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920')`,
        }}
      />
      {/* Image Overlay - Creates blend effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-[#12121a]/90 to-[#0a0a0f]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/85 via-transparent to-[#0a0a0f]/65" />
      <div className="absolute inset-0 mesh-bg opacity-30" />

      {/* Animated Elements */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(175, 44, 71, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-primary mb-4 md:mb-6 lg:mb-8"
          >
            <Layers size={12} className="text-[#af2c47] md:w-[14px] md:h-[14px]" />
            <span className="text-xs md:text-sm text-white/80">Our Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl text-white mb-4 md:mb-6 lg:mb-8"
          >
            Work that{' '}
            <span className="text-gradient">speaks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            A curated selection of projects that showcase our capabilities, creativity,
            and commitment to excellence. Each project tells a story of transformation.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROJECT FILTERS
// ============================================
const ProjectFilters = ({ activeFilter, setActiveFilter, categories }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3 mb-12"
    >
      <button
        onClick={() => setActiveFilter('all')}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeFilter === 'all'
            ? 'bg-[#af2c47] text-white'
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
        }`}
      >
        All Projects
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === category
              ? 'bg-[#af2c47] text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </motion.div>
  );
};

// ============================================
// PROJECT CARD
// ============================================
const ProjectCard = ({ project, index, featured = false }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className={`group ${featured ? 'md:col-span-2' : ''}`}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-lg overflow-hidden bg-[#12121a] border border-white/5 hover:border-[#af2c47]/30 transition-all duration-500"
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent opacity-80" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[#0a0a0f]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full glass-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <ExternalLink size={24} className="text-white" />
            </div>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#af2c47] text-white text-xs font-medium">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category & Year */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#af2c47] text-sm">{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-white/40 text-sm">{project.year}</span>
          </div>

          {/* Title & Description */}
          <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#af2c47] transition-colors">
            {project.title}
          </h3>
          <p className="text-white/50 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs text-white/40 bg-white/5 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs text-white/40 bg-white/5 rounded">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Color Accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: project.color }}
        />
      </a>
    </motion.div>
  );
};

// ============================================
// PROJECTS GRID
// ============================================
const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const categories = [...new Set(projects.map(p => p.category))];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="section relative overflow-hidden bg-[#0a0a0f]">
      <div className="container-xl">
        {/* Filters */}
        <ProjectFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          categories={categories}
        />

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={project.featured && index === 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.p
          layout
          className="text-center text-white/40 mt-12"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.p>
      </div>
    </section>
  );
};

// ============================================
// PROJECT CASE STUDY SECTION (Featured)
// ============================================
const FeaturedCaseStudy = () => {
  const featured = projects.find(p => p.featured);
  if (!featured) return null;

  return (
    <section className="section relative overflow-hidden bg-[#12121a]">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6"
            >
              <Sparkles size={14} className="text-[#af2c47]" />
              <span className="text-sm text-white/80">Case Study</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-md text-white mb-4"
            >
              {featured.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#af2c47] font-display mb-6"
            >
              {featured.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 mb-8"
            >
              <div>
                <h4 className="text-white font-display font-medium mb-2">The Challenge</h4>
                <p className="text-white/50">{featured.challenge}</p>
              </div>
              <div>
                <h4 className="text-white font-display font-medium mb-2">Our Solution</h4>
                <p className="text-white/50">{featured.solution}</p>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h4 className="text-white font-display font-medium mb-4">Results</h4>
              <div className="grid grid-cols-1 gap-3">
                {featured.results.map((result, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-[#af2c47]" />
                    {result}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Visit Project
              <ExternalLink size={16} />
            </motion.a>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tech Stack Card */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-lg glass-strong max-w-xs">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Built with</p>
              <div className="flex flex-wrap gap-2">
                {featured.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 text-xs text-white/70 bg-white/10 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Glow */}
            <div
              className="absolute -inset-4 rounded-lg -z-10 opacity-30"
              style={{
                background: `radial-gradient(circle at center, ${featured.color}40 0%, transparent 70%)`,
                filter: 'blur(40px)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CLIENTS MARQUEE
// ============================================
const ClientsMarquee = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#0a0a0f] border-y border-white/5">
      <div className="container-xl mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white/40 text-sm uppercase tracking-widest"
        >
          Trusted by leading organizations
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...clients, ...clients].map((client, index) => (
            <a
              key={index}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-8 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
              />
            </a>
          ))}
        </div>

        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CtaSection = () => {
  return (
    <section className="section relative overflow-hidden bg-[#12121a]">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="heading-lg text-white mb-6">
            Have a project in mind?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            We'd love to hear about it. Let's discuss how we can bring your
            vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Start a Project
              <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN WORK PAGE
// ============================================
const Work = () => {
  return (
    <main>
      <WorkHero />
      <ProjectsGrid />
      <FeaturedCaseStudy />
      <ClientsMarquee />
      <CtaSection />
    </main>
  );
};

export default Work;
