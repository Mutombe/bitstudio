import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";

/**
 * Terms. A philosophical terms-and-conditions.
 * Real clauses, written in the voice of the studio. No legalese copy-paste,
 * no "WHEREAS the party of the first part." An actual agreement a thinking
 * person could read in one sitting.
 */

const SECTIONS = [
  {
    roman: "I",
    title: "What you are actually agreeing to",
    body: [
      "A contract is a small shared memory. You write down what both parties already believe, so that later, when the memory falters or the weather changes, the paper can speak.",
      "By engaging Bit Studio. Through a written brief, a scope document, a WhatsApp message that ends with 'let's do it', or a transferred deposit. You accept the terms below. They apply to every piece of work we make together until we agree otherwise, in writing, also together.",
    ],
  },
  {
    roman: "II",
    title: "Who owns what we make",
    body: [
      "You own the work. When the final invoice clears, the code, the design files, the copy, the brand assets, the deployment keys. They are yours. Unambiguously. We do not believe in surprise-you-later licensing.",
      "We retain the right to name you as a client, to show the work in our portfolio, and to speak about the work in public talks, case studies and social posts. If a project is under embargo or genuinely confidential, tell us before we start and we will honour it.",
      "We keep the right to reuse internal patterns. Hooks, utilities, component primitives we built before and during your project. You do not license our library to us; we simply do not re-license ours to you.",
    ],
  },
  {
    roman: "III",
    title: "Payment",
    body: [
      "We quote fixed fees for shaped work, and time-and-materials for open-ended work. Both are legitimate. You will always know which you are paying for before you pay for it.",
      "Typical cadence: 50% to begin, 50% on delivery. Longer engagements stage into phases. Invoices are due within 14 days. Late payments accrue a 1.5% monthly charge. Not as punishment, but as a signal that the project's context has shifted and we should talk.",
      "We accept ZWL, USD, EUR, GBP, ZAR, and crypto where it makes sense. We do not chase. We ask once, clearly, then we pause work until the pause is resolved.",
    ],
  },
  {
    roman: "IV",
    title: "Confidentiality",
    body: [
      "What you share with us. Internal documents, roadmaps, customer data, half-formed ambitions, post-funding-round anxieties. Stays with us.",
      "Our team is small. Access to your material is need-to-know within that team. We sign NDAs when you want one, even though our instinct is already to behave like we've signed one.",
    ],
  },
  {
    roman: "V",
    title: "How we use artificial intelligence",
    body: [
      "We use AI tools in our daily work. To write boilerplate, to surface references, to draft copy, to test edge cases. We do so transparently. No tool replaces judgment; no output ships without a human having read, understood and edited it.",
      "We never feed your proprietary material into a consumer-grade model without asking first. Where models are used in production. Agents, assistants, pipelines. We specify which, why, at what volume, and what happens if they fail.",
    ],
  },
  {
    roman: "VI",
    title: "Warranty, and the shape of what could go wrong",
    body: [
      "We warrant that the work will do what we said it would do, on the platforms we said it would run on, for thirty days after delivery. Bugs found inside that window are ours to fix. After that window, continued work is billable, and generally small.",
      "We are not responsible for third-party service outages, for changes to APIs we don't maintain, for acts of regulation or nature, or for business outcomes we cannot control. We are responsible for our own craft and for speaking up the moment something looks wrong.",
      "Our total liability, in the rare case something goes catastrophically sideways, is capped at the fees paid for the specific engagement. This is how studios stay solvent enough to keep making things.",
    ],
  },
  {
    roman: "VII",
    title: "How we end",
    body: [
      "Either party may terminate an engagement with fourteen days' written notice. On termination we stop work, invoice for everything delivered up to that point, and transfer all finished assets.",
      "We will not hold your deliverables hostage. If we have been paid for them, they are already yours. Notice or no notice.",
      "If the ending is sudden because something broke between us. A missed deadline, a miscommunication, a disagreement. We would prefer a fifteen-minute phone call before a lawyer. That is not always possible. We reserve the right to try anyway.",
    ],
  },
  {
    roman: "VIII",
    title: "Where this agreement lives",
    body: [
      "These terms are governed by the laws of Zimbabwe, where Bit Studio is registered. Any dispute that cannot be resolved by conversation will be settled in the High Court of Zimbabwe, Harare Division.",
      "If one clause of these terms turns out to be unenforceable, the rest still hold. If the whole thing turns out to be unenforceable, we will sit down and write a better version together.",
      "Last edited: 24 April 2026. If this page ever changes materially, we will tell our active clients before the change lands.",
    ],
  },
];

export default function Terms() {
  const hover = useCursorHover("hover", "");

  return (
    <PageTransition>
      <SEO
        title="Terms of engagement"
        description="The agreement between Bit Studio and our clients. Payment, IP, revisions, and what counts as 'done.' Written in plain language, no legalese."
        path="/terms"
        keywords={["terms of engagement", "studio terms", "Bit Studio agreement"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Terms", path: "/terms" },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-10 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-maroon-700/25 blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-signal/5 blur-[160px]" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-10">
          {/* Breadcrumb */}
          <div className="pb-5 md:pb-6 mb-8 md:mb-10 border-b border-white/5">
            <div className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-bone-100/60 flex-wrap">
              <Link to="/" {...hover} className="hover-line">Index</Link>
              <span className="text-bone-100/30">/</span>
              <span className="text-signal">Terms</span>
            </div>
          </div>

          <SectionLabel chapter="§ Appendix" title="Terms of engagement" />
          <h1
            className="mt-6 text-bone-100 font-display font-bold leading-[0.88] md:leading-[0.82]"
            style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)", letterSpacing: "-0.045em" }}
          >
            What we agree,
            <br />
            <span className="italic-accent text-signal font-light">written down.</span>
          </h1>
          <p className="mt-6 md:mt-10 italic-accent text-lg md:text-2xl text-bone-300 max-w-3xl leading-snug">
            A contract is a small shared memory. This one is written in our voice
            so it can be read in our voice, and remembered in the shape that we
            meant it.
          </p>
        </div>
      </section>

      {/* Manifesto body. 8 Roman-numeral sections */}
      <section className="relative py-10 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            {/* Sticky sidebar. Section index */}
            <aside className="md:col-span-3">
              <div className="md:sticky md:top-28">
                <p className="label-mono text-bone-100/40 mb-5">Articles</p>
                <nav className="space-y-2.5 font-mono text-[11px] tracking-[0.18em] uppercase">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.roman}
                      href={`#article-${s.roman}`}
                      {...hover}
                      className="block text-bone-100/60 hover:text-signal transition-colors truncate"
                    >
                      <span className="text-signal mr-3">{s.roman}.</span>
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Articles */}
            <div className="md:col-span-9 space-y-16 md:space-y-24">
              {SECTIONS.map((s, i) => (
                <motion.article
                  key={s.roman}
                  id={`article-${s.roman}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-mt-28"
                >
                  <div className="flex items-baseline gap-4 mb-5 md:mb-7">
                    <span
                      className="engraved-numeral italic-accent text-signal"
                      style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                      {s.roman}
                    </span>
                    <span className="h-px flex-1 bg-maroon-400/25" aria-hidden />
                  </div>
                  <h2 className="display-lg text-bone-100 max-w-[22ch] mb-6 md:mb-8">{s.title}</h2>
                  <div className="space-y-5 md:space-y-6 text-bone-100/85 text-base md:text-lg leading-[1.72] max-w-prose">
                    {s.body.map((p, j) => (
                      <p key={j}>
                        {j === 0 && i === 0 ? (
                          <>
                            <span className="float-left font-display text-[3.5rem] md:text-[5rem] leading-[0.82] text-signal mr-3 md:mr-4 mt-1 tracking-tight">
                              {p.charAt(0)}
                            </span>
                            {p.slice(1)}
                          </>
                        ) : (
                          p
                        )}
                      </p>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing pull-quote + link back */}
      <section className="relative py-20 md:py-32 border-t border-white/5 bg-maroon-950/40">
        <div className="max-w-[900px] mx-auto px-5 md:px-10 text-center">
          <p
            className="italic-accent text-bone-100 leading-snug"
            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)" }}
          >
            "A good contract is one you never need to reread.
            <br />
            <span className="text-signal">We try to write good contracts.</span>"
          </p>
          <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" {...hover} className="btn btn-primary">
              Talk terms
            </Link>
            <Link to="/" {...hover} className="btn btn-ghost">
              Return home
            </Link>
          </div>
          <p className="mt-10 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40">
            Last edited: 24 April 2026 · v1.0
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
