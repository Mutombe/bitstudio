import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import PageTransition from "../../components/PageTransition.jsx";
import SectionLabel from "../../components/SectionLabel.jsx";
import WireframeOverlay from "../../components/WireframeOverlay.jsx";
import MeshField from "../../components/MeshField.jsx";
import Ticker from "../../components/Ticker.jsx";
import { AESTHETIC_LIST } from "../../data/aesthetics.js";
import { useCursorHover } from "../../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd, articleJsonLd } from "../../components/SEO.jsx";

/**
 * /de/handwerk. German edition of /craft.
 *
 * The Musashi material translates well into German. The Werkbund / Bauhaus
 * tradition already speaks this language (Sorgfalt, Werkkunst, Lehre).
 * We keep the kanji 道 as the visual anchor. Japan and Germany have a
 * long, mutual respect for each other's craft cultures.
 */

const RINGE = [
  {
    kanji: "地",
    name: "Erde",
    practice: "Boden",
    body:
      "Die Grundlagen verfallen nie. Schrift, Farbe, Raster, Hierarchie, das langsame Handwerk, eine einzige Schaltfläche richtig zu machen. Wir üben das Kleine, bis es uns keine Aufmerksamkeit mehr kostet. Eine Website ruht auf dem, was wir wussten, bevor der Kunde anrief.",
    pull:
      "Ohne den Boden haben die anderen Ringe nichts, worauf sie stehen können.",
  },
  {
    kanji: "水",
    name: "Wasser",
    practice: "Fluss",
    body:
      "Wasser nimmt die Form seines Gefäßes an. Unsere Arbeit bewegt sich durch ein Projekt. Zuhören, entwerfen, zurückkehren. Und wir halten keine Haltung länger, als das Projekt sie braucht. Eine Korrektur ist keine Niederlage. Ein Verworfenes ist kein Verlust. Die Form ist das Gespräch zwischen Briefing und Seite.",
    pull:
      "Die Arbeit biegt sich. Der Maßstab nicht.",
  },
  {
    kanji: "火",
    name: "Feuer",
    practice: "Kraft",
    body:
      "Manche Festlegungen können nicht weich sein. Der Launch-Termin. Die Bank-taugliche Verschlüsselung. Die Linie, die zu einer schönen, aber falschen Idee „Nein“ sagt. Feuer ist der Ort, an dem das Handwerk sich weigert, höflich zu sein. Wir erheben nicht die Stimme; wir verstärken den Griff.",
    pull:
      "Manche Entscheidungen werden einmal getroffen. Dann halten sie.",
  },
  {
    kanji: "風",
    name: "Wind",
    practice: "Luft",
    body:
      "Wisse, was die anderen Schulen tun. Lies ihre Seiten. Öffne ihre Inspektoren. Bemerke, wonach sie greifen. Und bemerke die Lücken in diesem Greifen. Werde dann nicht zu ihnen. Wind ist die Disziplin des Unterschieds, gehalten gegen die Disziplin des Studiums.",
    pull:
      "Studiere jedes Studio. Werde keines davon.",
  },
  {
    kanji: "空",
    name: "Leere",
    practice: "Quelle",
    body:
      "Das, worauf die Arbeit zeigt, ohne dass wir es ganz aussprechen können. Der Grund, weshalb eine Schrift richtig wirkt. Der Grund, weshalb eine Schaltfläche zurückdrückt. Die Leere ist das, was bleibt, nachdem Erde, Wasser, Feuer und Wind ihr Werk getan haben. Die unaussprechliche Richtigkeit, die ein Betrachter spürt, aber nicht verteidigen kann. Wir benennen sie nicht. Wir zielen auf sie.",
    pull:
      "Wir gestalten nicht. Wir erinnern uns, wie Schönheit war, bevor sie verhandelt wurde.",
  },
];

const DOKKODO = [
  { n: "I.",   text: "Nimm alles so an, wie es ist." },
  { n: "II.",  text: "Denke leicht von dir selbst und tief von der Welt." },
  { n: "III.", text: "Verlasse dich unter keinen Umständen auf einen halbherzigen Geist." },
  { n: "IV.",  text: "Habe in allen Dingen keine Vorlieben." },
  { n: "V.",   text: "Bereue nicht, was du getan hast." },
  { n: "VI.",  text: "Sei dein ganzes Leben lang von Begierde gelöst." },
  { n: "VII.", text: "Sammle keine Werkzeuge über das Nützliche hinaus." },
  { n: "VIII.",text: "Handle nicht nach gewohnten Überzeugungen." },
  { n: "IX.",  text: "Du darfst deinen Leib aufgeben. Deine Ehre musst du bewahren." },
  { n: "X.",   text: "Weiche niemals vom Weg ab." },
];

const AESTHETIC_LABEL_DE = {
  atelier: "Atelier",
  editorial: "Editorial",
  cinematic: "Cinematisch",
  brutalist: "Brutalistisch",
  heritage: "Heritage",
  manifesto: "Manifest",
  bento: "Bento",
  pastoral: "Pastoral",
};

const AESTHETIC_BRIEF_DE = {
  atelier:
    "Maßgefertigt. Signaturgeste. Das Stück, das nur für diesen einen Raum gemacht sein könnte.",
  editorial:
    "Magazinstimme. Bildgetrieben. Großzügige Typografie, die zwischen Absätzen den Atem anhält.",
  cinematic:
    "Dunkle Flächen, dramatisches Licht. Die Oberfläche als Eröffnungssequenz. Die Dinge kommen in Bewegung.",
  brutalist:
    "Strukturelle Ehrlichkeit. Das Raster bekannt, die Schrift unverkleidet, die Dekoration entfernt.",
  heritage:
    "Altes Papier, langsame Serifen, eine ruhige Hand. Gebaut, um älter zu wirken, als es ist. Und gut zu altern.",
  manifesto:
    "Typografische Erklärung. Die Arbeit ist die Aussage. Weiß­raum und ein Argument.",
  bento:
    "Modulare Komposition. Vieles, gut angeordnet. Die Seite als Galerie, nicht als Satz.",
  pastoral:
    "Erdtöne, fotografisch, unbeeilt. Weiche Kanten und die grünen Stellen der Palette.",
};

export default function CraftDE() {
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
        title="Handwerk · Der Weg"
        description="Wir haben das Machen von Miyamoto Musashi gelernt. Einem Schwertmeister, der vor vierhundert Jahren lebte. Erde, Wasser, Feuer, Wind, Leere. Die fünf Ringe unserer Praxis. Das Dokkōdō, zehn Vorsätze an der Studio-Wand."
        path="/de/handwerk"
        keywords={[
          "Musashi",
          "Buch der fünf Ringe",
          "Dokkōdō",
          "Handwerk",
          "Werkkunst",
          "Designphilosophie",
          "Bauhaus",
          "Bit Studio",
        ]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/de" },
            { name: "Handwerk", path: "/de/handwerk" },
          ]),
          articleJsonLd({
            headline: "Der Weg. Handwerk, nach Musashi",
            description:
              "Bit Studios Designphilosophie, organisiert nach den fünf Ringen aus Miyamoto Musashis Go Rin no Sho.",
            url: "https://bitstudio.co.zw/de/handwerk",
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
              Kapitel 06 · Der Weg
            </span>
            <span className="text-bone-100/30">/</span>
            <span>Erbe von Musashi, 1645</span>
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col gap-8"
          >
            <h1 className="display-hero text-bone-100 leading-[0.84] -ml-1 md:-ml-3">
              Der<br />
              <span className="italic-accent text-signal font-light">Weg.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-lg lg:text-[1.05rem] text-bone-100/85 leading-relaxed">
              Wir haben das Machen von einem Schwertmeister gelernt, der vor vier
              Jahrhunderten lebte. Sein Name war Miyamoto Musashi. Er focht
              sechzig Duelle und verlor keines davon. Am Ende seines Lebens zog
              er sich in eine Höhle zurück und schrieb ein Buch darüber, wie man
              lebt. Das{" "}
              <span className="italic-accent text-bone-100">Go Rin no Sho</span>,
              das Buch der fünf Ringe. Wir haben es mehr als einmal gelesen. Die
              folgenden Seiten erklären, was wir mitgenommen haben.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#ringe" {...hover} className="btn btn-primary">
                Die Ringe betreten
                <ArrowRightIcon size={14} weight="bold" />
              </a>
              <Link to="/work" {...hover} className="btn btn-ghost">
                Wie es sich in der Arbeit zeigt
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── II · WHO ──────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-ink)] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3 md:pt-3">
            <SectionLabel chapter="§ i" title="Wer" />
            <p className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
              宮本 武蔵
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
              Miyamoto Musashi
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
              1584. 1645
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
              Ein Schwertkämpfer, unbesiegt.<br />
              <span className="italic-accent text-bone-300">Ein Maler, nebenher.</span><br />
              <span className="text-maroon-400">Ein Lehrer, am Ende.</span>
            </motion.p>

            <p className="text-base md:text-lg leading-relaxed">
              Musashi wurde in eine kleine Samurai-Familie im Japan des späten
              sechzehnten Jahrhunderts hineingeboren. Sein erstes Duell focht er
              mit dreizehn, sein sechzigstes, bevor er dreißig wurde. Und ging
              aus jedem davon lebend hervor, während sein Gegner es nicht tat.
              Er malte auch. Er schnitzte buddhistische Statuen. Er schrieb
              Kalligraphie. Er zog sich in eine Höhle auf dem Berg Iwato zurück
              und verbrachte seine letzten Wochen damit, das Buch zu verfassen,
              das jeden ernsthaften Handwerker, der es seither gefunden hat,
              gegründet hat.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              Wir verkaufen keine Katanas. Wir verkaufen einen Weg. Der Weg ist
              in jeder Disziplin gleich, die lange dauert, um sie zu erlernen:
              die kleine Einheit meistern, die kleine Einheit wiederholen, bis
              sie dich keine Mühe mehr kostet, und erst dann beginnen, zu
              komponieren. Das Katana ist gemietet. Das Framework ist gemietet.
              Die Hand, die das eine oder das andere hält, ist der Teil, der
              sich verzinst.
            </p>

            <blockquote className="mt-6 border-l-2 border-signal/60 pl-6 italic-accent text-bone-100 max-w-2xl leading-snug" style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}>
              „Ein Ding zu kennen, heißt zehntausend Dinge zu kennen.<br />
              <span className="text-bone-100/60">Musashi, Buch der fünf Ringe, Schriftrolle der Erde"</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── III · DIE FÜNF RINGE ──────────────────────────────────── */}
      <section id="ringe" className="relative py-24 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <SectionLabel chapter="§ ii" title="Die fünf Ringe" />
            <h2 className="mt-6 display-xl text-bone-100 leading-[1.0]">
              Erde. Wasser. Feuer.<br />
              <span className="italic-accent text-bone-300 font-light">Wind. Leere.</span>
            </h2>
            <p className="mt-6 text-bone-100/70 max-w-xl">
              Er benannte fünf Ringe, in fünf Schriftrollen. Wir tragen sie als
              die Übungsringe des Studios. Die fünf Haltungen, die eine Arbeit
              durchlaufen muss, bevor wir sie ausliefern.
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">
            {RINGE.map((ring, i) => (
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
                        Ring {i + 1} von 5
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

      {/* ─── IV · DOKKŌDŌ ──────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-maroon-950 text-bone-100 border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <SectionLabel chapter="§ iii" title="Dokkōdō · Der Weg des einsamen Gehens" />
            <h2 className="mt-6 display-xl text-bone-100 leading-[1.0]">
              Einundzwanzig Vorsätze.<br />
              <span className="italic-accent text-bone-300 font-light">Wenige Tage vor seinem Tod geschrieben.</span>
            </h2>
            <p className="mt-6 text-bone-100/70 max-w-xl">
              Wir tragen zehn davon ins Studio. Sie hängen, mit Klebeband an
              einer Wand befestigt, in der Reihenfolge, in der er sie schrieb.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl">
            {DOKKODO.map((p) => (
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

      {/* ─── V · ACHT KARRIAGEN ─────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <SectionLabel chapter="§ iv" title="Wie es sich zeigt" />
            <h2 className="mt-6 display-xl text-bone-100 leading-[1.0]">
              Acht Wesen,<br />
              <span className="italic-accent text-bone-300 font-light">in denen ein Werk sich tragen kann.</span>
            </h2>
            <p className="mt-6 text-bone-100/70 max-w-xl">
              Branche ist, was der Kunde macht. <span className="italic-accent text-bone-100">Ästhetik ist, wie sich die Arbeit bewegt.</span> Wir sortieren unsere eigene Arbeit nach dem zweiten. Denn das ist die Frage, die wir beantworten.
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
                  {AESTHETIC_LABEL_DE[a.slug] || a.label}
                </h3>
                <p className="text-sm md:text-[15px] text-bone-100/75 leading-[1.6]">
                  {AESTHETIC_BRIEF_DE[a.slug] || a.brief}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-4">
            <Link to="/work" className="btn btn-primary">
              Die Arbeit, nach Wesen sortiert
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
            <Link to="/live" className="btn btn-ghost">
              On-air-Sendungen
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VI · CLOSING ──────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-contact">
        <MeshField tint="oxblood" intensity="high" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ v" title="Ein Wort zur Geduld" />
          <h2 className="mt-10 display-massive text-bone-100 leading-[0.85] max-w-5xl">
            Wenn Ihr Projekt<br />
            <span className="italic-accent text-signal font-light">solche Geduld verdient,</span><br />
            geben wir sie zurück.
          </h2>

          <p className="mt-10 max-w-2xl text-bone-100/75 text-lg">
            Wir pitchen nicht. Wir legen keine Mappe mit „Case Studies“ vor. Wir
            beantworten eine E-Mail, an einem Montag, mit einer Frage, die das
            Briefing ernst nimmt. Den Rest des Weges gehen wir gemeinsam.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link to="/de/kontakt" className="btn btn-primary">
              Sendung öffnen
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
          "Der Weg · 道",
          "Erde · Wasser · Feuer · Wind · Leere",
          "Nach Musashi, 1645",
          "MMXXX · Erde, Wasser, Feuer, Wind, Leere",
        ]}
      />
    </PageTransition>
  );
}
