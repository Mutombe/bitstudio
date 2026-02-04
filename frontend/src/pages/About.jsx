import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, Award, Target, Lightbulb, Globe, Rocket,
  Brain, Code, Heart, Sparkles, CheckCircle, Github, Linkedin,
  MapPin, Calendar
} from 'lucide-react';
import { companyInfo, stats, team, values, technologies } from '../data/siteData';

// ============================================
// ABOUT HERO
// ============================================
const AboutHero = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920')`,
        }}
      />
      {/* Image Overlay - Creates blend effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-[#12121a]/90 to-[#0a0a0f]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/90 via-transparent to-[#0a0a0f]/70" />
      <div className="absolute inset-0 mesh-bg opacity-30" />

      {/* Animated Background */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(175, 44, 71, 0.2) 0%, transparent 70%)',
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
            <Heart size={12} className="text-[#af2c47] md:w-[14px] md:h-[14px]" />
            <span className="text-xs md:text-sm text-white/80">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl text-white mb-4 md:mb-6 lg:mb-8"
          >
            We're building the{' '}
            <span className="text-gradient">future</span> of digital
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            {companyInfo.description}
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left p-3 md:p-0">
              <div className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-1 md:mb-2">
                {stat.number}
              </div>
              <div className="text-white/40 text-xs md:text-sm">{stat.label}</div>
              <div className="text-xs md:text-sm text-white/30 hidden md:block">{stat.description}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MISSION & VISION
// ============================================
const MissionVision = () => {
  return (
    <section className="section relative overflow-hidden bg-[#12121a]">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 lg:p-12 rounded-lg border border-white/5"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#af2c47] to-transparent rounded-full" />
            <div className="w-16 h-16 rounded-lg bg-[#af2c47]/10 flex items-center justify-center mb-6">
              <Target className="text-[#af2c47]" size={32} />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">Our Mission</h3>
            <p className="text-white/60 text-lg leading-relaxed">
              To democratize AI technology and empower African businesses with intelligent
              solutions that drive growth, efficiency, and innovation. We believe every
              business deserves access to world-class technology.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 lg:p-12 rounded-lg border border-white/5"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#681b29] to-transparent rounded-full" />
            <div className="w-16 h-16 rounded-lg bg-[#681b29]/20 flex items-center justify-center mb-6">
              <Rocket className="text-[#d64d68]" size={32} />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">Our Vision</h3>
            <p className="text-white/60 text-lg leading-relaxed">
              To be Africa's leading catalyst for digital transformation, setting new
              standards for what technology can achieve across the continent. We envision
              a future where African innovation leads the world.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// VALUES SECTION
// ============================================
const ValuesGrid = () => {
  const iconMap = {
    Lightbulb: Lightbulb,
    Award: Award,
    Target: Target,
    Users: Users
  };

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="container-xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-sm uppercase tracking-widest mb-4"
          >
            What Drives Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            Values that define our{' '}
            <span className="text-gradient">culture</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-lg bg-[#12121a] border border-white/5 hover:border-[#af2c47]/20 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-full bg-[#af2c47]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#af2c47]/20 group-hover:scale-110 transition-all duration-300">
                  {IconComponent && <IconComponent size={28} className="text-[#af2c47]" />}
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TEAM SECTION
// ============================================
const TeamSection = () => {
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
            The Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            Meet the minds behind the{' '}
            <span className="text-gradient">magic</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg"
          >
            A diverse team of engineers, designers, and strategists united by a
            passion for creating exceptional digital experiences.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden bg-[#0a0a0f] border border-white/5 hover:border-[#af2c47]/20 transition-all duration-500">
                {/* Avatar Placeholder */}
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#af2c47]/20 to-[#681b29]/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[#af2c47]/20 flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-[#af2c47]">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white/80 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#af2c47] text-sm mb-4">{member.role}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs text-white/40 bg-white/5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#af2c47] transition-colors"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#af2c47] transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TECHNOLOGY STACK
// ============================================
const TechStack = () => {
  const categories = ['Frontend', 'Backend', 'AI/ML', 'Cloud', 'DevOps', 'Database'];

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="container-xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-sm uppercase tracking-widest mb-4"
          >
            Our Stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            Technologies we{' '}
            <span className="text-gradient">master</span>
          </motion.h2>
        </div>

        {/* Tech Grid by Category */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="p-6 rounded-lg bg-[#12121a] border border-white/5"
            >
              <h4 className="font-display font-medium text-white mb-4">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {technologies
                  .filter(t => t.category === category)
                  .map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 text-sm text-white/60 bg-white/5 rounded hover:bg-[#af2c47]/10 hover:text-[#af2c47] transition-all duration-300 cursor-default"
                    >
                      {tech.name}
                    </span>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPANY INFO
// ============================================
const CompanyInfo = () => {
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
              Company
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg text-white mb-6"
            >
              {companyInfo.name}{' '}
              <span className="text-gradient">(Pvt) Ltd</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg mb-8"
            >
              Founded in {companyInfo.founded}, we've grown from a small team with big
              dreams to a full-service digital agency serving clients across 8 countries.
              Our journey is defined by the relationships we've built and the problems
              we've solved.
            </motion.p>

            {/* Info Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 text-white/60">
                <MapPin size={20} className="text-[#af2c47]" />
                <span>{companyInfo.location}</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Calendar size={20} className="text-[#af2c47]" />
                <span>Established {companyInfo.founded}</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Globe size={20} className="text-[#af2c47]" />
                <span>{companyInfo.website}</span>
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#af2c47]/20 to-[#681b29]/20 p-1">
              <div className="w-full h-full rounded-lg bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center">
                  <img
                    src="/logo.png"
                    alt="Bit Studio"
                    className="w-32 h-32 mx-auto mb-6"
                  />
                  <h3 className="font-display font-bold text-3xl text-white mb-2">
                    {companyInfo.name}
                  </h3>
                  <p className="text-white/40 tracking-widest uppercase text-sm">
                    {companyInfo.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 px-4 py-2 rounded-lg glass-primary"
            >
              <span className="text-sm text-white">5+ Years</span>
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-lg glass-primary"
            >
              <span className="text-sm text-white">8 Countries</span>
            </motion.div>
          </motion.div>
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
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="container-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="heading-lg text-white mb-6">
            Ready to work with us?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Let's discuss how we can help transform your ideas into reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Start a Conversation
              <ArrowRight size={16} />
            </Link>
            <Link to="/work" className="btn-secondary">
              See Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN ABOUT PAGE
// ============================================
const About = () => {
  return (
    <main>
      <AboutHero />
      <MissionVision />
      <ValuesGrid />
      <TeamSection />
      <TechStack />
      <CompanyInfo />
      <CtaSection />
    </main>
  );
};

export default About;
