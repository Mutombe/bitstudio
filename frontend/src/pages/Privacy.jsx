import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";

/**
 * /privacy. English-language Privacy Policy.
 *
 * Mirrors /datenschutz in content. Covers the same data flows under both
 * GDPR (for EU/UK visitors, extraterritorial via Art. 3.2) and US state
 * privacy laws (CCPA, CDPA, CTDPA, etc.).
 */

const PRINCIPLES = [
  {
    title: "Data controller",
    body: `The data controller, in the sense of the EU General Data Protection Regulation (GDPR) and equivalent US state privacy laws, is:

Bit Studio (Private) Limited
14 Ceres Road, Avondale, Harare
Zimbabwe
Registration: 42656A0252025 (CIPZ)
Email: admin@bitstudio.co.zw
Phone: +263 78 594 8128

Represented by Managing Director Simbarashe Mutombe (Principal Officer & Company Secretary), together with Director Newlife Marangwanda.

Bit Studio is incorporated outside the EU and the US. We treat personal data from EU users under GDPR (Art. 3.2) and from US users in line with applicable state privacy laws.`,
  },
  {
    title: "Data collected on page load",
    body: `When you visit this site, our hosting provider (Render Inc., USA) records the following in server logs, automatically:

· IP address of the requesting device
· Date and time of the request
· Page requested and bytes transferred
· Browser type, version, and operating system
· Referrer URL (the page you came from)

Legal basis under GDPR: Art. 6(1)(f). Legitimate interest in making the site available and secure. Logs are deleted after 30 days. Render processes data under the EU Standard Contractual Clauses pursuant to Art. 46 GDPR. For US visitors, this is "service provider" processing as defined in CCPA § 1798.140(ag).`,
  },
  {
    title: "Contact form & messages",
    body: `If you contact us by email, WhatsApp, or the form at /contact, the information you provide (name, email, project description, anything else you choose to share) is used solely to handle your enquiry. The form dispatches your inputs through your chosen channel (WhatsApp or your mail client). We don't store form data on a server.

Legal basis under GDPR: Art. 6(1)(b) (contract initiation) and Art. 6(1)(f) (legitimate interest). We retain enquiry data until the matter is closed, and at most six months after our last contact.`,
  },
  {
    title: "Fonts (self-hosted)",
    body: `We use the typefaces Syne, Space Grotesk, Fraunces, and JetBrains Mono. These are served exclusively from our own servers (self-hosted) and are not pulled dynamically from Google Fonts or any other third-party CDN.

Your IP address is therefore never sent to Google LLC or any other font provider on page load. This implementation aligns with the requirements set out in LG München I 3 O 17493/20 (20 Jan 2022).`,
  },
  {
    title: "Cookies & local storage",
    body: `This site sets no tracking cookies. The React single-page application stores brief session and routing information in your browser; this data never leaves your device and is cleared when you close the tab. There is no cross-page or cross-site analytics.`,
  },
  {
    title: "Hosting & third parties",
    body: `The site is hosted by Render Inc., 525 Brannan St., San Francisco, CA 94107, USA. Render offers a current Data Processing Agreement and signs the EU Standard Contractual Clauses; the level of data protection meets GDPR requirements.

Fonts, icons, images, and the application bundle are all served from the same domain (bitstudio.co.zw). There are no third-party CDN calls from this site. We use no tracking, analytics, or advertising services.`,
  },
  {
    title: "Your rights",
    body: `You may at any time exercise:

· Access (GDPR Art. 15). What data we hold about you
· Rectification (Art. 16). Correction of inaccurate or incomplete data
· Erasure (Art. 17). Deletion, subject to applicable retention obligations
· Restriction of processing (Art. 18)
· Data portability (Art. 20)
· Objection (Art. 21). To processing based on legitimate interest
· Lodge a complaint with a supervisory authority (Art. 77)

For US residents, you may additionally have rights under your state's privacy law. Including the right to know, delete, correct, and opt out of certain processing. To exercise any of these, email admin@bitstudio.co.zw. We answer within the statutory time frame (one month under GDPR; 45 days under most US laws).`,
  },
  {
    title: "Children's data",
    body: `This site is not directed at children under 16 (GDPR) or under 13 (US COPPA). We do not knowingly collect data from minors. If you believe a minor's data has reached us, please contact admin@bitstudio.co.zw and we will delete it.`,
  },
  {
    title: "Changes to this policy",
    body: `We may amend this Privacy Policy when the law or our practice changes. The current version is always at bitstudio.co.zw/privacy. Last updated: May 2026.`,
  },
];

export default function Privacy() {
  const hover = useCursorHover("hover", "");

  return (
    <PageTransition>
      <SEO
        title="Privacy Policy"
        description="How Bit Studio (Private) Limited handles personal data. Under GDPR Art. 13/14 and US state privacy laws. Hosting, fonts, contact form, your rights."
        path="/privacy"
        keywords={["privacy policy", "GDPR", "CCPA", "Bit Studio", "data protection"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Privacy", path: "/privacy" },
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
              <span className="text-signal">Privacy</span>
            </div>
          </div>

          <SectionLabel chapter="§ Privacy" title="Privacy policy" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 display-massive text-bone-100 leading-[0.85]"
          >
            Privacy.
          </motion.h1>
          <p className="mt-8 max-w-2xl text-bone-100/75 text-base md:text-lg leading-relaxed">
            We process as little as possible. What we do process, you'll find
            here. Clearly, completely, and without legal hide-and-seek. The
            German-language version lives at{" "}
            <Link to="/datenschutz" {...hover} className="text-signal hover-line">
              /datenschutz
            </Link>{" "}
            and is legally identical.
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
            <span>See also:</span>
            <Link to="/legal" {...hover} className="hover-line text-signal">Legal notice</Link>
            <span>·</span>
            <Link to="/terms" {...hover} className="hover-line">Terms of engagement</Link>
            <span>·</span>
            <Link to="/datenschutz" {...hover} className="hover-line">Datenschutz (Deutsch)</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
