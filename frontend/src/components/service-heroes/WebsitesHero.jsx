import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * WebsitesHero — typography-only hero.
 * A pull-quote grows from blurry to sharp while a horizontal marquee of
 * browser-chrome wireframes scrolls underneath.
 */
export default function WebsitesHero() {
  const reduced = useReducedMotionPreference();

  // Build 10 browser chrome tiles for the marquee
  const tiles = Array.from({ length: 10 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 20% 30%, rgba(107,21,33,0.4), transparent 55%), radial-gradient(circle at 80% 70%, rgba(58,10,21,0.5), transparent 55%), #0A0708"
      }} />

      {/* Pull quote — blurred → sharp */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <motion.div
          initial={reduced ? {} : { opacity: 0, filter: "blur(28px)", letterSpacing: "0.08em" }}
          animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "-0.05em" }}
          transition={{ duration: reduced ? 0 : 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal/80 mb-4">
            The smallest contract a business can sign
          </p>
          <h2 className="display-xl text-bone-100 max-w-[16ch] mx-auto leading-[0.88]">
            One page.<br />
            <span className="italic-accent text-bone-300 font-light">One true thing.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee of wireframe browser chromes underneath */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 overflow-hidden marquee">
        <motion.div
          className="flex gap-6 shrink-0"
          animate={reduced ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...tiles, ...tiles].map((_, i) => (
            <BrowserChrome key={i} i={i} />
          ))}
        </motion.div>
      </div>

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
      }} />
    </div>
  );
}

function BrowserChrome({ i }) {
  const widths = [220, 260, 200, 280, 240, 210];
  const w = widths[i % widths.length];
  return (
    <div
      className="shrink-0 rounded-sm border border-white/10 overflow-hidden bg-black/30 backdrop-blur-sm"
      style={{ width: w, height: 120 }}
    >
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-maroon-500/70" />
        <span className="w-1.5 h-1.5 rounded-full bg-signal/70" />
        <span className="w-1.5 h-1.5 rounded-full bg-bone-100/40" />
        <div className="flex-1 h-2 mx-3 rounded bg-white/5" />
      </div>
      <div className="p-3 space-y-2">
        <div className="h-3 w-2/3 rounded bg-bone-100/10" />
        <div className="h-2 w-full rounded bg-bone-100/5" />
        <div className="h-2 w-5/6 rounded bg-bone-100/5" />
        <div className="h-2 w-3/4 rounded bg-bone-100/5" />
        <div className="h-5 w-20 rounded bg-signal/40 mt-3" />
      </div>
    </div>
  );
}
