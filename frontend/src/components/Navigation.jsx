import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks } from '../data/siteData';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-50 flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-sm overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Bit Studio"
                    className="w-full h-full object-contain"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 bg-[#af2c47]/20 rounded-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.2, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-lg tracking-tight">
                  Bit Studio
                </span>
                <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase hidden sm:block">
                  Digital Innovation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-5 py-2 group"
                >
                  <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-[#af2c47]'
                      : 'text-white/70 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-white/5 rounded-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-1 left-5 right-5 h-px bg-[#af2c47] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                className="group relative px-6 py-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#af2c47] to-[#681b29] rounded-sm" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#d64d68] to-[#af2c47] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2 text-white text-sm font-display font-medium uppercase tracking-wider">
                  Start Project
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative z-50 p-2 text-white"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a0f]"
            />

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -top-1/2 -right-1/2 w-full h-full"
                style={{
                  background: 'radial-gradient(circle, rgba(175, 44, 71, 0.15) 0%, transparent 70%)',
                }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-1/2 -left-1/2 w-full h-full"
                style={{
                  background: 'radial-gradient(circle, rgba(104, 27, 41, 0.1) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col justify-center px-8">
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-4 text-4xl font-display font-bold transition-colors ${
                        location.pathname === link.path
                          ? 'text-[#af2c47]'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-sm font-normal text-[#af2c47]/60">
                          0{index + 1}
                        </span>
                        {link.name}
                        {location.pathname === link.path && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-2 h-2 rounded-full bg-[#af2c47]"
                          />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-12"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#af2c47] to-[#681b29] text-white font-display font-medium uppercase tracking-wider rounded-sm"
                >
                  Start Your Project
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-white/40 text-sm">Get in touch</p>
                <a href="mailto:admin@bitstudio.co.zw" className="text-white hover:text-[#af2c47] transition-colors">
                  admin@bitstudio.co.zw
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
