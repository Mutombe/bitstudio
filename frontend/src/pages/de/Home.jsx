import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import { PROJECTS } from "../../data/projects.js";
import { LIVE_SITES } from "../../data/live-sites.js";
import { sortByAesthetic } from "../../data/aesthetic-score.js";
import { useClock, formatHMS } from "../../hooks/useClock.js";
import { useCursorHover } from "../../hooks/useCursor.jsx";
import Ticker from "../../components/Ticker.jsx";
import ProjectTile from "../../components/ProjectTile.jsx";
import SectionLabel from "../../components/SectionLabel.jsx";
import PageTransition from "../../components/PageTransition.jsx";
import MeshField from "../../components/MeshField.jsx";
import WireframeOverlay from "../../components/WireframeOverlay.jsx";
import WaveBreak from "../../components/WaveBreak.jsx";
import FusionField from "../../components/FusionField.jsx";
import SEO, { organizationJsonLd, websiteJsonLd } from "../../components/SEO.jsx";

/**
 * /de — German-language entry point for the European market.
 *
 * Loud signals German-side B2B buyers respond to: craft-led language
 * (Werkkunst, Handwerk, Sorgfalt), structured layout, clear pricing
 * cadence, time-zone proximity (Mitteleuropäische Zeit overlap).
 *
 * Sister English page at /. Switch via Nav's DE/EN toggle.
 */

const TOTAL_ARTIFACTS = PROJECTS.length + LIVE_SITES.length;
const HOME_TOP = sortByAesthetic(PROJECTS).slice(0, 6);

const TICKER_ITEMS = [
  "Verbindung stabil",
  "React 19 · Vite 7 · Tailwind v4",
  "Harare → Mitteleuropa",
  "Sendung empfangen",
  `${TOTAL_ARTIFACTS} Werke aktiv`,
  "Bereitstellung erfolgreich",
  "Verfügbarkeit 99,94 %",
  "Latenz 41 ms",
];

export default function HomeDE() {
  const hover = useCursorHover("hover", "");
  const viewHover = useCursorHover("view", "Öffnen");
  const now = useClock();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <PageTransition>
      <SEO
        title="Bit Studio · Werkkunst aus Harare"
        description="Ein Design- und Engineering-Studio aus Harare. Wir bauen Oberflächen, Markensysteme und Software, die zu Erbstücken werden. Nach Musashi, 1645."
        path="/de"
        keywords={[
          "Bit Studio",
          "Designstudio",
          "Webentwicklung",
          "Markendesign",
          "UI/UX Berlin",
          "Designstudio Afrika",
          "Werkkunst",
          "Musashi",
        ]}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />

      {/* ─── 00 · HERO ─── */}
      <section
        ref={heroRef}
        className="
          relative overflow-hidden radial-bleed hero-seam
          min-h-[100svh] pt-28 md:pt-40 pb-10 md:pb-16
          lg:pt-20 lg:pb-0
          lg:min-h-[calc(100svh-80px)]
          lg:flex lg:flex-col lg:justify-between
        "
      >
        <MeshField tint="maroon" intensity="med" />
        <WireframeOverlay />

        <div className="relative z-20 max-w-[1600px] mx-auto w-full px-5 md:px-10 flex flex-col gap-8 md:gap-10 lg:pt-10 lg:flex-1 lg:justify-center">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <CircleNotchIcon size={12} className="animate-spin text-signal" />
                Kapitel 00 · Index
              </span>
              <span className="hidden md:inline">MMXXX</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden sm:inline">MEZ-1 · {formatHMS(now)}</span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
                On-air
              </span>
            </div>
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col gap-6 md:gap-8 lg:gap-6"
          >
            <div className="flex flex-col">
              <p className="label-mono text-bone-100/60 mb-4 md:mb-6">
                Sendung 0001 — offen
              </p>
              <h1 className="display-massive text-bone-100 -ml-1 md:-ml-2 leading-[0.86] text-balance text-[clamp(3.25rem,10vw,10rem)]">
                Wir dekorieren nicht.
              </h1>
              <h1 className="display-massive text-bone-100 -mt-[0.04em] md:-mt-[0.05em] leading-[0.86] text-[clamp(3.25rem,10vw,10rem)]">
                <span className="italic-accent text-maroon-400 font-light">Wir erinnern.</span>
              </h1>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
              <div className="col-span-12 md:col-span-6 lg:col-span-5">
                <p className="text-base md:text-lg lg:text-[1.05rem] text-bone-100/85 leading-relaxed max-w-[52ch]">
                  Oberflächen. Systeme. Marken. Eine Praxis für
                  Unternehmen, die{" "}
                  <span className="italic-accent text-signal">
                    wirkliche Schönheit, dauerhafte Infrastruktur, echte Skalierung und Langlebigkeit
                  </span>{" "}
                  jenseits des nächsten Quartals brauchen. Nach Musashi, 1645.
                </p>
                <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/work" {...hover} className="btn btn-primary">
                    Arbeiten ansehen
                    <ArrowRightIcon size={14} weight="bold" />
                  </Link>
                  <Link to="/de/handwerk" {...hover} className="btn btn-ghost">
                    Der Weg
                    <ArrowUpRightIcon size={14} weight="bold" />
                  </Link>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-7 md:flex md:justify-end">
                <div className="relative inline-flex items-stretch gap-6 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
                  <div className="border-l border-maroon-500/40 pl-4">
                    <p className="text-bone-100/40 mb-1">Sendung</p>
                    <p className="text-bone-100/90 text-sm normal-case tracking-normal font-sans">
                      {TOTAL_ARTIFACTS} Werke aktiv
                    </p>
                  </div>
                  <div className="border-l border-maroon-500/40 pl-4">
                    <p className="text-bone-100/40 mb-1">Signatur</p>
                    <p className="text-bone-100/90 text-sm normal-case tracking-normal font-sans italic-accent">
                      Drei Meter über dem Boden
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-20 mt-10 lg:mt-0">
          <Ticker items={TICKER_ITEMS} />
        </div>
      </section>

      <div className="seam-dissolve"><WaveBreak /></div>

      {/* ─── § 01 · ÜBER MAßSTÄBE — Maßstäbe, denen wir uns selbst stellen;
              die Herkunft, zu der wir gehören; und die Auswahl, die
              entscheidet, mit wem wir arbeiten. Der Raum, in dem ein
              Auftraggeber steht — nicht die Tür, an der er klopft. ─── */}
      <section className="relative py-20 md:py-32 bg-[color:var(--color-ink)] seam-bleed-top">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 01" title="Über Maßstäbe" />
            </div>
            <div className="col-span-12 md:col-span-9 space-y-12 max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="display-xl text-bone-100 leading-[1.02]"
              >
                Wir arbeiten zu einem Standard,
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  den die Welt erkennt.
                </span>
              </motion.h2>

              <p className="max-w-2xl text-base md:text-lg text-bone-100/70 leading-relaxed">
                Jeder — auf jedem Kontinent — dessen Geschäft auf
                wirklicher Schönheit, dauerhafter Infrastruktur, echter
                Skalierung oder Langlebigkeit jenseits des nächsten
                Quartals beruht, ist eingeladen, uns zu schreiben. Wir
                wählen die Arbeit, so wie die Arbeit uns wählt. Was folgt,
                sind die Maßstäbe, denen wir uns stellen.
              </p>

              {/* Die vier Leistungen, als ruhiges Band sichtbar gemacht —
                  was uns ein Unternehmen tatsächlich beauftragt, bevor es
                  überhaupt danach fragt. */}
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 max-w-2xl text-bone-100/55 font-mono text-[10px] tracking-[0.22em] uppercase border-y border-white/10 py-4">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Schönheit</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Infrastruktur</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Skalierung</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Langlebigkeit</li>
              </ul>

              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-3">
                    01 · Maßstäbe
                  </p>
                  <p className="font-display text-xl text-bone-100 leading-[1.1] mb-3">
                    Lighthouse 100 ist die Untergrenze.<br />
                    <span className="text-bone-100/55">Zehn Tage ist die Obergrenze.</span>
                  </p>
                  <p className="text-bone-100/75 leading-relaxed text-sm md:text-base">
                    Zahlen, die andere Studios als Ambition
                    veröffentlichen — bei uns sind sie die Untergrenze.
                    Performance, Barrierefreiheit, SEO, Best Practices —
                    vor dem Launch gemessen und am Tag danach erneut. Was
                    die Linie nicht erreicht, geht nicht live, auch wenn
                    der Kalender es lieber anders hätte.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-3">
                    02 · Herkunft
                  </p>
                  <p className="font-display text-xl text-bone-100 leading-[1.1] mb-3">
                    Werkbund. Vignelli. Musashi.
                  </p>
                  <p className="text-bone-100/75 leading-relaxed text-sm md:text-base">
                    Die Menschen, denen Sie hier begegnen, sind in einem
                    Kanon geschult, der die Mode ablehnt. Kein Trend, kein
                    Lorem, keine Dekoration, die sich nicht verdient hat.
                    Form folgt der Funktion, mit einer Seele — und die
                    Seele ist nicht optional. Die lange Fassung steht auf{" "}
                    <Link to="/de/handwerk" className="text-signal hover-line">/handwerk</Link>.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-3">
                    03 · Auswahl
                  </p>
                  <p className="font-display text-xl text-bone-100 leading-[1.1] mb-3">
                    Drei Plätze pro Quartal.<br />
                    <span className="text-bone-100/55">Jeder Kontinent.</span>
                  </p>
                  <p className="text-bone-100/75 leading-relaxed text-sm md:text-base">
                    Wir lehnen zwei Arten von Briefing ab: jene, die schon
                    wissen, wie sie aussehen wollen — und jene, die mit
                    ihren eigenen Nutzern streiten. Alle übrigen
                    bekommen ein echtes Gespräch und gelegentlich
                    einen&nbsp;Vertrag.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="seam-dissolve"><WaveBreak /></div>

      {/* ─── 02 · SELECTED WORK ─── */}
      <section className="relative py-20 md:py-32 bg-[color:var(--color-ink)] seam-bleed-top seam-bleed-bottom-maroon">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <SectionLabel chapter="§ 02" title="Ausgewählte Arbeiten" />
              <h2 className="mt-5 display-xl text-bone-100">
                {TOTAL_ARTIFACTS} Werke.<br />
                <span className="italic-accent text-bone-300">Ein Standard.</span>
              </h2>
            </div>
            <Link to="/work" {...hover} className="btn btn-ghost">
              Alle Arbeiten <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {HOME_TOP.map((p, i) => {
              const bento = ["lg", "sm", "sm", "sm", "sm", "sm"];
              return (
                <ProjectTile
                  key={p.slug}
                  project={p}
                  index={i}
                  size={bento[i % bento.length]}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 03 · FUSION BREAK ─── */}
      <section className="relative overflow-visible bg-maroon-950 seam-fusion">
        <FusionField size="lg" className="" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <p
            className="italic-accent text-bone-100 text-center max-w-3xl leading-snug"
            style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.75rem)" }}
          >
            „Zwei Sterne, ein Argument.
            <br />
            <span className="text-signal">Die Oberfläche ist, wo sie sich einigen."</span>
          </p>
        </div>
      </section>

      {/* ─── 04 · CRAFT TEASER → /de/handwerk ─── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-philosophy">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.05]">
          <span
            className="text-bone-100 leading-none"
            style={{ fontSize: "clamp(15rem, 30vw, 38rem)", fontFamily: "var(--font-display)" }}
          >
            道
          </span>
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-2 md:pt-4">
            <SectionLabel chapter="§ 03" title="Der Weg" />
          </div>
          <div className="col-span-12 md:col-span-10">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-bone-100 max-w-[24ch] leading-[1.02]"
            >
              Wir gestalten nicht.<br />
              Wir <span className="italic-accent text-signal">erinnern</span> uns daran,<br />
              wie Schönheit war,<br />
              bevor sie <span className="italic-accent text-maroon-400">verhandelt</span> wurde.
            </motion.h2>

            <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-10 text-bone-100/75 max-w-5xl">
              <p>
                Jede Datei, die wir ausliefern, ist ein Argument gegen den billigen
                Standard. Gegen die Mode. Gegen das Lorem.
              </p>
              <p>
                Wir arbeiten wie ein Juwelier. Langsam. Im Licht. Wir messen
                dreimal, bevor wir schneiden.
              </p>
              <p>
                Dann liefern wir. Pünktlich. Weil Geschmack ohne Disziplin
                ein Hobby ist.
              </p>
            </div>

            <div className="mt-16 md:mt-24 max-w-3xl border-t border-white/10 pt-10 md:pt-14">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
                Die ganze Lehre · 道
              </p>
              <p className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.15] max-w-2xl mb-6">
                Wir haben das Machen von einem Schwertmeister gelernt, der vor
                vierhundert Jahren lebte.
                <span className="italic-accent text-bone-300"> Die fünf Ringe hängen an der Wand.</span>
              </p>
              <Link to="/de/handwerk" {...hover} className="btn btn-ghost">
                Das Buch der fünf Ringe lesen
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 · CLOSING CTA ─── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-contact">
        <MeshField tint="oxblood" intensity="high" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ 04" title="Schlusswort" />
          <h2 className="mt-10 display-massive text-bone-100 leading-[0.85]">
            Bauen Sie<br />
            <span className="italic-accent text-signal font-light">etwas,</span><br />
            das die <span className="text-maroon-400">Plattform</span><br />
            überlebt.
          </h2>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link to="/de/kontakt" {...viewHover} className="btn btn-primary">
              Sendung öffnen
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <a
              href="https://wa.me/263785948128"
              target="_blank"
              rel="noreferrer"
              {...hover}
              className="btn btn-ghost"
            >
              WhatsApp
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
