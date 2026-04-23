import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";

/**
 * AmbientAudio — a user-opt-in Mozart loop.
 * Default OFF. Respects Web Audio autoplay policy — only starts on click.
 * Persists state to localStorage as "bit:ambient".
 */

const SRC =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Eine_kleine_Nachtmusik_-_Mozart_-_1._Allegro.ogg";
const STORAGE_KEY = "bit:ambient";

export default function AmbientAudio() {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);
  const hover = useCursorHover("hover", "");

  // Read persisted state; do NOT autoplay — just remember intent and wait.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "1") {
        // Still requires a user gesture to actually play; we re-enable on first
        // click anywhere, otherwise stay silent.
        const tryResume = () => {
          const a = audioRef.current;
          if (a && a.paused) {
            a.play().then(() => setOn(true)).catch(() => {});
          }
          window.removeEventListener("click", tryResume);
        };
        window.addEventListener("click", tryResume, { once: true });
      }
    } catch (_) {}
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
      try { localStorage.setItem(STORAGE_KEY, "0"); } catch (_) {}
    } else {
      a.volume = 0.15;
      a.loop = true;
      a.play().then(() => {
        setOn(true);
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch (_) {}
      }).catch(() => {
        // If the browser blocks playback, stay off
        setOn(false);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={SRC} preload="none" loop />
      <div
        className="fixed bottom-5 right-5 z-30 flex items-center gap-3 pointer-events-none"
      >
        <AnimatePresence>
          {on && (
            <motion.span
              key="cap"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/70 bg-[color:var(--color-ink)]/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 pointer-events-none"
            >
              ♪ Eine kleine Nachtmusik
            </motion.span>
          )}
        </AnimatePresence>

        <button
          {...hover}
          onClick={toggle}
          aria-label={on ? "Mute ambient audio" : "Play ambient audio"}
          aria-pressed={on}
          className={`pointer-events-auto relative flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
            on
              ? "bg-signal text-ink border-signal"
              : "bg-maroon-950/70 text-bone-100/80 border-white/10 hover:border-signal hover:text-signal"
          } backdrop-blur-md`}
        >
          {on && (
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: [
                "0 0 0 0 rgba(212,255,58,0.4)",
                "0 0 0 8px rgba(212,255,58,0)",
              ] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {on ? (
            <SpeakerHighIcon size={16} weight="regular" />
          ) : (
            <SpeakerSlashIcon size={16} weight="regular" />
          )}
        </button>
      </div>
    </>
  );
}
