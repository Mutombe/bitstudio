import Marquee from "./Marquee.jsx";

export default function Ticker({ items, dense = false }) {
  const size = dense ? "text-[10px]" : "text-xs md:text-sm";
  return (
    <Marquee className="py-3 border-y border-white/5 bg-maroon-950/50">
      {items.map((item, i) => (
        <div key={i} className={`flex items-center gap-4 shrink-0 font-mono ${size} tracking-[0.2em] uppercase text-bone-100/70`}>
          <span className="w-1 h-1 rounded-full bg-signal" />
          <span>{item}</span>
        </div>
      ))}
    </Marquee>
  );
}
