import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const CursorCtx = createContext({
  setVariant: () => {},
  setLabel: () => {},
});

export function CursorProvider({ children }) {
  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("");
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const renderRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (dotRef.current && dotRef.current.style.opacity !== "1") {
        dotRef.current.style.opacity = "1";
      }
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const tick = () => {
      // Lerp towards target
      renderRef.current.x += (posRef.current.x - renderRef.current.x) * 0.22;
      renderRef.current.y += (posRef.current.y - renderRef.current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${renderRef.current.x}px, ${renderRef.current.y}px) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${renderRef.current.x}px, ${renderRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  const value = {
    setVariant: useCallback((v) => setVariant(v || "default"), []),
    setLabel: useCallback((l) => setLabel(l || ""), []),
  };

  return (
    <CursorCtx.Provider value={value}>
      {children}
      <div
        ref={dotRef}
        className="cursor-dot"
        data-variant={variant}
        aria-hidden="true"
      />
      <span
        ref={labelRef}
        className="cursor-label"
        data-visible={label ? "true" : "false"}
        aria-hidden="true"
      >
        {label}
      </span>
    </CursorCtx.Provider>
  );
}

export function useCursor() {
  return useContext(CursorCtx);
}

export function useCursorHover(variant = "hover", label = "") {
  const { setVariant, setLabel } = useCursor();
  return {
    onMouseEnter: () => {
      setVariant(variant);
      setLabel(label);
    },
    onMouseLeave: () => {
      setVariant("default");
      setLabel("");
    },
  };
}
