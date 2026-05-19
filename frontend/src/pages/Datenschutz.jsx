import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";

/**
 * Datenschutzerklärung — privacy policy under DSGVO (German GDPR).
 *
 * Bit Studio operates from Zimbabwe but targets EU users with this site,
 * which means GDPR applies extraterritorially (Art. 3 Abs. 2 DSGVO). This
 * page is the user-facing disclosure required by Art. 13 / Art. 14 DSGVO.
 *
 * Two known DSGVO grey zones live on the site today:
 *   1) Google Fonts is loaded dynamically from googleapis.com — the
 *      2022 LG München ruling (3 O 17493/20) makes that a violation
 *      without consent. We disclose it here and plan to self-host.
 *   2) Render Hosting (USA) processes server-side logs incl. IP. The
 *      provider is GDPR-compliant via SCC; we mention them.
 */

const PRINCIPLES = [
  {
    title: "Verantwortlicher",
    body: `Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:

Bit Studio (Pvt) Ltd
Harare, Simbabwe
E-Mail: admin@bitstudio.co.zw
Telefon: +263 78 594 8128

Bit Studio ist außerhalb der Europäischen Union ansässig, behandelt personen­bezogene Daten von Nutzerinnen und Nutzern aus der EU jedoch nach den Maßstäben der DSGVO (Art. 3 Abs. 2 DSGVO).`,
  },
  {
    title: "Erhebung beim Aufruf der Website",
    body: `Beim Besuch unserer Website werden durch unseren Hosting-Anbieter (Render Inc., USA) automatisch folgende Daten verarbeitet und in einem Logfile gespeichert:

· IP-Adresse des anfragenden Geräts
· Datum und Uhrzeit des Zugriffs
· Aufgerufene Seite und übertragene Datenmenge
· Browser-Typ und -Version, Betriebssystem
· Referrer-URL (vorher besuchte Seite)

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung der Website und ihrer Sicherheit). Die Daten werden nach maximal 30 Tagen gelöscht. Render verarbeitet die Daten in den USA unter den EU-Standardvertragsklauseln gemäß Art. 46 DSGVO.`,
  },
  {
    title: "Kontaktaufnahme",
    body: `Bei Kontaktaufnahme per E-Mail, WhatsApp oder über das Formular auf /contact werden die übermittelten Angaben (Name, E-Mail, Projektbeschreibung, ggf. weitere freiwillig gemachte Angaben) zur Bearbeitung der Anfrage verarbeitet. Das Formular versendet Ihre Eingaben über den von Ihnen gewählten Kanal (WhatsApp oder E-Mail-Client) — wir speichern keine Daten zwischen.

Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Die Daten werden bis zur abschließenden Bearbeitung Ihrer Anfrage aufbewahrt, längstens jedoch sechs Monate nach dem letzten Kontakt.`,
  },
  {
    title: "Google Fonts",
    body: `Wir binden Schriften (Syne, Space Grotesk, Fraunces, JetBrains Mono) über fonts.googleapis.com und fonts.gstatic.com ein. Beim Aufruf der Website wird Ihre IP-Adresse an Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, übermittelt.

Wir sind uns der Rechtslage zu dynamisch eingebundenen Google Fonts bewusst (LG München I, Urteil vom 20.01.2022, Az. 3 O 17493/20) und arbeiten an einer Umstellung auf lokal gehostete Schriften. Bis dahin können Sie das Laden der Schriften über Browser-Erweiterungen oder den Privatmodus unterbinden.

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer konsistenten typografischen Darstellung).`,
  },
  {
    title: "Cookies & lokale Speicherung",
    body: `Diese Website setzt keine Tracking-Cookies. Browser-seitig wird lediglich vorübergehend Sitzungs- und Routing-Information durch die React-Single-Page-Application abgelegt; diese Daten verlassen Ihr Gerät nicht und werden mit Schließen des Tabs gelöscht. Es findet keine seitenübergreifende Analyse statt.`,
  },
  {
    title: "Hosting & Drittanbieter",
    body: `Die Website wird auf Render Inc., 525 Brannan St., San Francisco, CA 94107, USA, gehostet. Render bietet einen aktuellen Auftragsverarbeitungsvertrag (AVV) und unterzeichnet die EU-Standardvertragsklauseln; das Datenschutzniveau entspricht den Anforderungen der DSGVO.

Außer den oben genannten Diensten (Render-Hosting, Google Fonts) übermitteln wir keine Daten an externe Anbieter.`,
  },
  {
    title: "Ihre Rechte",
    body: `Sie haben jederzeit das Recht auf:

· Auskunft (Art. 15 DSGVO) — welche Daten wir zu Ihrer Person verarbeiten
· Berichtigung (Art. 16) — falscher oder unvollständiger Daten
· Löschung (Art. 17) — soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen
· Einschränkung der Verarbeitung (Art. 18)
· Datenübertragbarkeit (Art. 20)
· Widerspruch (Art. 21) — gegen Verarbeitungen, die auf berechtigtem Interesse beruhen
· Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77)

Wenden Sie sich für die Ausübung dieser Rechte an admin@bitstudio.co.zw. Wir antworten innerhalb der gesetzlichen Frist von einem Monat.`,
  },
  {
    title: "Beschwerderecht",
    body: `Ungeachtet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs haben Sie das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes (Art. 77 DSGVO).

In Deutschland sind die Landesdatenschutzbeauftragten zuständig; eine Liste finden Sie unter bfdi.bund.de.`,
  },
  {
    title: "Änderungen dieser Erklärung",
    body: `Wir behalten uns vor, diese Datenschutzerklärung anzupassen, sofern sich Rechtslage oder unsere Praxis verändert. Die jeweils aktuelle Fassung ist unter bitstudio.co.zw/datenschutz abrufbar. Stand: Mai 2026.`,
  },
];

export default function Datenschutz() {
  const hover = useCursorHover("hover", "");

  return (
    <PageTransition>
      <SEO
        title="Datenschutzerklärung"
        description="Informationen zur Verarbeitung personenbezogener Daten auf bitstudio.co.zw nach Art. 13 / 14 DSGVO. Hosting, Schriften, Kontaktformular, Ihre Rechte."
        path="/datenschutz"
        keywords={["Datenschutz", "DSGVO", "GDPR", "Bit Studio", "Privacy Policy"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Datenschutz", path: "/datenschutz" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-10 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-maroon-700/25 blur-[180px]" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="pb-5 md:pb-6 mb-8 md:mb-10 border-b border-white/5">
            <div className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-bone-100/60 flex-wrap">
              <Link to="/" {...hover} className="hover-line">Index</Link>
              <span className="text-bone-100/30">/</span>
              <span className="text-signal">Datenschutz</span>
            </div>
          </div>

          <SectionLabel chapter="§ DSGVO" title="Datenschutzerklärung" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 display-massive text-bone-100 leading-[0.85]"
          >
            Datenschutz.
          </motion.h1>
          <p className="mt-8 max-w-2xl text-bone-100/75 text-base md:text-lg leading-relaxed">
            Wir verarbeiten so wenig wie möglich. Was wir verarbeiten, steht hier — klar,
            vollständig, und ohne juristisches Versteckspiel.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-14 md:space-y-20">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: Math.min(i * 0.03, 0.2),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-white/10 pt-10 first:border-t-0 first:pt-0"
            >
              <h2 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.1] mb-6">
                {p.title}
              </h2>
              <p className="text-bone-100/80 leading-relaxed max-w-3xl whitespace-pre-line">
                {p.body}
              </p>
            </motion.article>
          ))}

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 text-bone-100/55 text-sm">
            <span>Siehe auch:</span>
            <Link to="/impressum" {...hover} className="hover-line text-signal">Impressum</Link>
            <span>·</span>
            <Link to="/terms" {...hover} className="hover-line">Terms of engagement</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
