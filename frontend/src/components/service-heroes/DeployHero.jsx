import { motion } from "framer-motion";
import {
  WrenchIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  PulseIcon,
} from "@phosphor-icons/react";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * DeployHero — pipeline visualized as 4 stations (Build → Test → Ship → Monitor).
 * A chartreuse packet travels left-to-right on a loop, arriving at each station in turn.
 */
const STATIONS = [
  { id: "build", label: "Build",   Icon: WrenchIcon,        t: 0.12 },
  { id: "test",  label: "Test",    Icon: CheckCircleIcon,   t: 0.38 },
  { id: "ship",  label: "Ship",    Icon: RocketLaunchIcon,  t: 0.64 },
  { id: "ops",   label: "Monitor", Icon: PulseIcon,         t: 0.90 },
];

export default function DeployHero() {
  const reduced = useReducedMotionPreference();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 20% 40%, rgba(107,21,33,0.4), transparent 55%), radial-gradient(circle at 80% 60%, rgba(58,10,21,0.5), transparent 55%), #0A0708"
      }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16">
        <div className="w-full max-w-5xl">
          {/* Track */}
          <div className="relative h-40 md:h-56">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-[7%] right-[7%] h-px bg-bone-100/15" />

            {/* Active glow under the line */}
            <div
              className="absolute top-1/2 left-[7%] right-[7%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #D4FF3A 50%, transparent)",
                boxShadow: "0 0 16px rgba(212,255,58,0.6)",
                opacity: 0.7,
              }}
            />

            {/* Stations */}
            {STATIONS.map((s, i) => {
              const Icon = s.Icon;
              return (
                <div
                  key={s.id}
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${7 + s.t * 86}%`, transform: "translate(-50%, -50%)" }}
                >
                  {/* Node circle */}
                  <motion.div
                    className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border flex items-center justify-center backdrop-blur-sm"
                    style={{
                      borderColor: "rgba(212,255,58,0.4)",
                      background: "rgba(10,7,8,0.7)",
                    }}
                    animate={reduced ? {} : { borderColor: ["rgba(212,255,58,0.3)", "rgba(212,255,58,1)", "rgba(212,255,58,0.3)"] }}
                    transition={{ duration: 3.5, delay: s.t * 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon size={24} weight="regular" className="text-signal" />
                    {/* Pulse ring when packet arrives */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-signal"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={reduced ? {} : { opacity: [0, 0.7, 0], scale: [1, 1.6, 1.8] }}
                      transition={{
                        duration: 1.4,
                        delay: s.t * 3.5,
                        repeat: Infinity,
                        repeatDelay: 3.5 - 1.4,
                      }}
                    />
                  </motion.div>

                  {/* Label */}
                  <p className="mt-3 md:mt-4 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-bone-100/70">
                    {s.label}
                  </p>
                </div>
              );
            })}

            {/* Packet traveling left → right */}
            {!reduced && (
              <motion.div
                className="absolute top-1/2 w-3 h-3 rounded-full"
                style={{
                  background: "#D4FF3A",
                  boxShadow: "0 0 14px #D4FF3A, 0 0 28px rgba(212,255,58,0.5)",
                  translateY: "-50%",
                }}
                initial={{ left: "7%" }}
                animate={{ left: ["7%", "93%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* Output log row */}
          <div className="mt-8 md:mt-12 font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-bone-100/50 flex flex-wrap justify-center gap-4 md:gap-6">
            <LogLine label="npm run build" ms="8.4s" />
            <LogLine label="test suite" ms="2.1s" />
            <LogLine label="render deploy" ms="42s" />
            <LogLine label="health check" ms="200ms" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-3 right-3 md:bottom-6 md:left-8 md:right-8 flex items-end justify-between pointer-events-none">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal/80 mb-2">
            Pipeline · continuous
          </p>
          <h2 className="italic-accent text-3xl md:text-4xl text-bone-100 max-w-md leading-tight">
            A working thing, not a zip.
          </h2>
        </div>
      </div>
    </div>
  );
}

function LogLine({ label, ms }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-1 h-1 rounded-full bg-signal" />
      <span>{label}</span>
      <span className="text-bone-100/30">·</span>
      <span className="text-signal/70">{ms}</span>
    </span>
  );
}
