export default function Marquee({
  children,
  speed = "normal",
  reverse = false,
  className = "",
}) {
  const speedClass = speed === "fast" ? "marquee-fast" : "";
  const reverseClass = reverse ? "marquee-reverse" : "";
  return (
    <div className={`marquee ${speedClass} ${reverseClass} ${className}`}>
      <div className="marquee-track">{children}{children}</div>
    </div>
  );
}
