import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ExternalLink, ArrowRight, Brain, BarChart3,
  Sparkles, Layers, CheckCircle, Rocket
} from 'lucide-react';
import { projects, products, clients } from '../data/siteData';

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
      className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12"
    >
      <button
        onClick={() => setActiveFilter('all')}
        className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
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
          className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
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
// PROJECT CARD (Logo-based)
// ============================================
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 md:p-6 rounded-lg bg-[#12121a] border border-white/5 hover:border-[#af2c47]/30 transition-all duration-500 h-full relative overflow-hidden"
      >
        {/* Top Row: Logo + Meta */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
          >
            {project.logo ? (
              <img src={project.logo} alt={project.title} className="w-8 h-8 md:w-9 md:h-9 object-contain" />
            ) : (
              <span className="text-lg md:text-xl font-display font-bold" style={{ color: project.color }}>
                {project.title.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-white text-base md:text-lg group-hover:text-[#af2c47] transition-colors leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[#af2c47]">{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-xs text-white/40">{project.year}</span>
            </div>
          </div>
          {project.featured && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[#af2c47]/10 text-[#af2c47] border border-[#af2c47]/20 flex-shrink-0">
              Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="px-2 py-0.5 text-[10px] md:text-xs text-white/40 bg-white/5 rounded">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] md:text-xs text-white/30 bg-white/5 rounded">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-xs text-white/30">{project.subtitle}</span>
          <div className="flex items-center gap-1.5 text-[#af2c47] text-xs font-medium group-hover:gap-2.5 transition-all">
            Visit
            <ExternalLink size={11} />
          </div>
        </div>

        {/* Color Accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
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
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#0a0a0f]">
      <div className="container-xl">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#af2c47] font-display text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
        >
          Client Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="heading-md text-white mb-8 md:mb-10"
        >
          Solutions we've built for{' '}
          <span className="text-gradient">clients</span>
        </motion.h2>

        {/* Filters */}
        <ProjectFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          categories={categories}
        />

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.p
          layout
          className="text-center text-white/40 text-sm mt-8 md:mt-12"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.p>
      </div>
    </section>
  );
};

// ============================================
// OUR PRODUCTS SECTION
// ============================================
const ProductsShowcase = () => {
  const iconMap = {
    Brain: Brain,
    BarChart3: BarChart3
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#12121a]">
      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-primary mb-4 md:mb-6"
          >
            <Rocket size={12} className="text-[#af2c47] md:w-[14px] md:h-[14px]" />
            <span className="text-xs md:text-sm text-white/80">Our Products</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-4 md:mb-6"
          >
            Products we{' '}
            <span className="text-gradient">built & own</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-lg"
          >
            Beyond client work, we build our own products that solve real problems
            and push the boundaries of what's possible.
          </motion.p>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {products.map((product, index) => {
            const IconComponent = iconMap[product.icon];
            return (
              <motion.a
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group block p-6 md:p-8 rounded-lg bg-[#0a0a0f] border border-white/5 hover:border-[#af2c47]/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${product.color}15 0%, transparent 70%)`,
                    filter: 'blur(40px)'
                  }}
                />

                <div className="relative z-10">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center overflow-hidden"
                        style={{ background: `${product.color}15`, border: `1px solid ${product.color}25` }}
                      >
                        {product.logo ? (
                          <img src={product.logo} alt={product.title} className="w-9 h-9 md:w-10 md:h-10 object-contain" />
                        ) : (
                          IconComponent && <IconComponent size={28} style={{ color: product.color }} className="md:w-8 md:h-8" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl md:text-2xl text-white group-hover:text-[#af2c47] transition-colors">
                          {product.title}
                        </h3>
                        <p style={{ color: product.color }} className="text-sm font-medium">
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] md:text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                      {product.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {product.features.slice(0, 6).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle size={12} className="text-[#af2c47] flex-shrink-0" />
                        <span className="text-xs text-white/40">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {product.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] text-white/35 bg-white/5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#af2c47] text-sm font-medium group-hover:gap-2.5 transition-all">
                      Explore
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FEATURED CASE STUDY
// ============================================
const FeaturedCaseStudy = () => {
  const featured = projects.find(p => p.featured);
  if (!featured) return null;

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#0a0a0f]">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-4 mb-6"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ background: `${featured.color}15`, border: `1px solid ${featured.color}30` }}
              >
                {featured.logo ? (
                  <img src={featured.logo} alt={featured.title} className="w-10 h-10 object-contain" />
                ) : (
                  <span className="text-2xl font-display font-bold" style={{ color: featured.color }}>
                    {featured.title.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="heading-md text-white">{featured.title}</h2>
                <p className="text-[#af2c47] font-display text-sm">{featured.subtitle}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-8"
            >
              <div>
                <h4 className="text-white font-display font-medium mb-2">The Challenge</h4>
                <p className="text-white/50 text-sm md:text-base">{featured.challenge}</p>
              </div>
              <div>
                <h4 className="text-white font-display font-medium mb-2">Our Solution</h4>
                <p className="text-white/50 text-sm md:text-base">{featured.solution}</p>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h4 className="text-white font-display font-medium mb-4">Results</h4>
              <div className="grid grid-cols-1 gap-3">
                {featured.results.map((result, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
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
              transition={{ delay: 0.4 }}
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Visit Project
              <ExternalLink size={16} />
            </motion.a>
          </div>

          {/* Visual - Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-6 md:p-8 rounded-lg glass-strong">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#af2c47]" />
                <div className="w-3 h-3 rounded-full bg-[#681b29]" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <span className="ml-2 text-xs text-white/40">project-details.tsx</span>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <span className="text-sm text-[#af2c47] font-medium">{featured.category}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-sm text-white/40">{featured.year}</span>
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm mb-6 leading-relaxed">{featured.description}</p>

              {/* Tech Stack */}
              <div className="mb-6">
                <p className="text-white/30 text-xs uppercase tracking-wider mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {featured.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm text-white/60 bg-white/5 rounded-lg border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results Summary */}
              <div>
                <p className="text-white/30 text-xs uppercase tracking-wider mb-3">Key Metrics</p>
                <div className="grid grid-cols-3 gap-3">
                  {featured.results.map((result, i) => (
                    <div key={i} className="text-center p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-white/50 leading-snug">{result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glow */}
            <div
              className="absolute -inset-4 rounded-lg -z-10 opacity-20"
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
    <section className="py-16 md:py-20 relative overflow-hidden bg-[#12121a] border-y border-white/5">
      <div className="container-xl mb-10 md:mb-12">
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
              className="flex-shrink-0 mx-6 md:mx-8 w-24 h-16 md:w-32 md:h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
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
        <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-[#12121a] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-[#12121a] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CtaSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#0a0a0f]">
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
          <p className="text-white/60 text-base md:text-lg mb-8">
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
      <ProductsShowcase />
      <FeaturedCaseStudy />
      <ClientsMarquee />
      <CtaSection />
    </main>
  );
};

export default Work;
