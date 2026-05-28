import { useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  GlobeHemisphereWestIcon,
  CopyIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { LIVE_SITES } from "../data/live-sites.js";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd, creativeWorkJsonLd } from "../components/SEO.jsx";

export default function LiveDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const viewHover = useCursorHover("view", "Open");
  const hover = useCursorHover("hover", "");

  const site = useMemo(
    () => LIVE_SITES.find((s) => s.slug === slug),
    [slug]
  );

  // Adjacent. Wrap around at edges
  const adjacent = useMemo(() => {
    if (!site) return { prev: null, next: null };
    const idx = LIVE_SITES.findIndex((s) => s.slug === site.slug);
    const prev = LIVE_SITES[(idx - 1 + LIVE_SITES.length) % LIVE_SITES.length];
    const next = LIVE_SITES[(idx + 1) % LIVE_SITES.length];
    return { prev, next };
  }, [site]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!site) {
    return (
      <PageTransition>
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <p className="label-mono text-maroon-400 mb-4">Frequency unknown</p>
            <h1 className="display-xl text-bone-100 mb-6">
              No artifact at this address.
            </h1>
            <Link to="/live" className="btn btn-primary">
              Back to broadcasts
              <ArrowLeftIcon size={14} weight="bold" />
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  const copyDomain = async () => {
    try {
      await navigator.clipboard.writeText(site.domain);
      toast.success("Domain copied");
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  const [ink, accent, mist] = site.palette;

  return (
    <PageTransition>
      <SEO
        title={`${site.name} · ${site.tag}`}
        description={`${site.brief} Live at ${site.domain}.`}
        path={`/live/${site.slug}`}
        type="article"
        keywords={[site.name, site.tag, site.industry, site.domain, "live website", "Bit Studio"].filter(Boolean)}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Live", path: "/live" },
            { name: site.name, path: `/live/${site.slug}` },
          ]),
          creativeWorkJsonLd({
            name: site.name,
            description: site.brief,
            url: site.url,
            palette: site.palette,
            aesthetic: site.tag,
            industry: site.industry,
          }),
        ]}
      />
      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden"
        style={{
          background: `linear-gradient(140deg, ${ink} 0%, ${ink} 55%, ${ink} 100%)`,
        }}
      >
        {/* Ambient bleed using the site's own accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[8%] right-[-10%] w-[44vw] h-[44vw] rounded-full blur-[180px] opacity-50"
            style={{ backgroundColor: accent }}
          />
          <div
            className="absolute bottom-[-12%] left-[-10%] w-[36vw] h-[36vw] rounded-full blur-[160px] opacity-30"
            style={{ backgroundColor: mist }}
          />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-10 md:mb-14">
            <Link to="/" {...hover} className="hover:text-bone-100 transition-colors">
              Index
            </Link>
            <span className="text-bone-100/30">/</span>
            <Link to="/live" {...hover} className="hover:text-bone-100 transition-colors">
              Live
            </Link>
            <span className="text-bone-100/30">/</span>
            <span className="text-bone-100/65">{site.industry || site.tag}</span>
            <span className="text-bone-100/30">·</span>
            <span style={{ color: accent }}>{site.tag}</span>
            <span className="text-bone-100/30">/</span>
            <span className="text-bone-100/85 truncate max-w-[60vw]">{site.name}</span>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: accent }}
                >
                  {site.tag}
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
                  On-air
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="display-massive text-bone-100 leading-[0.84]"
              >
                {site.name}.
              </motion.h1>

              <p className="mt-8 max-w-2xl text-lg text-bone-100/80 leading-relaxed">
                {site.brief}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  {...viewHover}
                  className="btn btn-primary"
                  style={{ backgroundColor: accent, color: ink }}
                >
                  Visit live
                  <ArrowUpRightIcon size={14} weight="bold" />
                </a>
                <Link to="/live" {...hover} className="btn btn-ghost">
                  <ArrowLeftIcon size={14} weight="bold" />
                  Back to broadcasts
                </Link>
              </div>
            </div>

            {/* Palette card */}
            <div className="col-span-12 lg:col-span-4">
              <div
                className="relative rounded-sm border border-white/10 p-6 md:p-7 bg-white/5 backdrop-blur-sm"
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ backgroundColor: accent }}
                />
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-5">
                  Identity strip
                </p>
                <div className="space-y-3 mb-6">
                  {site.palette.map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <span
                        className="w-9 h-9 rounded-sm border border-white/10 shrink-0"
                        style={{ backgroundColor: c }}
                      />
                      <span className="font-mono text-[11px] tracking-tight text-bone-100/75">
                        {c.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-white/10">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-2">
                    Public address
                  </p>
                  <div className="flex items-center gap-2 text-bone-100/85">
                    <GlobeHemisphereWestIcon size={14} className="shrink-0" style={{ color: accent }} />
                    <span className="font-mono text-sm truncate">{site.domain}</span>
                    <button
                      onClick={copyDomain}
                      className="ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] tracking-[0.2em] uppercase border border-white/15 hover:border-signal hover:text-signal text-bone-100/60 transition-colors shrink-0"
                      aria-label="Copy domain"
                    >
                      <CopyIcon size={10} weight="bold" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF / FRAMED EMBED ───────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <SectionLabel chapter="§ 02" title="Frame" />
              <h2 className="mt-4 font-display text-2xl md:text-4xl text-bone-100 leading-[1.05]">
                A glimpse. The rest is at the public address.
              </h2>
            </div>
            <a
              href={site.url}
              target="_blank"
              rel="noreferrer"
              {...viewHover}
              className="btn btn-ghost"
            >
              Open full
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>
          </div>

          {/* Browser-chrome frame around an iframe of the live site.
              Some sites block embedding via X-Frame-Options. The fallback is
              a styled placeholder with a clear "Visit live" CTA. */}
          <div className="relative rounded-sm border border-white/10 overflow-hidden bg-[color:var(--color-ink)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-maroon-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-bone-100/40" />
              </span>
              <span className="ml-3 flex items-center gap-2 text-bone-100/60 font-mono text-[11px] tracking-tight">
                <GlobeHemisphereWestIcon size={12} />
                {site.domain}
              </span>
              <span className="ml-auto font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/40">
                On-air
              </span>
            </div>
            <div className="relative aspect-[16/10] md:aspect-[16/8] bg-bone-100/5">
              <iframe
                src={site.url}
                title={`${site.name}. Live preview`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
              />
              {/* Fallback overlay. Only visible if iframe fails (X-Frame-Options).
                  Sits BEHIND the iframe via z-0; if the iframe renders, you don't
                  see it. If the iframe blanks (browser blocked), this is what's there. */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 mb-3">
                    Embed blocked by the site
                  </p>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ backgroundColor: accent, color: ink }}
                  >
                    Visit {site.domain}
                    <ArrowUpRightIcon size={14} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREV / NEXT ────────────────────────────────────────────── */}
      <section className="relative py-14 md:py-20 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {adjacent.prev && (
              <button
                onClick={() => navigate(`/live/${adjacent.prev.slug}`)}
                {...hover}
                className="group relative text-left rounded-sm border border-white/10 hover:border-signal/60 transition-colors p-5 md:p-6"
                style={{ backgroundColor: adjacent.prev.palette[0] }}
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ backgroundColor: adjacent.prev.palette[1] }}
                />
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-2 flex items-center gap-2">
                  <ArrowLeftIcon size={12} weight="bold" />
                  Previous broadcast
                </p>
                <p className="font-display text-xl md:text-2xl text-bone-100 leading-[1.05]">
                  {adjacent.prev.name}
                </p>
                <p className="mt-1 font-mono text-[11px] text-bone-100/55 truncate">
                  {adjacent.prev.domain}
                </p>
              </button>
            )}
            {adjacent.next && (
              <button
                onClick={() => navigate(`/live/${adjacent.next.slug}`)}
                {...hover}
                className="group relative text-left rounded-sm border border-white/10 hover:border-signal/60 transition-colors p-5 md:p-6 md:text-right"
                style={{ backgroundColor: adjacent.next.palette[0] }}
              >
                <span
                  className="absolute right-0 top-0 bottom-0 w-[3px] md:left-auto"
                  style={{ backgroundColor: adjacent.next.palette[1] }}
                />
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-2 flex items-center md:justify-end gap-2">
                  Next broadcast
                  <ArrowRightIcon size={12} weight="bold" />
                </p>
                <p className="font-display text-xl md:text-2xl text-bone-100 leading-[1.05]">
                  {adjacent.next.name}
                </p>
                <p className="mt-1 font-mono text-[11px] text-bone-100/55 truncate">
                  {adjacent.next.domain}
                </p>
              </button>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
