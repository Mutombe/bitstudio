import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";

import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import Ticker from "../components/Ticker.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";
import WaveBreak from "../components/WaveBreak.jsx";

/*
 * Writing. The aggregate of everything the studio has published about
 * how it thinks. Distinct surfaces, one body of work:
 *
 *   /craft           the canon (Werkbund · Vignelli · Musashi · Bauhaus)
 *   /studio          the manifesto (five essays)
 *   /field-manual    the operating doctrines (twelve)
 *   /lab             the R&D arm (surfaces · briefs · field notes)
 *
 * Each entry below opens the full piece. Together they describe the
 * studio more honestly than any landing copy could. Designed to be the
 * page a serious buyer reads when they want to understand what kind of
 * room they would be walking into.
 */

const ENTRIES = [
  {
    section: "01",
    label: "Canon",
    to: "/craft",
    title: "Craft. After Musashi.",
    italicTitle: "After Musashi.",
    summary:
      "The lineage we belong to. Werkbund, Vignelli, Bauhaus, and a swordsman who lived four centuries ago. Earth, Water, Fire, Wind, Void. The five rings of the practice, plus the Dokkōdō, ten precepts taped to the studio wall.",
    pieces: "5 essays · 10 precepts · 8 aesthetic archetypes",
    accent: "#C8A968",
    cta: "Read the canon",
  },
  {
    section: "02",
    label: "Manifesto",
    to: "/studio",
    title: "The Practice. A manifesto in five essays.",
    italicTitle: "in five essays.",
    summary:
      "On beauty. On code. On restraint. On speed. On the platform. Five short pieces that describe how this studio actually thinks before it ships. Read it twice. The second reading is the point.",
    pieces: "5 essays · ~1,400 words",
    accent: "#D4FF3A",
    cta: "Read the manifesto",
  },
  {
    section: "03",
    label: "Doctrine",
    to: "/field-manual",
    title: "Field Manual. Twelve published doctrines.",
    italicTitle: "Twelve published doctrines.",
    summary:
      "Numbered, defendable, publicly held. We ship in ten days because the eleventh is theatre. We refuse two kinds of brief. We publish the numbers we hold ourselves to. We name the people, not the team. The platform is rented.",
    pieces: "12 doctrines · operational layer",
    accent: "#8BB5D6",
    cta: "Read the doctrines",
  },
  {
    section: "04",
    label: "R&D",
    to: "/lab",
    title: "Lab. What we are building before clients ask for it.",
    italicTitle: "before clients ask for it.",
    summary:
      "Five surfaces (Meta Ray-Ban Display, Apple Vision Pro, Quest, Wear OS, voice-and-ambient AI). Four open briefs. A public reading log across spatial computing, AI agents and MCP, WhatsApp infrastructure, and cloud. Six internal tools running in production. Six open problems.",
    pieces: "5 surfaces · 4 briefs · 8 reading logs · 6 tools · 6 problems",
    accent: "#5B3FFF",
    cta: "Read the lab",
  },
];

// Forward-looking essays. Real plans, not vaporware. Published once
// each is written; the placeholder slots tell a reader the studio is
// a body of work, not a single moment.
const FORTHCOMING = [
  {
    title: "On the gram of weight.",
    sub: "Why every spatial-app pixel must justify the gram of the device it sits on.",
    when: "2026 Q3",
  },
  {
    title: "On the agentic web.",
    sub: "What MCP means for the kind of software a small studio can ship.",
    when: "2026 Q3",
  },
  {
    title: "On the operating system of small business.",
    sub: "Building for WhatsApp as if it were Linux for the under-banked half of the planet.",
    when: "2026 Q4",
  },
  {
    title: "On the second draft.",
    sub: "The discipline of refusing the first thing we made, even when it works.",
    when: "2026 Q4",
  },
];

export default function Writing() {
  return (
    <PageTransition>
      <SEO
        title="Writing · Four essays on how we work"
        description="Every piece the studio has published on how it thinks. The canon (Werkbund · Vignelli · Bauhaus · Musashi), the manifesto (five essays), the field manual (twelve doctrines), and the lab (R&D for the next surfaces). The serious buyer reads this before the first call."
        path="/writing"
        keywords={[
          "design studio writing", "studio essays", "design manifesto",
          "engineering manifesto", "studio philosophy", "studio doctrines",
          "Werkbund", "Vignelli", "Bauhaus", "Musashi", "Book of Five Rings",
          "Anthropic MCP", "spatial computing", "WhatsApp infrastructure",
          "ten day ship", "Lighthouse 100",
        ]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Writing", path: "/writing" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Writing. Four essays on how we work.",
            url: "https://bitstudio.co.zw/writing",
            description:
              "Every piece the studio has published on how it thinks. Craft, the practice, the field manual, the lab.",
            mainEntity: {
              "@type": "ItemList",
              name: "Bit Studio body of work",
              itemListElement: ENTRIES.map((e, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Article",
                  name: e.title,
                  url: `https://bitstudio.co.zw${e.to}`,
                  description: e.summary,
                  author: {
                    "@type": "Organization",
                    name: "Bit Studio",
                  },
                },
              })),
            },
          },
        ]}
      />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[42vw] h-[42vw] rounded-full bg-maroon-600/20 blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[36vw] h-[36vw] rounded-full bg-signal/[0.05] blur-[180px]" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-10">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>§ Writing</span>
            <span className="text-bone-100/30">/</span>
            <span>Body of work</span>
            <span className="text-bone-100/30">/</span>
            <span>{ENTRIES.length} pieces, {FORTHCOMING.length} forthcoming</span>
          </div>

          <h1 className="display-massive text-bone-100 leading-[0.82]">
            Four essays.
            <br />
            <span className="italic-accent text-maroon-400 font-light">
              One body of work.
            </span>
          </h1>

          <p className="mt-10 max-w-3xl text-lg text-bone-100/75 leading-relaxed">
            Every piece the studio has published on how it thinks.
            Distinct surfaces. One throughline. The reader who has
            considered all four is the reader we would like to meet.
          </p>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── THE FOUR ENTRIES ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-14 md:mb-20">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 01" title="Published" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                What we have already
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  put down in writing.
                </span>
              </h2>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16">
            {ENTRIES.map((entry, i) => (
              <motion.article
                key={entry.to}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <Link
                  to={entry.to}
                  className="block border-l-2 pl-6 md:pl-10 py-6 md:py-8 transition-colors hover:bg-white/[0.015]"
                  style={{ borderLeftColor: entry.accent }}
                >
                  <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                    <div className="col-span-12 md:col-span-3">
                      <p
                        className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2"
                        style={{ color: entry.accent }}
                      >
                        Essay {entry.section} · {entry.label}
                      </p>
                      <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/40">
                        {entry.pieces}
                      </p>
                    </div>

                    <div className="col-span-12 md:col-span-9">
                      <h3 className="font-display text-2xl md:text-4xl text-bone-100 leading-[1.08] tracking-[-0.01em] mb-5 group-hover:text-bone-100 transition-colors">
                        {entry.title.replace(entry.italicTitle, "")}
                        <span className="italic-accent text-bone-300 font-light">
                          {entry.italicTitle}
                        </span>
                      </h3>
                      <p className="text-base md:text-lg text-bone-100/80 leading-relaxed max-w-3xl mb-6">
                        {entry.summary}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase group-hover:text-signal transition-colors"
                        style={{ color: entry.accent }}
                      >
                        {entry.cta}
                        <ArrowRightIcon size={12} weight="bold" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── FORTHCOMING ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 02" title="Forthcoming" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                Essays we have promised
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  ourselves to write.
                </span>
              </h2>
              <p className="mt-6 text-bone-100/65 max-w-2xl leading-relaxed">
                Each title below is a piece we have committed to ship,
                with the quarter in which it will appear. We publish the
                commitment so we have to keep it.
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-6xl">
            {FORTHCOMING.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 border-l border-white/10 hover:border-signal/40 transition-colors"
              >
                <span className="absolute left-0 top-0 font-mono text-[10px] tracking-[0.22em] uppercase text-signal -translate-x-[calc(100%+8px)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-3">
                  {p.when}
                </p>
                <p className="font-display text-xl md:text-2xl text-bone-100 leading-snug mb-2">
                  {p.title}
                </p>
                <p className="text-bone-100/65 leading-relaxed text-sm md:text-base">
                  {p.sub}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── CLOSING ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 max-w-4xl">
          <div className="border-y border-white/10 py-12 md:py-16">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-4">
              § Writing · closing
            </p>
            <h2 className="display-xl text-bone-100 leading-[1.02] mb-6">
              Read the four.
              <br />
              <span className="italic-accent text-bone-300 font-light">
                Then write to us.
              </span>
            </h2>
            <p className="text-bone-100/75 max-w-2xl mb-10 leading-relaxed">
              The four essays describe the room a buyer is walking into
              more honestly than any landing copy could. If after reading
              you still want to be inside, the conversation starts at
              /contact.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn btn-primary">
                Open a conversation
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
              <Link to="/packages" className="btn btn-ghost">
                See the engagements
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Ticker
        items={[
          "§ Writing",
          `${ENTRIES.length} essays published`,
          `${FORTHCOMING.length} forthcoming`,
          "Read the four. Then write.",
          "MMXXX · Body of work",
        ]}
      />
    </PageTransition>
  );
}
