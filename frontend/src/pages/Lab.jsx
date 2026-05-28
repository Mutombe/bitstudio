import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";

import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import Ticker from "../components/Ticker.jsx";
import SEO, { breadcrumbJsonLd, articleJsonLd } from "../components/SEO.jsx";
import PhosphorIcon from "../components/PhosphorIcon.jsx";
import WaveBreak from "../components/WaveBreak.jsx";

/*
 * Lab. The studio's visible R&D arm.
 *
 * Three sections:
 *  1. Surfaces. The platforms we build for ahead of mainstream demand
 *  2. Experiments. The prototypes we are willing to defend in public
 *  3. Open problems. The things we are publicly noodling on
 *
 * Voice: institutional, never apologetic. The room we work in,
 * shown from inside. See memory bitstudio-voice-institutional.
 */

const SURFACES = [
  {
    name: "Meta Ray-Ban Display",
    icon: "Eyeglasses",
    inputs: "Gaze · Voice · Micro-gesture",
    output: "Lens overlay · Bone-conduction audio",
    note:
      "The first consumer surface where attention is the unit of cost. We build companion apps that respect the gram and the second.",
  },
  {
    name: "Apple Vision Pro",
    icon: "Cube",
    inputs: "Eye-tracking · Hands · Voice",
    output: "Full 6DOF spatial",
    note:
      "The high-end of spatial computing. We build the editorial layer. Documents, archives, dashboards. For the firms who will fund the next decade.",
  },
  {
    name: "Meta Quest",
    icon: "Sparkle",
    inputs: "Controllers · Hand-tracking",
    output: "6DOF spatial",
    note:
      "Where developer access is widest and the WebXR pipeline is most mature. Our prototyping workshop.",
  },
  {
    name: "Wear OS",
    icon: "DeviceMobile",
    inputs: "Wrist tap · Glance",
    output: "1.4-inch display · Haptic",
    note:
      "The companion surface. Every glasses-class device needs a wrist. We build the bridges that make the watch the controller.",
  },
  {
    name: "Voice & ambient AI",
    icon: "Microphone",
    inputs: "Voice · Context · Sensors",
    output: "Audio · Push · Side-channel",
    note:
      "The interface without a screen. On-device LLM ranking that respects the battery, the privacy, and the silence.",
  },
];

// Open briefs we have specified, costed, and are ready to build for a
// first commission. Each is a position, not a portfolio entry. And
// the page says so plainly. The artifact here is the brief itself,
// not a fabricated screenshot.
const BRIEFS = [
  {
    slug: "ray-ban-display-reader",
    name: "Ray-Ban Display reading companion",
    surface: "Meta Ray-Ban Display",
    weeks: "6 weeks",
    slot: "Q3 2026 · open",
    status: "OPEN",
    statusTone: "signal",
    brief:
      "Long-form articles streamed to the lens sentence-by-sentence. An on-device LLM ranks which paragraphs deserve eye time and which can be skimmed at glance speed. The thesis: a New Yorker piece read in twenty minutes while walking. Brief is 12 pages, architecture diagrammed, latency budget set.",
    stack: ["Meta Spatial SDK", "On-device LLM (3B)", "WebXR fallback"],
    deliverables: ["Lens app", "Pairing companion", "Reader ranking model"],
  },
  {
    slug: "vision-pro-archive",
    name: "Vision Pro spatial archive",
    surface: "Apple Vision Pro",
    weeks: "8 weeks",
    slot: "Q4 2026 · open",
    status: "OPEN",
    statusTone: "signal",
    brief:
      "A three-dimensional archive browser. Documents float in the room, sorted by recency on one axis and by attention on another. Pick one up, set it down. The shelf remembers. Brief targets law firms, family offices, and architecture practices first.",
    stack: ["Vision OS", "SwiftUI", "RealityKit", "USDZ"],
    deliverables: ["visionOS app", "Document spatialiser", "Attention model"],
  },
  {
    slug: "wear-os-glasses-control",
    name: "Wear OS glasses-control",
    surface: "Wear OS · Ray-Ban Display",
    weeks: "4 weeks",
    slot: "Q3 2026 · open",
    status: "OPEN",
    statusTone: "signal",
    brief:
      "The wrist as a controller for the lens. Three taps to dismiss a notification on the glasses, a long-press to mark a paragraph for later. The watch becomes a quiet way to drive the device on your face. Pairs cleanly with the reader above.",
    stack: ["Wear OS", "Jetpack Compose", "Companion API"],
    deliverables: ["Watch app", "Glasses companion shim", "Gesture spec"],
  },
  {
    slug: "agentic-procurement-pilot",
    name: "Agentic procurement",
    surface: "Browser · Wear",
    weeks: "2 weeks",
    slot: "Ongoing · commissioned",
    status: "IN USE",
    statusTone: "bone",
    brief:
      "An LLM agent that monitors public RFPs across three jurisdictions, drafts a first response in your voice, and posts it for human approval. The only entry on this page we have actually built. For ourselves, and the one we are most ready to productise.",
    stack: ["Claude API", "Postgres", "Cron", "WhatsApp Business"],
    deliverables: ["Crawler", "Drafting agent", "Approval inbox"],
  },
];

// Field notes. The studio's public reading log across every surface
// we build for. This is preparation in place of fabricated portfolios.
// The breadth is the point: an infrastructure builder reads widely.
const FIELD_NOTES = [
  {
    surface: "Meta Ray-Ban Display",
    items: [
      "Meta Spatial SDK · official docs + dev forum threads",
      "Meta Connect 2024 · keynote + Display deep-dives",
      "Ray-Ban Display whitepaper · public optical-spec breakdown",
      "On-device LLM inference · LLaMA 3B / Phi-3 deployment notes",
    ],
  },
  {
    surface: "Apple Vision Pro",
    items: [
      "Apple Vision OS Human Interface Guidelines · re-read quarterly",
      "WWDC 2024 · \"Design for spatial computing\" · \"Bring your iPhone app to visionOS\" · \"Render advanced spatial environments\"",
      "RealityKit + USDZ reference · pipeline benchmarks",
      "SwiftUI for spatial · gesture, eye, and depth conventions",
    ],
  },
  {
    surface: "Meta Quest / WebXR",
    items: [
      "Three.js + React Three Fiber · production-grade XR patterns",
      "OpenXR spec · cross-platform input mapping",
      "Quest 3 hand-tracking reference · pinch, point, grab",
    ],
  },
  {
    surface: "Web applications · 2026 frontier",
    items: [
      "React 19 + Vite 7 + Tailwind v4 · production patterns from 130+ shipped sites in our ledger",
      "TanStack Router + Query · async-state architecture and the boundary between routing and data",
      "React Server Components · when to use, when to refuse, what they replace",
      "Web Vitals 2025 · INP, CLS, LCP. The new triad and what each actually measures",
      "Edge runtimes · Vercel Edge, Cloudflare Workers, Deno Deploy. Placement decisions for latency",
      "Better Auth / Clerk / Lucia · modern session design after the JWT decade",
    ],
  },
  {
    surface: "AI agents · MCP · multi-agent",
    items: [
      "Anthropic Model Context Protocol (MCP, Nov 2024) · official spec. Tools, resources, prompts, sampling",
      "MCP server design · typed schemas, idempotency, paginated resources, capability negotiation",
      "Claude Code SDK + agent dispatch · patterns from running 30+ design-expert agents in parallel",
      "Tool use design · parallel execution, error envelopes, retry semantics, partial-failure replay",
      "Multi-agent orchestration · Anthropic patterns, LangGraph, AutoGen, CrewAI. When each is right",
      "Agent memory · file-backed persistent recall, semantic dedup, hash-based collision",
      "Eval discipline · golden-path regression, hallucination probes, prompt-cache hit-rate budgets",
      "Open weights · LLaMA 3.3, Qwen 2.5, Phi-3. Quantisation cost and battery profile",
    ],
  },
  {
    surface: "WhatsApp infrastructure",
    items: [
      "Meta WhatsApp Cloud API · webhooks, template message governance, the 24-hour session window",
      "WATI / Vonage / Twilio · integrator trade-offs and ceiling effects (trial-end discovered the hard way)",
      "whatsmeow (Go library) · direct-device pairing via 8-character phone code. Patched in our toolkit",
      "WhatsApp Flows · native multi-step forms, server-side data fetching, ack semantics",
      "Multi-tenancy + number rotation · soft-ban detection, marketing-conversation rate-limit, opt-in flows",
      "Conversational commerce · catalogues, carts, payments, business profile verification",
    ],
  },
  {
    surface: "Cloud, data, infrastructure",
    items: [
      "Render · Vercel · Fly.io · Railway · Cloudflare. Placement decisions and the audit trail",
      "Postgres 16 + pgvector + RLS · the modern stack's single source of truth",
      "Neon · Turso · PlanetScale · edge-data and the read-replica latency question",
      "Observability · Grafana, Sentry, OpenTelemetry. The three rooms a system must live in",
      "Migration patterns · dual-write, shadow traffic, expand-contract, blue-green",
      "Backups + DR · point-in-time recovery, cross-region replication, restoration drills",
    ],
  },
  {
    surface: "Cross-platform research",
    items: [
      "CHI 2024 · Gaze-and-Voice Multimodal Input papers (3)",
      "NeurIPS 2024 · On-device LLM optimisation track",
      "Public patents · Meta US20240XXXXX (display companion), Apple US2024XXXX (gaze-anchored UI)",
      "Smart-glasses ethics literature · attention economics, ambient capture, peripheral suggestion",
    ],
  },
];

// Workshop output. Internal tools the studio actually built and
// runs every week. These are not specifications; these are receipts.
// They are how an institution proves it is what it says it is.
const WORKSHOP = [
  {
    name: "Multi-agent design dispatch",
    note:
      "The pattern we built to ship 33 bespoke React/Vite websites in parallel during a single fortnight. Each agent receives a per-business brief, scaffolds a fresh project, hand-builds 8-13 pages, audits its own Phosphor imports, verifies imagery context, and reports back. Powers the entire Agri Show campaign on /work.",
    tags: ["Claude Code SDK", "Vite", "React 19"],
  },
  {
    name: "Agentic outreach orchestrator",
    note:
      "Personalised email + WhatsApp send pipeline with dry-run gate, IMAP-append for sent-folder fidelity, random stagger, per-recipient hook personalisation, and idempotency on top of an append-only JSON log. The Agri Show 30-email + 18-WhatsApp burst moved through it without an Excel sheet in sight.",
    tags: ["Gmail SMTP", "Hostinger IMAP", "Python"],
  },
  {
    name: "whatsapp-cli (patched fork)",
    note:
      "A fork of whatsmeow's CLI extended with 8-character phone-number device pairing and a structured JSON-everywhere output mode. The studio uses it for direct-device WhatsApp from the office number when a third-party integrator is the wrong tool. Open to client commission.",
    tags: ["Go", "whatsmeow", "WhatsApp"],
  },
  {
    name: "Prerender + sitemap pipeline",
    note:
      "Custom Puppeteer postbuild crawler that visits every SPA route and writes static HTML. Powers SEO for this site's 174 routes. Pairs with a sitemap generator that reads slugs straight from source files (no build-time config drift). Both ship as a single 'npm run build:full' step.",
    tags: ["Puppeteer", "Vite", "Node"],
  },
  {
    name: "Aesthetic-preset engine",
    note:
      "Hash-based design-token generator that maps one brand brief to a unique aesthetic. Palette, typography pairing, hero variant, signature gesture. Across the 130-site portfolio without two ever looking the same. Eight aesthetic archetypes, hand-mapped by industry then varied per business.",
    tags: ["React 19", "Tailwind v4", "Aesthetic taxonomy"],
  },
  {
    name: "Persistent memory file-system",
    note:
      "How we run multi-week campaigns without losing context between sessions. Append-only file-backed memory keyed by topic, with semantic recall, hash-dedup, and explicit overwrite-on-correction. Operates the studio's own agent loop and is being abstracted into an MCP server.",
    tags: ["MCP", "Claude", "JSON-LD"],
  },
];

const OPEN_PROBLEMS = [
  "On-device LLM ranking that doesn't burn the battery before lunch.",
  "Privacy-preserving capture on always-on glasses. What stays on-device, what leaves, who is told.",
  "Calibrating peripheral attention as a UI input. The difference between glance and stare.",
  "The grammar of micro-gestures across surfaces. What the same tap means on Vision Pro, on Quest, on Ray-Ban.",
  "Documenting a system fast enough that a junior engineer can ship the second version without consulting the first.",
  "The ethics of glasses-class commerce. When a brand can suggest a product into your peripheral vision, what should it not do.",
];

export default function Lab() {
  return (
    <PageTransition>
      <SEO
        title="Lab · Spatial, agents, infrastructure"
        description="Where the studio builds for the surfaces customers will be on next. Meta Ray-Ban Display, Apple Vision Pro, Meta Quest, Wear OS, voice and ambient AI. Open briefs for first commission. A public reading log across spatial, web, AI agents and MCP, WhatsApp infrastructure, and cloud. Six internal tools in production. Six open problems we are publicly noodling on."
        path="/lab"
        keywords={[
          "Meta Ray-Ban Display app", "Apple Vision Pro developer",
          "Meta Quest WebXR", "Wear OS companion app",
          "spatial computing studio", "Vision OS development",
          "WebXR React Three Fiber", "Meta Spatial SDK",
          "on-device LLM", "smart glasses development",
          "Anthropic MCP", "Model Context Protocol", "Claude agent",
          "multi-agent orchestration", "agentic web", "MCP server",
          "WhatsApp Cloud API", "whatsmeow", "WATI integration",
          "WhatsApp Flows", "conversational AI",
          "R&D studio", "frontier platform studio", "boutique software lab",
        ]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Lab", path: "/lab" },
          ]),
          articleJsonLd({
            headline: "Lab. What we are building before clients ask for it.",
            description:
              "Five surfaces, four open briefs, a public reading log across eight domains, six internal tools in production, six open problems. The institutional R&D arm.",
            url: "https://bitstudio.co.zw/lab",
            image: "https://bitstudio.co.zw/logo.png",
            datePublished: "2026-05-28",
          }),
          // CollectionPage with the five surfaces as ItemList. Lets Google
          // surface the page on queries for any of the named surfaces.
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Lab. Surfaces, briefs, field notes",
            url: "https://bitstudio.co.zw/lab",
            mainEntity: {
              "@type": "ItemList",
              name: "Surfaces we build for",
              itemListElement: SURFACES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                description: s.note,
              })),
            },
          },
        ]}
      />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[8%] left-[-10%] w-[42vw] h-[42vw] rounded-full bg-signal/[0.05] blur-[180px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[44vw] h-[44vw] rounded-full bg-maroon-600/20 blur-[180px]" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-10">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>§ Lab</span>
            <span className="text-bone-100/30">/</span>
            <span>R&amp;D arm</span>
            <span className="text-bone-100/30">/</span>
            <span>Updated quarterly</span>
          </div>

          <h1 className="display-massive text-bone-100 leading-[0.82]">
            What we are building
            <br />
            <span className="italic-accent text-maroon-400 font-light">
              before clients ask for it.
            </span>
          </h1>

          <p className="mt-10 max-w-3xl text-lg text-bone-100/75 leading-relaxed">
            The lab is the part of the studio that buys its own time. A
            specification, a reading list, an open invitation. These
            are the artifacts. We are honest about which surfaces we
            have shipped and which we are ready to ship for the first
            time. The currency of an institution is its preparation,
            not its pretence.
          </p>

          {/* Honesty banner. The page declares its own evidence policy
              before the visitor reads further. */}
          <div className="mt-10 max-w-3xl border-y border-white/10 py-5 flex flex-wrap items-start gap-4 md:gap-8">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal shrink-0">
              On evidence
            </div>
            <p className="text-bone-100/65 text-sm md:text-base leading-relaxed flex-1 min-w-[260px]">
              We have not yet shipped client work on Ray-Ban Display,
              Vision Pro, Quest, or Wear OS. What we have are{" "}
              <span className="text-bone-100">written specifications</span>,
              a{" "}
              <span className="text-bone-100">public reading log</span>,
              and{" "}
              <span className="text-bone-100">slots reserved</span> for
              first commissions. The page below is structured around
              that distinction.
            </p>
          </div>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── SURFACES ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 01" title="Surfaces" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                Five surfaces
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  your customers will be on next.
                </span>
              </h2>
              <p className="mt-6 text-bone-100/70 max-w-2xl leading-relaxed">
                Every few years a new surface joins the room a business
                must consider. We build for them ahead of demand, so when
                a client decides to invest, the team has already shipped
                something.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {SURFACES.map((s, i) => (
              <motion.article
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 md:p-7 rounded-sm border border-white/8 bg-white/[0.015] hover:border-signal/25 transition-colors"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-signal/10 border border-signal/30">
                    <PhosphorIcon name={s.icon} size={18} weight="duotone" className="text-signal" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-bone-100 leading-tight mb-4">
                  {s.name}
                </h3>
                <dl className="space-y-2 mb-5 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/55">
                  <div className="flex gap-3">
                    <dt className="text-bone-100/40 shrink-0 w-14">Inputs</dt>
                    <dd className="text-bone-100/75 normal-case tracking-normal">{s.inputs}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-bone-100/40 shrink-0 w-14">Output</dt>
                    <dd className="text-bone-100/75 normal-case tracking-normal">{s.output}</dd>
                  </div>
                </dl>
                <p className="text-sm md:text-base text-bone-100/70 leading-relaxed">
                  {s.note}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── BRIEFS IN COMMISSION ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 02" title="Briefs in commission" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                Specifications written.
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  Slots held for first commission.
                </span>
              </h2>
              <p className="mt-6 text-bone-100/70 max-w-2xl leading-relaxed">
                Each brief is a fully specified 4-8 week build with
                architecture, stack, deliverables, and a price set
                privately with the first commissioning client. The
                first commission on each surface receives a 30%
                pilot discount, and the right to be named.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {BRIEFS.map((b, i) => (
              <motion.article
                key={b.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-7 md:p-8 rounded-sm border border-white/10 bg-white/[0.02] hover:border-signal/30 transition-colors"
              >
                <header className="flex items-start justify-between gap-4 mb-5">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55">
                    {b.surface}
                  </span>
                  <span
                    className={`shrink-0 inline-flex items-center px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] uppercase rounded-full ${
                      b.statusTone === "signal"
                        ? "bg-signal/10 text-signal border border-signal/35"
                        : "bg-white/5 text-bone-100/65 border border-white/15"
                    }`}
                  >
                    {b.status}
                  </span>
                </header>
                <h3 className="font-display text-2xl md:text-3xl text-bone-100 leading-tight mb-4">
                  {b.name}
                </h3>
                <p className="text-bone-100/75 leading-relaxed mb-6">
                  {b.brief}
                </p>

                {/* Pilot details. What the first commission gets */}
                <dl className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/55 border-y border-white/8 py-4">
                  <div>
                    <dt className="text-bone-100/40">Timeline</dt>
                    <dd className="mt-1 text-bone-100/85 normal-case tracking-normal">{b.weeks}</dd>
                  </div>
                  <div>
                    <dt className="text-bone-100/40">Slot</dt>
                    <dd className="mt-1 text-bone-100/85 normal-case tracking-normal">{b.slot}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-bone-100/40">Deliverables</dt>
                    <dd className="mt-1 text-bone-100/85 normal-case tracking-normal">
                      {b.deliverables.join(" · ")}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-bone-100/55 font-mono text-[10px] tracking-[0.18em] uppercase">
                  <span className="text-bone-100/40">Stack</span>
                  {b.stack.map((s) => (
                    <span key={s} className="normal-case tracking-normal">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── FIELD NOTES. What we have studied ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 03" title="Field notes" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                What we have read,
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  studied, and re-read.
                </span>
              </h2>
              <p className="mt-6 text-bone-100/70 max-w-2xl leading-relaxed">
                Preparation is the visible currency of an institution.
                Below is the public reading log we keep on each
                surface. Official documentation, conference sessions,
                research papers, and granted patents. None of it is
                shipped client work. All of it is real preparation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {FIELD_NOTES.map((fn, i) => (
              <motion.div
                key={fn.surface}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="border-l-2 border-signal/30 pl-6"
              >
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-4">
                  {fn.surface}
                </p>
                <ul className="space-y-3">
                  {fn.items.map((it, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-bone-100/80 text-sm md:text-base leading-relaxed"
                    >
                      <span className="text-bone-100/30 font-mono text-[10px] tracking-[0.22em] pt-1 shrink-0">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── OPEN PROBLEMS ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 05" title="Open problems" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                The questions we are
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  publicly noodling on.
                </span>
              </h2>
              <p className="mt-6 text-bone-100/70 max-w-2xl leading-relaxed">
                Problems we have not yet solved, listed so that the
                solving is in public. If one of these is the question
                your business is also asking, we should probably talk.
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl counter-reset">
            {OPEN_PROBLEMS.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12"
              >
                <span className="absolute left-0 top-0 font-mono text-[10px] tracking-[0.22em] uppercase text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg md:text-xl text-bone-100/85 leading-snug font-display">
                  {p}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── WORKSHOP OUTPUT. Real internal tools we run ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 04" title="Workshop output" />
            </div>
            <div className="col-span-12 md:col-span-9 max-w-3xl">
              <h2 className="display-xl text-bone-100 leading-[1.02]">
                What we have actually built
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  and run, every week.
                </span>
              </h2>
              <p className="mt-6 text-bone-100/70 max-w-2xl leading-relaxed">
                Internal tools the studio depends on. Each is real, each
                operates in production for our own work, and each is
                available to be productised for a client commission. This
                is the infrastructure builder's receipt.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {WORKSHOP.map((w, i) => (
              <motion.article
                key={w.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 md:p-7 rounded-sm border border-white/8 bg-white/[0.018] hover:border-signal/25 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal">
                    Tool {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/40">
                    In production
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-bone-100 leading-tight mb-4">
                  {w.name}
                </h3>
                <p className="text-bone-100/75 leading-relaxed text-sm md:text-base mb-5">
                  {w.note}
                </p>
                <div className="flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2 py-0.5 rounded-full border border-white/10 font-mono text-[9px] tracking-[0.18em] uppercase text-bone-100/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 max-w-4xl">
          <div className="border-y border-white/10 py-12 md:py-16">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-4">
              § Lab · invitation
            </p>
            <h2 className="display-xl text-bone-100 leading-[1.02] mb-6">
              An experiment you think
              <br />
              <span className="italic-accent text-bone-300 font-light">
                we should be running?
              </span>
            </h2>
            <p className="text-bone-100/75 max-w-2xl mb-10 leading-relaxed">
              The lab takes commissions from clients who want a question
              answered before they fund a programme. Three slots a quarter.
              Any continent.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn btn-primary">
                Pitch the lab
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
              <Link to="/services/spatial-wearable" className="btn btn-ghost">
                Service 09 · Spatial &amp; wearable
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Ticker
        items={[
          "§ Lab",
          "Surfaces · Experiments · Open problems",
          "Updated quarterly",
          "Three slots a quarter",
          "Any continent",
          "MMXXX · Updated quarterly",
        ]}
      />
    </PageTransition>
  );
}
