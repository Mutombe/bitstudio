import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, Component } from "react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import AmbientAudio from "./components/AmbientAudio.jsx";
import { CursorProvider } from "./hooks/useCursor.jsx";

import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Studio from "./pages/Studio.jsx";
import Contact from "./pages/Contact.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Bit Studio boundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-10 text-center">
          <div>
            <p className="label-mono text-maroon-400 mb-4">Transmission interrupted</p>
            <h1 className="display-xl text-bone-100 mb-6">A wire shorted.</h1>
            <p className="text-bone-100/70 mb-8">
              Not your fault. Not our finest hour either. Try a refresh.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Cmd/Ctrl-K + ESC bindings
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CursorProvider>
      <div className="grain min-h-screen bg-[color:var(--color-ink)] text-bone-100">
        <ScrollToTop />
        <Nav onSummon={() => setPaletteOpen(true)} />

        <ErrorBoundary>
          <AnimatePresence mode="popLayout">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onSummon={() => setPaletteOpen(true)} />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </ErrorBoundary>

        <Footer />

        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        <AmbientAudio />
      </div>
    </CursorProvider>
  );
}
