import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";

import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import Ticker from "../components/Ticker.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";
import WaveBreak from "../components/WaveBreak.jsx";

/*
 * Field Manual — the studio's published operating doctrines.
 *
 * Twelve numbered opinions, defendable in public. Distinct from /craft
 * (which is the philosophical canon — Musashi, Werkbund, Vignelli) and
 * from /studio (which is a manifesto on beauty/code/restraint/speed).
 * The field manual is operational doctrine: how we run the work.
 *
 * Voice rule: institutional, never apologetic. See memory
 * bitstudio-voice-institutional.
 */

const DOCTRINES = [
  {
    title: "We ship in ten days because the eleventh is theatre.",
    body:
      "The shape of work is decided by the deadline. A ten-day cap removes the option to ornament. Anything that survives the cap is worth shipping. Anything that does not, was decoration.",
    pull: "Ten days. Or not at all.",
  },
  {
    title: "We refuse two kinds of brief.",
    body:
      "The first already knows what it wants to look like — that brief contracts our craft. The second argues with its own users — that brief guarantees the product fails. Every other brief gets a real conversation.",
    pull: "A real brief is one we can still surprise.",
  },
  {
    title: "We publish the numbers we hold ourselves to.",
    body:
      "Lighthouse 100 is the floor. P95 response under 800 ms. Median ship time of ten days. Numbers that can be audited. Numbers we will be embarrassed by if we miss. Aspiration is private; publication is binding.",
    pull: "If it cannot be measured, it can be argued away.",
  },
  {
    title: "A deadline is a form of respect.",
    body:
      "When we say Friday, the work appears on Friday. The client believes us because the date holds. Slippage is not a logistics problem. It is a respect problem — and we treat it as such.",
    pull: "The date holds, or we should not have given it.",
  },
  {
    title: "The first draft is a love letter to the second.",
    body:
      "We never lock the work to the first thing we made. We hold space, deliberately, for a stronger version that will arrive on the day we are most tired. Discipline is what protects that space.",
    pull: "Make it, then make it better than yourself.",
  },
  {
    title: "We do not have a discovery workshop.",
    body:
      "We have Monday, a terminal, and the brief. Draft by Wednesday. URL by Friday. Discovery happens in the doing, not before it. The studio that needs a kickoff workshop has already announced its rate.",
    pull: "The first draft is the workshop.",
  },
  {
    title: "The Lighthouse score is a confession, not a goal.",
    body:
      "A 100 on the dashboard tells you what we measured. It does not tell you whether the page is alive. We measure the score after we ask whether the page is alive — and if the score is high but the page is not, we throw the score away.",
    pull: "Aliveness first. Then the audit.",
  },
  {
    title: "We name the people, not the team.",
    body:
      "Institutions are humans. We name who did the work because the work is the human's, and because the next time you write you will know to whom. \"The team\" is a way to dilute responsibility. We do not dilute responsibility.",
    pull: "Authorship is the smallest form of dignity.",
  },
  {
    title: "The platform is rented.",
    body:
      "React will not be the last frontier. Tailwind will age. The stack beneath the site will be retired, renamed, merged, reissued. We build so that the work survives the replatform. The ideas are the permanent part; the framework is a tenant.",
    pull: "Build for the idea. Rent the framework.",
  },
  {
    title: "White space is paying attention.",
    body:
      "There is a version of every site with more gradients, more animations, more hero sliders, more confetti. That version ships faster and loses sooner. We spend our energy taking things out until only the necessary are left. Restraint is a form of generosity to whoever is reading.",
    pull: "The empty bar of the page is the loudest one.",
  },
  {
    title: "We ship the runbook with the system.",
    body:
      "A working thing is only working if somebody else can keep it working. We document as we build. The runbook is part of the deliverable — not an afterthought, not a separate engagement, not an upsell.",
    pull: "Hand-off is the second half of craft.",
  },
  {
    title: "We choose the work as much as the work chooses us.",
    body:
      "Three slots a quarter. Any continent. The brief that finds the room is the brief that has earned the conversation. We are not a funnel. We do not close. We meet, we decide, we begin — or we do not.",
    pull: "Scarcity is not a strategy. It is the truth of the room.",
  },
];

export default function FieldManual() {
  return (
    <PageTransition>
      <SEO
        title="Field Manual"
        description="The studio's published operating doctrines. Twelve numbered opinions on shipping, refusing, measuring, and naming. Defendable in public."
        path="/field-manual"
        keywords={[
          "operating principles",
          "studio doctrines",
          "Bit Studio field manual",
          "design principles",
          "engineering principles",
        ]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Field Manual", path: "/field-manual" },
          ]),
        ]}
      />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[42vw] h-[42vw] rounded-full bg-maroon-600/20 blur-[180px]" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-10">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>§ Field Manual</span>
            <span className="text-bone-100/30">/</span>
            <span>Operating doctrine</span>
            <span className="text-bone-100/30">/</span>
            <span>{DOCTRINES.length} entries</span>
          </div>

          <h1 className="display-massive text-bone-100 leading-[0.82]">
            How we work,
            <br />
            <span className="italic-accent text-maroon-400 font-light">
              published.
            </span>
          </h1>

          <p className="mt-10 max-w-3xl text-lg text-bone-100/75 leading-relaxed">
            Twelve operating doctrines, defendable in public. Distinct
            from the canon on{" "}
            <Link to="/craft" className="text-signal hover-line">/craft</Link>{" "}
            and the manifesto on{" "}
            <Link to="/studio" className="text-signal hover-line">/studio</Link>.
            This is the operational layer — how we run the work and how
            we decide whether to take it on. Read it twice. If you
            disagree with three or more, we are unlikely to be the right
            studio for you, and we will say so politely.
          </p>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── DOCTRINES ─── */}
      <section className="relative py-20 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 01" title="Twelve doctrines" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                What survives our argument
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  with ourselves.
                </span>
              </h2>
            </div>
          </div>

          <div className="space-y-20 md:space-y-28 max-w-5xl">
            {DOCTRINES.map((d, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-12 gap-6 md:gap-10"
              >
                <header className="col-span-12 md:col-span-3">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-3">
                    Doctrine {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/35">
                    Published {new Date().getFullYear()}
                  </p>
                </header>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-bone-100 leading-[1.08] tracking-[-0.01em] mb-6">
                    {d.title}
                  </h3>
                  <p className="text-base md:text-lg text-bone-100/80 leading-relaxed max-w-3xl mb-6">
                    {d.body}
                  </p>
                  {d.pull && (
                    <p className="italic-accent text-bone-100/55 text-lg md:text-xl border-l-2 border-signal/40 pl-4 max-w-2xl">
                      {d.pull}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 max-w-4xl">
          <div className="border-y border-white/10 py-12 md:py-16">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-4">
              § Field Manual · closing
            </p>
            <h2 className="display-xl text-bone-100 leading-[1.02] mb-6">
              Read it twice.
              <br />
              <span className="italic-accent text-bone-300 font-light">
                Then write to us.
              </span>
            </h2>
            <p className="text-bone-100/75 max-w-2xl mb-10 leading-relaxed">
              The doctrines are not negotiable mid-contract. They are
              published precisely so we never have to argue about them
              during the work. If they sound like the studio you want,
              the conversation starts at /contact.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn btn-primary">
                Open a conversation
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
              <Link to="/craft" className="btn btn-ghost">
                Read the canon on /craft
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Ticker
        items={[
          "Field Manual · Bit Studio",
          `${DOCTRINES.length} published doctrines`,
          "Read it twice",
          "Disagree with three? — write to us anyway",
          "Bit Studio · MMXXX",
        ]}
      />
    </PageTransition>
  );
}
