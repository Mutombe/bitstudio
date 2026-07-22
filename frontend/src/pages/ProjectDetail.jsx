import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowUpRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CopyIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { findProject, adjacentProjects } from "../data/projects.js";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd, creativeWorkJsonLd } from "../components/SEO.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = findProject(slug);
  const hover = useCursorHover("hover", "");
  const openHover = useCursorHover("view", "Open live");
  const [copied, setCopied] = useState(false);

  if (!project) return <Navigate to="/work" replace />;

  const { prev, next } = adjacentProjects(slug);

  const p = project;
  const [a, b, c] = p.palette;

  // Copy the demo's URL so it can be shared without opening it first.
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(p.url);
    } catch {
      // Non-secure context or old browser: fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = p.url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing more we can do */
      }
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <PageTransition>
      <SEO
        title={`${p.name} · ${p.tag}`}
        description={p.brief || `${p.name}. A Bit Studio artifact. ${p.tag} aesthetic. ${p.industry || "Real-world client."}`}
        path={`/work/${p.slug}`}
        type="article"
        keywords={[p.name, p.tag, p.industry, "Bit Studio", "case study"].filter(Boolean)}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Work", path: "/work" },
            { name: p.name, path: `/work/${p.slug}` },
          ]),
          creativeWorkJsonLd({
            name: p.name,
            description: p.brief,
            url: p.url,
            image: p.image,
            palette: p.palette,
            aesthetic: p.tag,
            industry: p.industry,
          }),
        ]}
      />
      <section className="relative pt-24 md:pt-32 pb-0 overflow-hidden">
        {/* Split hero. Brand color left panel, preview right */}
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-8">
            <Link to="/work" {...hover} className="hover-line">Work</Link>
            <span className="text-bone-100/30">/</span>
            <span>{p.industry || p.tag}</span>
            <span className="text-bone-100/30">·</span>
            <span className="text-signal">{p.tag}</span>
            <span className="text-bone-100/30">/</span>
            <span className="text-bone-100">{p.name}</span>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10 items-stretch">
            {/* Left panel */}
            <div
              className="col-span-12 md:col-span-6 relative rounded-sm overflow-hidden p-8 md:p-12 min-h-[60vh] flex flex-col justify-between"
              style={{
                background: `
                  radial-gradient(circle at 25% 20%, ${hex(a, 0.95)}, transparent 60%),
                  radial-gradient(circle at 80% 80%, ${hex(b || a, 0.75)}, transparent 55%),
                  ${c || "#0a0708"}
                `,
              }}
            >
              <div className="flex items-start justify-between font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: hex(c || "#F5EFE6", 0.7) }}>
                <span>{p.year}</span>
                <span className={p.kind === "recently-live" ? "text-signal" : ""}>
                  {p.kind === "recently-live" ? "Recently Live" : "Experimentation"}
                </span>
              </div>

              <h1 className="display-massive leading-[0.82]" style={{ color: c || "#F5EFE6" }}>
                {p.name}
              </h1>

              <div className="space-y-5">
                <div className="swatch-strip w-48 h-2">
                  {p.palette.map((pc) => (
                    <span key={pc} style={{ background: pc }} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.palette.map((pc) => (
                    <span
                      key={pc}
                      className="px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] uppercase rounded-full border"
                      style={{
                        borderColor: hex(c || "#F5EFE6", 0.25),
                        color: c || "#F5EFE6",
                      }}
                    >
                      {pc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right. Preview / mockup */}
            <div className="col-span-12 md:col-span-6 relative">
              <div className="relative rounded-sm border border-white/10 overflow-hidden bg-maroon-950 min-h-[60vh] h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/40">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-maroon-500" />
                    <span className="w-2 h-2 rounded-full bg-signal-muted" />
                    <span className="w-2 h-2 rounded-full bg-signal" />
                  </div>
                  <span className="truncate normal-case tracking-normal text-bone-100/60 font-sans">
                    {p.url.replace(/^https?:\/\//, "")}
                  </span>
                  <button
                    type="button"
                    onClick={copyLink}
                    {...hover}
                    aria-label="Copy demo link"
                    title={copied ? "Link copied" : "Copy link"}
                    className="shrink-0 flex items-center gap-1 normal-case tracking-normal font-sans text-bone-100/50 hover:text-signal transition-colors"
                  >
                    {copied ? (
                      <CheckIcon size={13} weight="bold" />
                    ) : (
                      <CopyIcon size={13} weight="bold" />
                    )}
                    <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="flex-1 relative">
                  <iframe
                    src={p.url}
                    title={p.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  {...openHover}
                  className="btn btn-primary"
                >
                  Visit live
                  <ArrowUpRightIcon size={14} weight="bold" />
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  {...hover}
                  aria-label="Copy demo link"
                  className="btn btn-ghost"
                >
                  {copied ? (
                    <CheckIcon size={14} weight="bold" />
                  ) : (
                    <CopyIcon size={14} weight="bold" />
                  )}
                  {copied ? "Copied" : "Copy link"}
                </button>
                {next && (
                  <Link to={`/work/${next.slug}`} {...hover} className="btn btn-ghost">
                    Next: {next.name}
                    <ArrowRightIcon size={14} weight="bold" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel chapter="§ Brief" title="What it asked of us" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="display-lg text-bone-100 max-w-4xl">
              {p.brief}
            </p>
            {p.note && (
              <p className="mt-10 italic-accent text-xl md:text-2xl text-signal max-w-3xl leading-snug">
                "{p.note}"
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5 bg-maroon-950/30">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel chapter="§ Stack" title="How we built it" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <dl className="grid md:grid-cols-3 gap-8">
              <div>
                <dt className="label-mono text-bone-100/40 mb-2">Role</dt>
                <dd className="text-bone-100 text-lg">{p.role || "Brand, interface, engineering"}</dd>
              </div>
              <div>
                <dt className="label-mono text-bone-100/40 mb-2">Year</dt>
                <dd className="text-bone-100 text-lg">{p.year}</dd>
              </div>
              <div>
                <dt className="label-mono text-bone-100/40 mb-2">Typography</dt>
                <dd className="text-bone-100 text-lg">{p.typography || "Geometric sans"}</dd>
              </div>
              <div className="md:col-span-3">
                <dt className="label-mono text-bone-100/40 mb-3">Technology</dt>
                <dd className="flex flex-wrap gap-2">
                  {(p.tech || []).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full border border-white/10 text-bone-100/80 font-mono text-[10px] tracking-[0.18em] uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-2 gap-6">
          {prev && (
            <Link
              to={`/work/${prev.slug}`}
              {...hover}
              className="group block"
            >
              <p className="label-mono text-bone-100/40 flex items-center gap-2 mb-4">
                <ArrowLeftIcon size={12} /> Prev
              </p>
              <h3 className="display-lg text-bone-100 group-hover:text-signal transition-colors">
                {prev.name}
              </h3>
            </Link>
          )}
          {next && (
            <Link
              to={`/work/${next.slug}`}
              {...hover}
              className="group block text-right"
            >
              <p className="label-mono text-bone-100/40 flex items-center justify-end gap-2 mb-4">
                Next <ArrowRightIcon size={12} />
              </p>
              <h3 className="display-lg text-bone-100 group-hover:text-signal transition-colors">
                {next.name}
              </h3>
            </Link>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

function hex(h, a = 1) {
  if (!h) return `rgba(255,255,255,${a})`;
  const m = h.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
