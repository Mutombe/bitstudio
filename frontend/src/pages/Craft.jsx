import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import WireframeOverlay from "../components/WireframeOverlay.jsx";
import MeshField from "../components/MeshField.jsx";
import Ticker from "../components/Ticker.jsx";
import { AESTHETIC_LIST } from "../data/aesthetics.js";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd, articleJsonLd } from "../components/SEO.jsx";

// ─── THE FIVE RINGS ──────────────────────────────────────────────────────
// Musashi's Go Rin no Sho (1645) is organised in five rings — Earth, Water,
// Fire, Wind, Void. We translate them into the rings of our practice.

const RINGS = [
  {
    kanji: "地",
    name: "Earth",
    practice: "Ground",
    body:
      "The fundamentals never expire. Type, colour, grid, hierarchy, the slow craft of getting one button right. We rehearse the small things until they stop costing attention. A site is built on what you knew before the client called.",
    pull:
      "If you do not have the ground, the rest of the rings have nowhere to stand.",
  },
  {
    kanji: "水",
    name: "Water",
    practice: "Flow",
    body:
      "Water takes the shape of its container. Our work moves through a project — listening, drafting, returning — and we do not hold a posture longer than the project needs us to. A revision is not a defeat. A scrap is not a waste. The shape is the conversation between the brief and the page.",
    pull:
      "The work bends. The standard does not.",
  },
  {
    kanji: "火",
    name: "Fire",
    practice: "Force",
    body:
      "Some commitments cannot be soft. The launch date. The bank-grade encryption. The line that says \"no\" to a beautiful but wrong idea. Fire is the place where the craft refuses to be polite. We do not raise our voice; we tighten the grip.",
    pull:
      "Some decisions are made once. Then they hold.",
  },
  {
    kanji: "風",
    name: "Wind",
    practice: "Air",
    body:
      "Know what the other schools do. Read their pages. Open their inspectors. Notice what they reach for and notice the absences in their reaching. Then do not become them. Wind is the discipline of difference held against the discipline of study.",
    pull:
      "Study every studio. Be none of them.",
  },
  {
    kanji: "空",
    name: "Void",
    practice: "Source",
    body:
      "The thing the work is pointing to that we cannot quite say. The reason a typeface feels right. The reason a button presses back. The void is what is left after Earth, Water, Fire, and Wind have done their work — the unspeakable rightness that a viewer feels but cannot defend. We do not name it. We aim for it.",
    pull:
      "We do not design. We remember what beauty was before it was contested.",
  },
];

// ─── DOKKŌDŌ — selected precepts ────────────────────────────────────────
// Musashi's 21 rules of solitary walking, written days before his death.
// We carry the ones that bear directly on the studio's discipline.

const PRECEPTS = [
  { n: "i.",   text: "Accept everything just the way it is." },
  { n: "ii.",  text: "Think lightly of yourself and deeply of the world." },
  { n: "iii.", text: "Do not, under any circumstances, depend on a half-hearted spirit." },
  { n: "iv.",  text: "In all things, have no preferences." },
  { n: "v.",   text: "Do not regret what you have done." },
  { n: "vi.",  text: "Be detached from desire your whole life long." },
  { n: "vii.", text: "Do not collect tools beyond what is useful." },
  { n: "viii.",text: "Do not act following customary beliefs." },
  { n: "ix.",  text: "You may abandon your own body. You must preserve your honour." },
  { n: "x.",   text: "Never stray from the Way." },
];

export default function Craft() {
  const hover = useCursorHover("hover", "");
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
        title="Craft · The Way"
        description="We learnt to make from Miyamoto Musashi, a swordsman who lived four centuries ago. Earth, Water, Fire, Wind, Void — the five rings of our practice. The Dokkōdō, ten precepts taped to the studio wall."
        path="/craft"
        keywords={["Musashi", "Book of Five Rings", "Dokkodo", "craft", "mastery", "design philosophy", "aesthetic taxonomy"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Craft", path: "/craft" },
          ]),
          articleJsonLd({
            headline: "The Way — Craft, after Musashi",
            description: "Bit Studio's design philosophy, organised around the five rings of Miyamoto Musashi's Go Rin no Sho.",
            url: "https://bitstudio.co.zw/craft",
            image: "https://bitstudio.co.zw/logo.png",
            datePublished: "2026-05-19",
          }),
        ]}
      />
      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden radial-bleed min-h-[100svh] pt-28 md:pt-40 pb-16 md:pb-24 lg:pt-20 lg:flex lg:flex-col lg:justify-center"
      >
        <MeshField tint="oxblood" intensity="med" />
        <WireframeOverlay />

        {/* Big ghosted kanji — the page's spiritual centre */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none pr-[5vw] opacity-[0.07]">
          <span
            className="text-bone-100 leading-none"
            style={{ fontSize: "clamp(20rem, 50vw, 60rem)", fontFamily: "var(--font-display)" }}
          >
            道
          </span>
        </div>

        <div className="relative z-20 max-w-[1600px] mx-auto w-full px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-10">
            <span className="flex items-center gap-2">
              <CircleNotchIcon size={12} className="animate-spin text-signal" />
              Chapter 06 · The Way
            </span>
            <span className="text-bone-100/30">/</span>
            <span>Inheritance from Musashi, 1645</span>
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col gap-8"
          >
            <h1 className="display-hero text-bone-100 leading-[0.84] -ml-1 md:-ml-3">
              The
              <br />
              <span className="italic-accent text-signal font-light">Way.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-lg lg:text-[1.05rem] text-bone-100/85 leading-relaxed">
              We learnt to make from a swordsman who lived four centuries ago.
              His name was Miyamoto Musashi. He fought sixty duels and lost
              none of them. He retired to a cave at the end of his life and
              wrote a book about how to live, called the{" "}
              <span className="italic-accent text-bone-100">Go Rin no Sho</span>{" "}
              — the Book of Five Rings. We have read it more than once. The
              following pages explain what we took.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#rings" {...hover} className="btn btn-primary">
                Enter the rings
                <ArrowRightIcon size={14} weight="bold" />
              </a>
              <Link to="/work" {...hover} className="btn btn-ghost">
                See how it shows up in the work
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── II · WHO ───────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-ink)] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3 md:pt-3">
            <SectionLabel chapter="§ i" title="Who" />
            <p className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
              宮本 武蔵
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
              Miyamoto Musashi
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
              1584 — 1645
            </p>
          </div>

          <div className="col-span-12 md:col-span-9 space-y-6 text-bone-100/75 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-bone-100 max-w-3xl leading-[1.05]"
            >
              A swordsman, undefeated.
              <br />
              <span className="italic-accent text-bone-300">A painter, on the side.</span>
              <br />
              <span className="text-maroon-400">A teacher, at the end.</span>
            </motion.p>

            <p className="text-base md:text-lg leading-relaxed">
              Musashi was born into a small samurai family in late-sixteenth-century
              Japan. He fought his first duel at thirteen, his sixtieth-something
              before he turned thirty, and walked away from each one alive while
              his opponent did not. He also painted. He carved Buddhist statues.
              He wrote calligraphy. He retired to a cave on Mount Iwato and
              spent his last weeks composing the book that has anchored every
              serious craftsman who has found it since.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              We are not selling katanas. We are selling a way. The way is the
              same in any discipline that takes a long time to learn: master
              the small unit, repeat the small unit until it does not cost you,
              and only then begin to compose. The katana is rented. The
              framework is rented. The hand that holds either is the part that
              compounds.
            </p>

            <blockquote className="mt-6 border-l-2 border-signal/60 pl-6 italic-accent text-bone-100 max-w-2xl leading-snug" style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}>
              "To know one thing is to know ten thousand things. <br />
              <span className="text-bone-100/60">— Musashi, Book of Five Rings, Ground Scroll</span>"
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── III · THE FIVE RINGS ───────────────────────────────────── */}
      <section id="rings" className="relative py-24 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <SectionLabel chapter="§ ii" title="The Five Rings" />
            <h2 className="mt-6 display-xl text-bone-100 leading-[1.0]">
              Earth. Water. Fire.
              <br />
              <span className="italic-accent text-bone-300 font-light">Wind. Void.</span>
            </h2>
            <p className="mt-6 text-bone-100/70 max-w-xl">
              He named five rings, in five scrolls. We carry them as the
              practice rings of the studio — the five postures a piece of work
              has to pass through before it ships.
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">
            {RINGS.map((ring, i) => (
              <motion.article
                key={ring.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: Math.min(i * 0.05, 0.25),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-12 gap-6 md:gap-10 border-t border-white/10 pt-12 md:pt-16"
              >
                {/* Big kanji */}
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-2">
                    <span
                      className="text-bone-100 leading-none"
                      style={{
                        fontSize: "clamp(5rem, 9vw, 9rem)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {ring.kanji}
                    </span>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
                        Ring {i + 1} of 5
                      </p>
                      <p className="mt-1 font-display text-xl md:text-2xl text-bone-100">
                        {ring.name} <span className="text-bone-100/40">·</span>{" "}
                        <span className="italic-accent text-signal">{ring.practice}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-9 space-y-6 max-w-3xl">
                  <p className="text-base md:text-lg text-bone-100/80 leading-relaxed">
                    {ring.body}
                  </p>
                  <p className="italic-accent text-bone-100 leading-snug border-l-2 border-signal/60 pl-5" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)" }}>
                    {ring.pull}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IV · DOKKODO PRECEPTS ──────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-maroon-950 text-bone-100 border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <SectionLabel chapter="§ iii" title="Dokkōdō · The Way of Walking Alone" />
            <h2 className="mt-6 display-xl text-bone-100 leading-[1.0]">
              Twenty-one precepts.
              <br />
              <span className="italic-accent text-bone-300 font-light">Written days before he died.</span>
            </h2>
            <p className="mt-6 text-bone-100/70 max-w-xl">
              We carry ten of them into the studio. They sit, taped to a wall,
              in the order he wrote them.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl">
            {PRECEPTS.map((p) => (
              <li key={p.n} className="flex gap-5 items-start">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal pt-1.5 shrink-0 w-10">
                  {p.n}
                </span>
                <span className="text-base md:text-lg text-bone-100/85 leading-[1.55]">
                  {p.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── V · HOW IT SHOWS UP — AESTHETIC TAXONOMY ──────────────── */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <SectionLabel chapter="§ iv" title="How it shows up" />
            <h2 className="mt-6 display-xl text-bone-100 leading-[1.0]">
              Eight ways
              <br />
              <span className="italic-accent text-bone-300 font-light">an artifact carries itself.</span>
            </h2>
            <p className="mt-6 text-bone-100/70 max-w-xl">
              Industry is what the client does. <span className="italic-accent text-bone-100">Aesthetic is how the work moves.</span> We sort our own work by the second, because that's the question we are answering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {AESTHETIC_LIST.map((a, i) => (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(i * 0.04, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-sm border border-white/10 p-6 md:p-7 bg-white/[0.02] hover:bg-white/[0.04] transition-colors min-h-[200px] flex flex-col"
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ backgroundColor: a.accent }}
                />
                <div
                  className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
                  style={{ color: a.accent }}
                >
                  Ring {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.05] mb-3">
                  {a.label}
                </h3>
                <p className="text-sm md:text-[15px] text-bone-100/75 leading-[1.6]">
                  {a.brief}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-4">
            <Link to="/work" className="btn btn-primary">
              See the work, sorted by carriage
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
            <Link to="/live" className="btn btn-ghost">
              On-air broadcasts
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VI · CLOSING ──────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-contact">
        <MeshField tint="oxblood" intensity="high" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ v" title="A word on patience" />
          <h2 className="mt-10 display-massive text-bone-100 leading-[0.85] max-w-5xl">
            If your project
            <br />
            <span className="italic-accent text-signal font-light">demands this kind of patience,</span>
            <br />
            we will return the favour.
          </h2>

          <p className="mt-10 max-w-2xl text-bone-100/75 text-lg">
            We do not pitch. We do not present a deck of "case studies." We
            answer one email, on a Monday, with a question that takes the brief
            seriously. The rest of the way is walked together.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="btn btn-primary">
              Open a transmission
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <a
              href="https://wa.me/263785948128"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      <Ticker
        items={[
          "The Way · 道",
          "Earth · Water · Fire · Wind · Void",
          "After Musashi, 1645",
          "Bit Studio · MMXXX",
        ]}
      />
    </PageTransition>
  );
}
