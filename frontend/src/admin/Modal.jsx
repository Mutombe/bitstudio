import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars -- `motion` is used as <motion.div>; this repo's eslint lacks jsx-uses-vars
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "@phosphor-icons/react";

// Reusable dialog. CRUD lives in modals, not separate pages — faster, keeps
// context, and works the same for create and edit. Closes on Escape or a
// backdrop click; traps initial focus.
const SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

export default function Modal({ open, onClose, title, description, size = "lg", children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // Focus the first field for keyboard-first data entry.
    const t = setTimeout(() => {
      panelRef.current?.querySelector("input, textarea, select, button")?.focus();
    }, 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-[8vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.18 }}
              className={`relative w-full ${SIZES[size]} bg-maroon-950 border border-white/12 rounded-lg shadow-2xl`}
            >
              <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-semibold text-bone-100">{title}</h2>
                  {description && <p className="mt-0.5 text-sm text-bone-100/50">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-1.5 -m-1.5 rounded-md text-bone-100/40 hover:text-bone-100 hover:bg-white/5"
                >
                  <XIcon size={18} />
                </button>
              </div>
              <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
