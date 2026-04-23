export default function SectionLabel({ chapter, title, children, align = "left" }) {
  return (
    <div className={`flex items-center gap-4 ${align === "right" ? "justify-end" : ""}`}>
      <div className="w-8 h-px bg-maroon-500" />
      <p className="label-mono text-bone-100/50">
        <span className="text-maroon-400">{chapter}</span>{" "}— {title}
      </p>
      {children}
    </div>
  );
}
