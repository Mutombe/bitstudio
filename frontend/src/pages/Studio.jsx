import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import Ticker from "../components/Ticker.jsx";
import WireframeOverlay from "../components/WireframeOverlay.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import SEO, { breadcrumbJsonLd, articleJsonLd } from "../components/SEO.jsx";

const DROP_PHRASES = [
  {
    section: "i.",
    label: "On beauty",
    para:
      "Beauty is not the opposite of function. It is function that has remembered it was alive. A button that presses back. A paragraph that holds its breath. An interface that makes the next thing obvious without being told.",
    pull: "We do not decorate. We remember.",
  },
  {
    section: "ii.",
    label: "On code",
    para:
      "Code is a love letter to a stranger who has not read it yet. Usually that stranger is us, three months from now, at 11:47 pm, trying to do something kind. We write it as if we will be the one trying to love it later. Because we will.",
    pull: "The best comment is a smaller function.",
  },
  {
    section: "iii.",
    label: "On restraint",
    para:
      "There is a version of every site with more gradients, more animations, more hero sliders, more confetti. That version ships faster. That version loses sooner. We spend our energy taking things out until only the necessary are left, then we polish those until they glow.",
    pull: "White space is not empty. It is paying attention.",
  },
  {
    section: "iv.",
    label: "On speed",
    para:
      "We are fast because we are few and we decide. We are not a funnel. We do not have a discovery workshop. We have Monday and a terminal. A draft by Wednesday. A live URL by Friday. Revisions are real. Dates are real. Kindness is real.",
    pull: "A deadline is a form of respect.",
  },
  {
    section: "v.",
    label: "On the platform",
    para:
      "The platform will move. React will not be the last frontier. Tailwind will age. The stack beneath the site will be retired, renamed, merged, reissued. We build so that the work survives the replatform. The ideas are the permanent part.",
    pull: "Build for the idea. The framework is rented.",
  },
];

export default function Studio() {
  const hover = useCursorHover("hover", "");

  return (
    <PageTransition>
      <SEO
        title="Studio · A manifesto"
        description="A manifesto in five essays. On beauty, on code, on restraint, on speed, and on the platform. The operating beliefs behind a design and engineering practice for businesses that need real beauty, durable infrastructure, true scale, and longevity past the next quarter."
        path="/studio"
        keywords={[
          "studio manifesto", "design manifesto", "design philosophy",
          "engineering philosophy", "on beauty", "on code", "on restraint",
          "on speed", "design principles", "engineering principles",
          "boutique studio", "premium design studio",
          "Werkbund", "Bauhaus", "Vignelli", "craft tradition",
        ]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Studio", path: "/studio" },
          ]),
          articleJsonLd({
            headline: "The Practice. A manifesto in five essays.",
            description: "On beauty, code, restraint, speed, and the platform. Five short essays that describe how this studio actually thinks before it ships.",
            url: "https://bitstudio.co.zw/studio",
            image: "https://bitstudio.co.zw/logo.png",
            datePublished: "2026-05-19",
          }),
        ]}
      />
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-10 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-maroon-600/30 blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-signal/5 blur-[160px]" />
        </div>
        <WireframeOverlay />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-10">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>Chapter 03 · Studio</span>
            <span className="text-bone-100/30">/</span>
            <span>A manifesto. Read it twice.</span>
          </div>
          <h1 className="display-massive text-bone-100 leading-[0.8]">
            The
            <br />
            <span className="italic-accent text-signal font-light">practice</span>
          </h1>
          <p className="mt-10 max-w-3xl text-lg md:text-xl text-bone-100/85 leading-relaxed">
            Bit Studio is two to four people at any given time, depending on the
            weather and the weight of the problem. We are a studio, not an
            agency. We refuse the difference casually, then passionately, then
            with documentation. The following is what we believe, written out
            loud so we can be held to it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/craft" {...hover} className="btn btn-ghost">
              The Way · after Musashi
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40">
              The longer-form inheritance lives there
            </span>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-20 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel chapter="§ i-v" title="Creed" />
          </div>
          <div className="col-span-12 md:col-span-10 space-y-20 md:space-y-28">
            {DROP_PHRASES.map((d, i) => (
              <motion.article
                key={d.section}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-12 gap-6 md:gap-10 items-start"
              >
                <header className="col-span-12 md:col-span-3">
                  <p className="italic-accent text-5xl md:text-6xl text-maroon-400 leading-none">
                    {d.section}
                  </p>
                  <p className="mt-4 label-mono text-bone-100/50">{d.label}</p>
                </header>
                <div className="col-span-12 md:col-span-9 space-y-6">
                  <p className="display-lg text-bone-100 leading-[0.95] max-w-4xl">
                    <span className="italic-accent text-signal font-light">"{d.pull}"</span>
                  </p>
                  <p className="text-lg md:text-xl text-bone-100/80 leading-relaxed max-w-3xl">
                    <DropCap>{d.para}</DropCap>
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* The one name */}
      <section className="py-28 md:py-40 border-y border-white/5 bg-maroon-950/40">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ vi" title="The studio" />
          <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <h2 className="display-xl text-bone-100">
                Simba Mutombe
                <span className="italic-accent text-bone-300">. </span>
                <span className="italic-accent text-signal font-light">
                  thinks in systems; <br/>ships in colour.
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5">
              <p className="text-lg text-bone-100/75 leading-relaxed">
                We do not list a team because a team is a consequence, not a promise.
                When we scale, we scale in weeks, not headcount.
                Everyone who touches the file leaves the file better than they found it,
                or they do not touch it at all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process. Four steps */}
      <section className="py-20 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ vii" title="How a project moves" />
          <div className="mt-12 grid md:grid-cols-4 gap-6 md:gap-8">
            {[
              { n: "01", t: "Listen", d: "One call. A brief. Maybe a drink." },
              { n: "02", t: "Draft", d: "A thinking document. Wrong on purpose. Useful immediately." },
              { n: "03", t: "Build", d: "Live URL on day three. No slide decks. No mockups to approve." },
              { n: "04", t: "Hand off", d: "Documentation, ownership transfer, and a note that reads: 'you have it now. Treat it well'." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="p-6 border border-white/10 rounded-sm hover:border-signal/60 transition-colors"
              >
                <p className="label-mono text-maroon-400">{s.n}</p>
                <h3 className="mt-4 display-lg text-bone-100">{s.t}</h3>
                <p className="mt-3 text-bone-100/70">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 md:py-28 bg-maroon-600 text-bone-100">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 flex flex-wrap items-center justify-between gap-6">
          <h2 className="display-xl max-w-3xl">
            If this reads like a <span className="italic-accent">manifesto</span>, good.
            It was supposed to.
          </h2>
          <Link to="/contact" {...hover} className="btn btn-primary">
            Open a transmission <ArrowUpRightIcon size={14} weight="bold" />
          </Link>
        </div>
      </section>

      <Ticker
        items={[
          "Discipline · over · enthusiasm",
          "Taste · is · a · muscle",
          "We · ship · on · Fridays · on · purpose",
          "Harare · MMXXX",
          "The · platform · is · rented",
        ]}
      />
    </PageTransition>
  );
}

function DropCap({ children }) {
  if (typeof children !== "string") return children;
  const first = children.charAt(0);
  const rest = children.slice(1);
  return (
    <>
      <span className="float-left mr-3 mt-2 italic-accent text-6xl md:text-7xl leading-[0.8] text-maroon-400">
        {first}
      </span>
      {rest}
    </>
  );
}
