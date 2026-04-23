import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // If the URL has a hash, let the browser or our handler scroll to that anchor
    if (hash) {
      const id = hash.slice(1);
      // Defer to allow the target to render first
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}
