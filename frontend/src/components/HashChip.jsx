// HashChip — small mono-type hashtag pill with a thin chartreuse border.
// Used inside the home service cards to replace paragraphs of prose with a
// dense, design-artifact cluster of tech/tool tags.
export function HashChip({ children }) {
  return (
    <span className="inline-flex items-center font-mono text-[10px] tracking-[0.08em] px-2 py-1 border border-signal/30 rounded-full text-signal/80 hover:border-signal hover:text-signal transition-colors duration-300">
      {children}
    </span>
  );
}

export default HashChip;
