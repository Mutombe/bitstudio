// Bit Studio — three Erneuerungs-Pakete (renewal packages) for the
// German Mittelstand. Fixed scope, fixed price, three slots per quarter.
//
// Each package is consumed by /pakete (DE) and /packages (EN). The DE
// page is the spearhead of the German cold outreach campaign; the EN
// page is the mirror for international visitors and future US-market
// outreach.
//
// To add a fourth package later, append an object with the same shape.
// Order matters — the order here is the order on the page.

export const PACKAGES = [
  {
    slug: "manufaktur-buehne",
    archetype: "manufaktur",
    // Identity
    name_de: "Die Manufaktur-Bühne",
    name_en: "The Manufaktur Stage",
    eyebrow_de: "Für Manufakturen und Werkstätten",
    eyebrow_en: "For makers and workshops",
    aesthetic: "Editorial × Atelier",
    accent: "#C8A968",

    // Numbers
    price: "€25.000",
    price_en: "€25,000",
    timeline_weeks: 10,
    slots_per_quarter: 3,
    slots_remaining: 2,

    // The pitch
    promise_de:
      "Die Bühne, auf der Ihre Werkstücke die Geschichte erzählen, die sie verdienen — in Editorial-Typografie, mit der Sorgfalt einer Monografie.",
    promise_en:
      "The stage on which your pieces tell the story they deserve — in editorial typography, with the discipline of a monograph.",

    // Who it's for
    for_de:
      "Familiengeführte Manufakturen mit handwerklicher Tradition: Möbel, Leder, Schmuck, Präzisionsinstrumente, Textil, Keramik. Sie verkaufen über den Fachhandel oder direkt. Ihre Produkte verdienen mehr als ein Online-Katalog. Ihr aktueller Auftritt stammt aus der Zeit, bevor das Internet ernst genommen wurde.",
    for_en:
      "Family-owned makers with a craft tradition: furniture, leather, jewellery, precision instruments, textile, ceramics. You sell through dealers or direct. Your products deserve more than an online catalogue. Your current site predates the internet being taken seriously.",

    // Included
    includes_de: [
      "Editorial-Website mit fotogetriebener Bildsprache",
      "Produkt-Story-System (eine eigene Editorial-Seite pro Werkstück, mit Materialnotizen, Maker's Notes, Fotostrecken)",
      "Zweisprachig Deutsch + Englisch — vollständig übersetzt",
      "Händlerverzeichnis mit Karte",
      "Pressekit (PDF + Landingpage) für Fachpresse und Magazine",
      "Messekit: Standbeschilderung, Visitenkarten, Leave-Behind-Karten (Print-Vorlagen)",
      "Sechs Monate Hosting + Monitoring inbegriffen",
    ],
    includes_en: [
      "Editorial website with photo-led typography",
      "Product story system (an editorial page per piece, with material notes, maker's notes, photo essays)",
      "Bilingual German + English — fully translated",
      "Dealer directory with map",
      "Press kit (PDF + landing page) for trade press and magazines",
      "Trade show kit: booth signage, business cards, leave-behind cards (print templates)",
      "Six months of hosting + monitoring included",
    ],

    // Out of scope (sets expectations honestly)
    out_de: [
      "E-Commerce (Shopify-Anbindung als Zusatz: € 8.000)",
      "Übersetzungen in weitere Sprachen außer Deutsch + Englisch",
      "Produktfotografie (wir liefern ein Shotlist, der Fotograf bleibt bei Ihnen)",
      "Logo-Neugestaltung (auf Wunsch als Zusatz: € 4.500)",
    ],
    out_en: [
      "E-commerce (Shopify add-on: €8,000)",
      "Translation into languages beyond German + English",
      "Product photography (we provide a shot list; the photographer remains yours)",
      "Logo redesign (add-on: €4,500 on request)",
    ],
  },

  {
    slug: "hotel-sammlung",
    archetype: "hotel",
    name_de: "Die Hotel-Sammlung",
    name_en: "The Hotel Collection",
    eyebrow_de: "Für Boutique-Hotels und Lodges",
    eyebrow_en: "For boutique hotels and lodges",
    aesthetic: "Cinematic × Atelier",
    accent: "#22D3EE",

    price: "€28.000",
    price_en: "€28,000",
    timeline_weeks: 10,
    slots_per_quarter: 3,
    slots_remaining: 3,

    promise_de:
      "Eine cineastische Präsenz für ein Haus, das Menschen empfängt — in der Bildsprache der besten Reisemagazine, gebaut für direkte Buchungen.",
    promise_en:
      "A cinematic presence for a house that receives people — in the visual language of the best travel magazines, built for direct bookings.",

    for_de:
      "Boutique-Hotels und Lodges der 4- bis 5-Sterne-Kategorie. Inhabergeführt oder mit kleinem Führungsteam. Standorte: Berlin, München, Hamburg, Schwarzwald, Sylt, Bodensee, Wachau, Engadin, Salzkammergut. Sie haben eine außergewöhnliche Geschichte — Architektur, Küche, Lage — und einen Auftritt, der sie nicht trägt.",
    for_en:
      "Boutique hotels and lodges in the 4-5 star range. Owner-led or with a small leadership team. Locations: Berlin, Munich, Hamburg, Black Forest, Sylt, Lake Constance, Wachau, Engadin, Salzkammergut. You have an exceptional story — architecture, kitchen, location — and a web presence that doesn't carry it.",

    includes_de: [
      "Cineastische Landingpage mit Voll-Viewport-Bewegtbild oder Großfoto",
      "Zimmer-, Suiten- und Atmosphäre-Bereiche mit narrativer Tiefe",
      "Bereiche für Gastronomie, Spa, Erlebnisse",
      "Mehrsprachig: Deutsch, Englisch + eine weitere Sprache nach Wahl (FR / IT / ES)",
      "Buchungssystem-Integration (Mews, SiteMinder, Cloudbeds — eines wird angebunden)",
      "Fotoregie-Briefing für Ihren Fotografen (Shotlist, Stimmungs-Referenzen, Sequenzen)",
      "Digitales Welcome-System: in-stay-Landingpages, QR-basierte Concierge-Seiten",
      "Hausgeschichte / Journal — Bereich für Storytelling und SEO",
      "Sechs Monate Hosting + Monitoring inbegriffen",
    ],
    includes_en: [
      "Cinematic landing with full-viewport motion or hero photography",
      "Rooms, suites, atmosphere sections with narrative depth",
      "Sections for restaurant, spa, experiences",
      "Multilingual: German, English + one more language of your choice (FR / IT / ES)",
      "Booking system integration (Mews, SiteMinder, Cloudbeds — we connect one)",
      "Photo-direction brief for your photographer (shot list, mood references, sequences)",
      "Digital welcome system: in-stay landing pages, QR-based concierge pages",
      "House journal / story section for storytelling and SEO",
      "Six months of hosting + monitoring included",
    ],

    out_de: [
      "Migration des PMS (Property Management System) — separate Quote",
      "Eigene Buchungs-Engine-Entwicklung (wir binden bestehende Engines an, bauen aber keine neuen)",
      "Produktion der Fotografie (wir liefern Briefing und Regie, der Fotograf bleibt bei Ihnen)",
      "Übersetzungen in Sprachen außer den vier oben genannten",
    ],
    out_en: [
      "PMS (Property Management System) migration — separate quote",
      "Custom booking-engine development (we connect existing engines, but don't build new ones)",
      "Photography production (we deliver the brief and direction; the photographer stays yours)",
      "Translation into languages beyond the four named above",
    ],
  },

  {
    slug: "kanzlei-erneuerung",
    archetype: "kanzlei",
    name_de: "Die Kanzlei-Erneuerung",
    name_en: "The Kanzlei Renewal",
    eyebrow_de: "Für Anwaltskanzleien und Sozietäten",
    eyebrow_en: "For law firms and chambers",
    aesthetic: "Heritage × Editorial",
    accent: "#B58A3B",

    price: "€19.000",
    price_en: "€19,000",
    timeline_weeks: 8,
    slots_per_quarter: 3,
    slots_remaining: 1,

    promise_de:
      "Ein Auftritt, der die Würde und das Vertrauen Ihrer Kanzlei trägt — ohne den verstaubten Eindruck, den die meisten Kanzlei-Websites hinterlassen.",
    promise_en:
      "A presence that carries the dignity and trust of your chamber — without the dusty impression most law-firm websites leave.",

    for_de:
      "Boutique-Sozietäten mit fünf bis dreißig Anwältinnen und Anwälten. Schwerpunkte: Wirtschaftsrecht, M&A, IP, Arbeitsrecht, Steuerrecht, Strafrecht. Sie haben Mandate, die für sich sprechen, und einen Webauftritt, der das nicht tut. Ein neuer Sozius oder eine neue Sozia ist der Auslöser; das Internet wird endlich ernst genommen.",
    for_en:
      "Boutique chambers with five to thirty attorneys. Focus areas: commercial, M&A, IP, employment, tax, criminal. Your mandates speak for themselves; your website doesn't. A new partner is usually the trigger — the internet finally gets taken seriously.",

    includes_de: [
      "Editorial-Website in Heritage-Ästhetik (Serife, ruhige Raster, geprüfte Typografie)",
      "Partner-Bio-System (Lebenslauf, Schwerpunkte, Veröffentlichungen, Kontakt)",
      "Mandats-Vorlagen (NDA-bewusst, mit Platzhaltern und Beispielmandaten)",
      "Erstkontakt-Formular mit Kalenderbuchung (Calendly oder HubSpot-Anbindung)",
      "News / Aktuelles — Bereich mit redaktioneller Rhythmus-Vorlage",
      "Inhaltsrhythmus-Briefing — eine Vorlage pro Sozius oder Sozia pro Quartal",
      "Karriere-Seite mit Stellenausschreibungs-Vorlage",
      "Sechs Monate Hosting + Monitoring inbegriffen",
    ],
    includes_en: [
      "Editorial website in heritage aesthetic (serif, calm grid, considered typography)",
      "Partner bio system (CV, fields, publications, contact)",
      "Mandate templates (NDA-aware, with placeholders and example mandates)",
      "Intake form with calendar booking (Calendly or HubSpot integration)",
      "News / Aktuelles section with editorial rhythm template",
      "Content rhythm brief — one template per partner per quarter",
      "Careers page with job-posting template",
      "Six months of hosting + monitoring included",
    ],

    out_de: [
      "Vollwertiges Redaktions-CMS für Nicht-Technik-Mitarbeiter (WordPress-Migration als Zusatz: € 5.000)",
      "CRM-Integration über das Erstkontaktformular hinaus",
      "Übersetzung — die Kanzlei-Erneuerung ist standardmäßig einsprachig (Deutsch oder Englisch); zweisprachig auf Wunsch + € 4.000",
      "Mandanten-Portal (eigenes Projekt, separate Quote)",
    ],
    out_en: [
      "Full editorial CMS for non-technical staff (WordPress migration add-on: €5,000)",
      "CRM integration beyond the intake form",
      "Translation — the Kanzlei Renewal is single-language by default (German or English); bilingual on request + €4,000",
      "Client portal (separate project, separate quote)",
    ],
  },
];

// Universal four-phase process shared across all three packages.
export const PROCESS_PHASES = [
  {
    n: "I",
    name_de: "Briefing & Konzept",
    name_en: "Brief & Concept",
    weeks_short: "Wo. 1-2",
    weeks_long: "Wo. 1-2",
    body_de:
      "Wir hören zu. Wir lesen, was Sie bereits geschrieben haben. Wir nehmen die Stoffe, die Materialien, die Mandate in die Hand. Am Ende dieser Phase liegt ein Konzept vor: visuelle Richtung, Tonfall, Strukturentwurf.",
    body_en:
      "We listen. We read what you've already written. We hold the fabrics, the materials, the mandates. By the end of this phase, a concept lies on the table: visual direction, voice, structural draft.",
  },
  {
    n: "II",
    name_de: "Gestaltung",
    name_en: "Design",
    weeks_short: "Wo. 3-4",
    weeks_long: "Wo. 3-5",
    body_de:
      "Die endgültige visuelle Sprache wird gebaut: Typografie, Farbpalette, Raster, Komponenten-System. Erste Seiten werden vollständig gestaltet. Zwei Iterationsrunden sind eingeplant.",
    body_en:
      "The final visual language is built: typography, palette, grid, component system. First pages are fully designed. Two iteration rounds are budgeted.",
  },
  {
    n: "III",
    name_de: "Bau",
    name_en: "Build",
    weeks_short: "Wo. 5-6",
    weeks_long: "Wo. 6-8",
    body_de:
      "Engineering. React, Vite, Tailwind, lokale Schriftauslieferung. Inhalte werden eingepflegt. Tests auf realer Hardware, in echten Browsern, mit echten Verbindungen.",
    body_en:
      "Engineering. React, Vite, Tailwind, locally-hosted fonts. Content is poured in. Tests on real hardware, in real browsers, on real connections.",
  },
  {
    n: "IV",
    name_de: "Launch & Nachbetreuung",
    name_en: "Launch & Aftercare",
    weeks_short: "Wo. 7-8",
    weeks_long: "Wo. 9-10",
    body_de:
      "Umstellung, Schulung, Übergabe. Erste Tage live werden engmaschig beobachtet. Sechs Monate Hosting und Monitoring sind anschließend inbegriffen — wir verschwinden nicht am Tag des Launches.",
    body_en:
      "Cutover, training, handover. First days live are watched closely. Six months of hosting and monitoring follow, included — we don't disappear on launch day.",
  },
];

export function findPackage(slug) {
  return PACKAGES.find((p) => p.slug === slug);
}
