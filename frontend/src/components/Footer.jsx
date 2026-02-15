import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Facebook, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { companyInfo, services, products, navLinks } from '../data/siteData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-white/5">
      {/* CTA Section */}
      <div className="container-xl pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24">
        <div className="relative overflow-hidden rounded-lg p-6 md:p-10 lg:p-16 xl:p-20">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#af2c47]/20 via-[#681b29]/10 to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(175, 44, 71, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, rgba(104, 27, 41, 0.1) 0%, transparent 50%)`
          }} />

          {/* Content */}
          <div className="relative z-10 max-w-3xl pb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#af2c47] font-display text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
            >
              Ready to Transform?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg text-white mb-4 md:mb-6"
            >
              Let's build something{' '}
              <span className="text-gradient">extraordinary</span> together.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-base md:text-lg mb-6 md:mb-8 max-w-xl"
            >
              Whether you're launching a new venture or transforming an existing business,
              we're here to turn your vision into reality.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Link
                to="/contact"
                className="btn-primary"
              >
                Start a Project
                <ArrowUpRight size={14} className="md:w-4 md:h-4" />
              </Link>
              <a
                href={`mailto:${companyInfo.email}`}
                className="btn-secondary text-sm"
              >
                {companyInfo.email}
              </a>
            </motion.div>
          </div>

          {/* Decorative */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none hidden md:block">
            <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-[#af2c47]/30 rounded-full" />
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 border border-[#af2c47]/20 rounded-full" />
          </div>
        </div>
      </div>

      <br/>
      <br/>
      <br/>

      {/* Main Footer */}
      <div className="container-xl pb-8 md:pb-12 pt-8 md:pt-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-8 pb-8 md:pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Bit Studio" className="w-10 h-10" />
              <div>
                <span className="font-display font-bold text-white text-xl">Bit Studio</span>
                <p className="text-xs text-white/40 tracking-wider uppercase">Digital Innovation</p>
              </div>
            </Link>
            <p className="text-white/50 mb-6 max-w-sm text-sm">
              {companyInfo.description}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: companyInfo.social.github },
                { icon: Linkedin, href: companyInfo.social.linkedin },
                { icon: Facebook, href: companyInfo.social.facebook }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white/50 hover:text-[#af2c47] hover:bg-[#af2c47]/10 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-white mb-4 md:mb-6 text-sm">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-[#af2c47] transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-white mb-4 md:mb-6 text-sm">Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="text-white/50 hover:text-[#af2c47] transition-colors duration-300 text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-white mb-4 md:mb-6 text-sm">Products</h4>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id}>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/50 hover:text-[#af2c47] transition-colors duration-300 group"
                  >
                    {product.logo && (
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{ background: `${product.color}15`, border: `1px solid ${product.color}20` }}
                      >
                        <img src={product.logo} alt={product.title} className="w-5 h-5 object-contain" />
                      </div>
                    )}
                    <div>
                      <span className="text-sm block leading-tight">{product.title}</span>
                      <span className="text-[10px] text-white/30">{product.tagline}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-white mb-4 md:mb-6 text-sm">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 text-white/50 hover:text-[#af2c47] transition-colors duration-300 text-sm"
                >
                  <Phone size={16} />
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-white/50 hover:text-[#af2c47] transition-colors duration-300 text-sm"
                >
                  <Mail size={16} />
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-white/50 text-sm">
                  <MapPin size={16} />
                  {companyInfo.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
