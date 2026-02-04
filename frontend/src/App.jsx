import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';

// ============================================
// SCROLL TO TOP ON ROUTE CHANGE
// ============================================
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// ============================================
// PAGE TRANSITION WRAPPER
// ============================================
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// LOADING SCREEN
// ============================================
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0f] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-16 h-16 mx-auto mb-6"
        >
          <img src="/logo.png" alt="Bit Studio" className="w-full h-full" />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="h-0.5 bg-gradient-to-r from-[#af2c47] to-[#681b29] rounded-full mx-auto"
        />
      </motion.div>
    </motion.div>
  );
};

// ============================================
// CUSTOM CURSOR
// ============================================
const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);

    // Add hover detection to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#af2c47] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 0.5 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#af2c47]/50 rounded-full pointer-events-none z-[9998] hidden lg:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 0.3
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Navigation */}
      <Navigation />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/services"
            element={
              <PageTransition>
                <Services />
              </PageTransition>
            }
          />
          <Route
            path="/work"
            element={
              <PageTransition>
                <Work />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />
          {/* 404 Page */}
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// ============================================
// 404 NOT FOUND PAGE
// ============================================
const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24">
      <div className="container-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="heading-xl text-white mb-6">
            4<span className="text-gradient">0</span>4
          </h1>
          <p className="text-white/60 text-xl mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a href="/" className="btn-primary inline-flex">
            Back to Home
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default App;
