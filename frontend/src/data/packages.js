// Bit Studio. Nine productised engagements offered globally. Each
// covers one of the studio's ten service lines, sized so a founder, a
// principal, or a partner can pick the one their next problem looks
// like. Fixed scope, fixed price, fixed delivery date. Three slots
// per quarter overall; we choose which slot goes to which package.
//
// Each package is consumed by /pakete (DE labels and copy) and
// /packages (EN labels and copy). Slugs stay German on the three
// original engagements so internal hash anchors and inbound links
// keep working; newer slugs use the English package name.
//
// Tiers (order in the file is the order on the page):
//   Express  ·  3-5 days  ·  €6.5-13.5k  ·  Sprint / Mark / Inbox
//   Practice ·  6-8 days  ·  €18-19k     ·  Agent / Chambers
//   House    ·  10 days   ·  €25-28k     ·  Workshop / House
//   Build    ·  14-20 days · €45-58k     ·  Surface / Cathedral

export const PACKAGES = [
  // ──────────────────────────────── EXPRESS TIER ────────────────────────────────
  {
    slug: "sprint",
    archetype: "sprint",
    tier: "express",
    name_de: "Der Sprint",
    name_en: "The Sprint",
    eyebrow_de: "Für Gründungen und Lancierungen",
    eyebrow_en: "For founders and launches",
    aesthetic: "Editorial × Manifesto",
    accent: "#D4FF3A",
    price: "€6.500",
    price_en: "€6,500",
    timeline_days: 3,
    slots_per_quarter: 4,
    slots_remaining: 3,
    promise_de:
      "Eine Seite. Vollständig formuliert. In drei Tagen live.",
    promise_en:
      "One page. Fully formed. Live in three days.",
    for_de:
      "Eine Gründerin mit einem Launch in zwei Wochen. Ein Team mit einer Ankündigung. Eine Veranstaltung, die eine Seite braucht, die nicht aussieht wie jede andere Veranstaltungsseite. Jeder, der eine Sache gut und schnell gesagt haben will.",
    for_en:
      "A founder with a launch in two weeks. A team with a product announcement. An event that needs a page that does not look like every other event page. Anyone who needs one thing said well, said fast.",
    includes_de: [
      "Eine vollständig gestaltete und gebaute Landingpage",
      "Bis zu vier Sektionen (Hero, drei tragende)",
      "Eigene Typografie-Paarung",
      "Foto-Regie oder Stock-Auswahl",
      "Formular- oder Buchungsintegration (E-Mail, Calendly, Stripe)",
      "Drei Monate Hosting + Monitoring inbegriffen",
    ],
    includes_en: [
      "One fully designed and built landing page",
      "Up to four sections (hero, three supporting)",
      "Custom typography pairing",
      "Photo direction or stock-photo selection",
      "Form or booking integration (email, Calendly, Stripe)",
      "Three months of hosting + monitoring included",
    ],
    out_de: [
      "Mehr-Seiten-Architektur (separate Quote, siehe Workshop)",
      "Eigene Illustration",
      "CMS-Anbindung",
      "Markenidentität jenseits der Seite (siehe Mark)",
    ],
    out_en: [
      "Multi-page architecture (separate quote. See Workshop)",
      "Custom illustration",
      "CMS integration",
      "Brand identity beyond the page (see Mark)",
    ],
  },

  {
    slug: "mark",
    archetype: "mark",
    tier: "express",
    name_de: "Das Zeichen",
    name_en: "The Mark",
    eyebrow_de: "Für neue Unternehmen und Reset-Momente",
    eyebrow_en: "For new ventures and reset moments",
    aesthetic: "Atelier × Editorial",
    accent: "#C9A04D",
    price: "€9.500",
    price_en: "€9,500",
    timeline_days: 5,
    slots_per_quarter: 4,
    slots_remaining: 2,
    promise_de:
      "Ein Zeichen, ein Typsystem, eine einseitige Präsenz. Fünf Tage vom Briefing bis zur URL.",
    promise_en:
      "A mark, a type system, a one-page presence to wear them. Five days from brief to URL.",
    for_de:
      "Ein neues Unternehmen, das seine Identität findet. Ein bestehendes, das einen Reset drückt. Eine Gründerin, die sich weigert, mit einem Canva-Platzhalter zu starten. Das Zeichen gehört Ihnen vollständig.",
    for_en:
      "A new venture finding its identity. An existing business pressing reset. A founder who refuses to launch with a Canva placeholder. The mark belongs to you outright.",
    includes_de: [
      "Wortmarke, Monogramm, Iconographie",
      "Typografie-Paarung + Farbpalette",
      "12-seitiger Markenleitfaden (PDF)",
      "Einseitige Landingpage mit der neuen Identität",
      "Quelldateien (Figma, AI, SVG)",
      "Drei Monate Hosting + Monitoring",
    ],
    includes_en: [
      "Logotype, monogram, iconography",
      "Type pairing + colour palette",
      "12-page brand guide (PDF)",
      "One-page landing site with the new identity",
      "Source files (Figma, AI, SVG)",
      "Three months of hosting + monitoring",
    ],
    out_de: [
      "Mehrseitige Website (siehe Workshop oder House)",
      "Print-Kollateral",
      "Markenstrategie-Workshop",
    ],
    out_en: [
      "Multi-page website (see Workshop or House)",
      "Print collateral",
      "Brand-strategy workshop",
    ],
  },

  {
    slug: "inbox",
    archetype: "inbox",
    tier: "express",
    name_de: "Der Posteingang",
    name_en: "The Inbox",
    eyebrow_de: "Für Geschäfte, die schon auf WhatsApp leben",
    eyebrow_en: "For businesses already living on WhatsApp",
    aesthetic: "Manifesto × Bento",
    accent: "#25D366",
    price: "€13.500",
    price_en: "€13,500",
    timeline_days: 5,
    slots_per_quarter: 3,
    slots_remaining: 3,
    promise_de:
      "Der WhatsApp-Posteingang, produktisiert. Anfragen triagiert, beantwortet und an Menschen eskaliert, in der Stimme Ihrer Marke.",
    promise_en:
      "The WhatsApp inbox, productised. Customer messages triaged, drafted, and escalated to a human, in your brand's voice.",
    for_de:
      "Salons, Praxen, Ateliers, Autohäuser, Agenturen. Jeder, der bereits über WhatsApp verkauft, bucht oder berät und genug vom ungeordneten Posteingang hat. Die Reaktionsgeschwindigkeit eines Lebensmittelladens, mit der Disziplin eines professionellen Service-Desks.",
    for_en:
      "Salons, clinics, ateliers, dealerships, agencies. Anyone already selling, booking, or supporting on WhatsApp and tired of the unsorted inbox. The grocer's responsiveness, with the professional service desk's discipline.",
    includes_de: [
      "Meta Cloud API oder WATI-Anbindung (oder whatsmeow Direct-Device)",
      "WhatsApp Flows für Buchung, Bestellung, FAQ",
      "Claude-API-Agent für eingehende Triage und Antwort-Drafts in Markenstimme",
      "Postgres-CRM mit Konversationshistorie und Tags",
      "Vorlagen-Bibliothek + Freigabe-Workflow",
      "Soft-Ban-Watchdog + Opt-In-Compliance",
      "Sechs Monate Hosting + Monitoring",
    ],
    includes_en: [
      "Meta Cloud API or WATI integration (or whatsmeow direct-device pairing)",
      "WhatsApp Flows for booking, orders, FAQ",
      "Claude-API agent for inbound triage and reply-drafting in brand voice",
      "Postgres CRM tier with conversation history and tags",
      "Template-message library + approval workflow",
      "Soft-ban watchdog + opt-in compliance",
      "Six months of hosting + monitoring",
    ],
    out_de: [
      "Provisionierung einer eigenen WhatsApp-Business-Nummer (Sie provisionieren, wir verbinden)",
      "E-Commerce-Katalog jenseits von Flows",
      "Sprachen jenseits Deutsch + Englisch",
    ],
    out_en: [
      "Custom WhatsApp Business number provisioning (you provision; we wire)",
      "E-commerce catalogue beyond Flows",
      "Languages beyond two",
    ],
  },

  // ──────────────────────────────── PRACTICE TIER ───────────────────────────────
  {
    slug: "agent",
    archetype: "agent",
    tier: "practice",
    name_de: "Der Agent",
    name_en: "The Agent",
    eyebrow_de: "Für eine wiederholbare Wissensaufgabe",
    eyebrow_en: "For a repeatable knowledge-worker task",
    aesthetic: "Manifesto × Bento",
    accent: "#9F6BFF",
    price: "€18.000",
    price_en: "€18,000",
    timeline_days: 6,
    slots_per_quarter: 3,
    slots_remaining: 2,
    promise_de:
      "Eine Aufgabe, automatisiert. Ein Agent, der überwacht, entwirft, einreicht und auf menschliche Freigabe wartet. Sechs Tage vom Briefing bis zum Lauf.",
    promise_en:
      "One job, automated. An agent that monitors, drafts, posts, and waits for human approval. Six days from brief to running.",
    for_de:
      "Eine Praxis, die dreißig Stunden pro Woche an RFP-Antworten, Kurzberichten, News-Monitoring oder Rechnungsentwürfen verliert. Jeder, der die Aufgabe benennen kann und sie nicht vermissen würde, wenn sie verschwände. Der erste Agent wird zum Muster für den zweiten.",
    for_en:
      "A practice losing thirty hours a week to RFP responses, briefing summaries, news monitoring, or invoice drafting. Anyone who can name the task and would not miss it if it disappeared. The first agent we build becomes the pattern for the second.",
    includes_de: [
      "Use-Case-Spezifikation + Kosten-Modell",
      "Modellauswahl (Claude, GPT, On-Device) + Prompt-Engineering",
      "Tool-Anbindung (RAG, Web-Suche, eigene APIs)",
      "Postgres-State + Audit-Log",
      "Freigabe-Inbox (Web oder WhatsApp)",
      "Cron- / Webhook- / Event-Trigger",
      "Shadow-Run-Soft-Launch",
      "Sechs Monate Observability + Iteration",
    ],
    includes_en: [
      "Use-case specification + cost model",
      "Model choice (Claude, GPT, on-device) + prompt engineering",
      "Tool wiring (RAG, web search, custom APIs)",
      "Postgres state + audit log",
      "Approval inbox (web or WhatsApp)",
      "Cron / webhook / event triggers",
      "Shadow-run soft launch",
      "Six months of observability + iteration",
    ],
    out_de: [
      "Multi-Agent-Orchestrierung (separate Quote)",
      "Eigenes Modell-Fine-Tuning",
      "SOC 2 / ISO 27001 Production-Härtung",
    ],
    out_en: [
      "Multi-agent orchestration (separate engagement)",
      "Custom model fine-tuning",
      "SOC 2 / ISO 27001 production hardening",
    ],
  },

  {
    slug: "kanzlei-erneuerung",
    archetype: "kanzlei",
    tier: "practice",
    name_de: "Die Kanzlei-Erneuerung",
    name_en: "The Chambers",
    eyebrow_de: "Für Anwaltskanzleien und Sozietäten",
    eyebrow_en: "For law firms and chambers",
    aesthetic: "Heritage × Editorial",
    accent: "#B58A3B",
    price: "€19.000",
    price_en: "€19,000",
    timeline_days: 8,
    slots_per_quarter: 3,
    slots_remaining: 1,
    promise_de:
      "Ein Auftritt, der die Würde und das Vertrauen Ihrer Kanzlei trägt. Ohne den verstaubten Eindruck, den die meisten Kanzlei-Websites hinterlassen.",
    promise_en:
      "A presence that carries the dignity and trust of the firm. Without the dusty impression most law-firm sites leave.",
    for_de:
      "Boutique-Sozietäten mit fünf bis dreißig Anwältinnen und Anwälten. Schwerpunkte: Wirtschaftsrecht, M&A, IP, Arbeitsrecht, Steuerrecht, Strafrecht. Sie haben Mandate, die für sich sprechen, und einen Webauftritt, der das nicht tut. Ein neuer Sozius oder eine neue Sozia ist der Auslöser; das Internet wird endlich ernst genommen.",
    for_en:
      "Partner-led law firms with five to thirty attorneys, on any continent. Commercial, M&A, IP, employment, tax, criminal. The mandates speak for themselves; the site does not. Usually a new partner is the trigger. The internet finally gets taken seriously.",
    includes_de: [
      "Editorial-Website in Heritage-Ästhetik (Serife, ruhige Raster, geprüfte Typografie)",
      "Partner-Bio-System (Lebenslauf, Schwerpunkte, Veröffentlichungen, Kontakt)",
      "Mandats-Vorlagen (NDA-bewusst, mit Platzhaltern und Beispielmandaten)",
      "Erstkontakt-Formular mit Kalenderbuchung (Calendly oder HubSpot-Anbindung)",
      "News / Aktuelles. Bereich mit redaktioneller Rhythmus-Vorlage",
      "Inhaltsrhythmus-Briefing. Eine Vorlage pro Sozius oder Sozia pro Quartal",
      "Karriere-Seite mit Stellenausschreibungs-Vorlage",
      "Sechs Monate Hosting + Monitoring inbegriffen",
    ],
    includes_en: [
      "Editorial website in heritage aesthetic. Serif, calm grid, considered typography",
      "Partner bio system. CV, fields, publications, contact",
      "Mandate templates. NDA-aware, with placeholders and example mandates",
      "Intake form with calendar booking. Calendly or HubSpot integration",
      "News / Insights section with editorial rhythm template",
      "Content rhythm brief. One template per partner per quarter",
      "Careers page with job-posting template",
      "Six months of hosting + monitoring included",
    ],
    out_de: [
      "Vollwertiges Redaktions-CMS für Nicht-Technik-Mitarbeiter (WordPress-Migration als Zusatz: € 5.000)",
      "CRM-Integration über das Erstkontaktformular hinaus",
      "Übersetzung. Die Kanzlei-Erneuerung ist standardmäßig einsprachig (Deutsch oder Englisch); zweisprachig auf Wunsch + € 4.000",
      "Mandanten-Portal (eigenes Projekt, separate Quote)",
    ],
    out_en: [
      "Full editorial CMS for non-technical staff (WordPress migration add-on: €5,000)",
      "CRM integration beyond the intake form",
      "Translation. The Chambers is single-language by default; bilingual on request + €4,000",
      "Client portal (separate project, separate quote)",
    ],
  },

  // ──────────────────────────────── HOUSE TIER ──────────────────────────────────
  {
    slug: "manufaktur-buehne",
    archetype: "manufaktur",
    tier: "house",
    name_de: "Die Manufaktur-Bühne",
    name_en: "The Workshop",
    eyebrow_de: "Für Manufakturen und Werkstätten",
    eyebrow_en: "For makers and ateliers",
    aesthetic: "Editorial × Atelier",
    accent: "#C8A968",
    price: "€25.000",
    price_en: "€25,000",
    timeline_days: 10,
    slots_per_quarter: 3,
    slots_remaining: 2,
    promise_de:
      "Die Bühne, auf der Ihre Werkstücke die Geschichte erzählen, die sie verdienen. In Editorial-Typografie, mit der Sorgfalt einer Monografie.",
    promise_en:
      "The stage on which the work tells the story it deserves. In editorial typography, with the discipline of a monograph.",
    for_de:
      "Familiengeführte Manufakturen mit handwerklicher Tradition: Möbel, Leder, Schmuck, Präzisionsinstrumente, Textil, Keramik. Sie verkaufen über den Fachhandel oder direkt. Ihre Produkte verdienen mehr als ein Online-Katalog. Ihr aktueller Auftritt stammt aus der Zeit, bevor das Internet ernst genommen wurde.",
    for_en:
      "Owner-led makers and ateliers with a craft tradition. Furniture, leather, jewellery, precision instruments, textile, ceramics. You sell through dealers or direct. The work deserves more than an online catalogue. The current site predates the internet being taken seriously.",
    includes_de: [
      "Editorial-Website mit fotogetriebener Bildsprache",
      "Produkt-Story-System (eine eigene Editorial-Seite pro Werkstück, mit Materialnotizen, Maker's Notes, Fotostrecken)",
      "Zweisprachig Deutsch + Englisch. Vollständig übersetzt",
      "Händlerverzeichnis mit Karte",
      "Pressekit (PDF + Landingpage) für Fachpresse und Magazine",
      "Messekit: Standbeschilderung, Visitenkarten, Leave-Behind-Karten (Print-Vorlagen)",
      "Sechs Monate Hosting + Monitoring inbegriffen",
    ],
    includes_en: [
      "Editorial website with photo-led typography",
      "Product story system. An editorial page per piece, with material notes, maker's notes, photo essays",
      "Bilingual. Any two languages of your choice",
      "Dealer or stockist directory with map",
      "Press kit (PDF + landing page) for trade press and magazines",
      "Trade-show kit. Booth signage, business cards, leave-behind cards (print templates)",
      "Six months of hosting + monitoring included",
    ],
    out_de: [
      "E-Commerce (Shopify-Anbindung als Zusatz: € 8.000)",
      "Übersetzungen in weitere Sprachen außer Deutsch + Englisch",
      "Produktfotografie (wir liefern ein Shotlist, der Fotograf bleibt bei Ihnen)",
      "Logo-Neugestaltung (auf Wunsch als Zusatz: € 4.500)",
    ],
    out_en: [
      "E-commerce (Shopify add-on: €8,000)",
      "Translation beyond the two languages chosen",
      "Product photography. We provide a shot list; the photographer stays yours",
      "Logo redesign (add-on: €4,500 on request)",
    ],
  },

  {
    slug: "hotel-sammlung",
    archetype: "hotel",
    tier: "house",
    name_de: "Die Hotel-Sammlung",
    name_en: "The House",
    eyebrow_de: "Für Boutique-Hotels und Lodges",
    eyebrow_en: "For boutique hotels and lodges",
    aesthetic: "Cinematic × Atelier",
    accent: "#22D3EE",
    price: "€28.000",
    price_en: "€28,000",
    timeline_days: 10,
    slots_per_quarter: 3,
    slots_remaining: 3,
    promise_de:
      "Eine cineastische Präsenz für ein Haus, das Menschen empfängt. In der Bildsprache der besten Reisemagazine, gebaut für direkte Buchungen.",
    promise_en:
      "A cinematic presence for a house that receives people. In the visual language of the best travel magazines, built for direct bookings.",
    for_de:
      "Boutique-Hotels und Lodges der 4- bis 5-Sterne-Kategorie. Inhabergeführt oder mit kleinem Führungsteam. Standorte: Berlin, München, Hamburg, Schwarzwald, Sylt, Bodensee, Wachau, Engadin, Salzkammergut. Sie haben eine außergewöhnliche Geschichte. Architektur, Küche, Lage. Und einen Auftritt, der sie nicht trägt.",
    for_en:
      "Boutique hotels and lodges in the 4-5 star range. Owner-led or with a small leadership team. An alpine lodge, a coastal retreat, a desert camp, a vineyard estate, a city house, an island address. The architecture, the kitchen, the location speak for themselves. The web presence does not yet.",
    includes_de: [
      "Cineastische Landingpage mit Voll-Viewport-Bewegtbild oder Großfoto",
      "Zimmer-, Suiten- und Atmosphäre-Bereiche mit narrativer Tiefe",
      "Bereiche für Gastronomie, Spa, Erlebnisse",
      "Mehrsprachig: Deutsch, Englisch + eine weitere Sprache nach Wahl (FR / IT / ES)",
      "Buchungssystem-Integration (Mews, SiteMinder, Cloudbeds. Eines wird angebunden)",
      "Fotoregie-Briefing für Ihren Fotografen (Shotlist, Stimmungs-Referenzen, Sequenzen)",
      "Digitales Welcome-System: in-stay-Landingpages, QR-basierte Concierge-Seiten",
      "Hausgeschichte / Journal. Bereich für Storytelling und SEO",
      "Sechs Monate Hosting + Monitoring inbegriffen",
    ],
    includes_en: [
      "Cinematic landing with full-viewport motion or hero photography",
      "Rooms, suites, atmosphere sections with narrative depth",
      "Sections for restaurant, spa, experiences",
      "Multilingual. Up to three languages of your choice",
      "Booking-system integration. Mews, SiteMinder, Cloudbeds, Little Hotelier. We connect one",
      "Photo-direction brief for your photographer. Shot list, mood references, sequences",
      "Digital welcome system. In-stay landing pages, QR-based concierge pages",
      "House journal / story section for storytelling and SEO",
      "Six months of hosting + monitoring included",
    ],
    out_de: [
      "Migration des PMS (Property Management System). Separate Quote",
      "Eigene Buchungs-Engine-Entwicklung (wir binden bestehende Engines an, bauen aber keine neuen)",
      "Produktion der Fotografie (wir liefern Briefing und Regie, der Fotograf bleibt bei Ihnen)",
      "Übersetzungen in Sprachen außer den vier oben genannten",
    ],
    out_en: [
      "PMS (Property Management System) migration. Separate quote",
      "Custom booking-engine development. We connect existing engines, we don't build new ones",
      "Photography production. We deliver the brief and direction; the photographer stays yours",
      "Translation beyond the three languages chosen",
    ],
  },

  // ──────────────────────────────── BUILD TIER ──────────────────────────────────
  {
    slug: "surface",
    archetype: "surface",
    tier: "build",
    name_de: "Die Fläche",
    name_en: "The Surface",
    eyebrow_de: "Für Marken auf den nächsten Oberflächen",
    eyebrow_en: "For brands on the next surfaces",
    aesthetic: "Cinematic × Bento",
    accent: "#5B3FFF",
    price: "€45.000",
    price_en: "€45,000",
    timeline_days: 14,
    slots_per_quarter: 2,
    slots_remaining: 2,
    promise_de:
      "Ihre Marke auf der Oberfläche, die Ihr Kunde als Nächstes tragen wird. Vierzehn Tage vom Briefing bis zu einer funktionierenden App auf echter Hardware.",
    promise_en:
      "Your brand on the surface your customer will be wearing next. Fourteen days from brief to a working app on real hardware.",
    for_de:
      "Premium-Marken, Verlage, Museen, Hotelgruppen, Einzelhändler. Jeder, der zuerst auf Ray-Ban Display, Vision Pro, Quest oder Wear OS sein will. Vierzehn Tage Briefing-bis-Hardware-Demo. Eine v0.5, die zu einem bezahlten Pilot wird.",
    for_en:
      "Premium brands, publishers, museums, hospitality groups, retailers. Anyone who wants to be first on Ray-Ban Display, Vision Pro, Quest, or Wear OS. A two-week brief that ships a working v0.5 on device, ready for a paid pilot.",
    includes_de: [
      "Oberflächenwahl + Kosten-Modell (Ray-Ban Display / Vision Pro / Quest / Wear OS)",
      "Spezifikation, Latenzbudget, On-Device-LLM-Budget",
      "Native-Build (Meta Spatial SDK / SwiftUI + RealityKit / Jetpack Compose / WebXR-Fallback)",
      "Pairing-Companion (Web oder Wearable)",
      "First-Party-Daten-Integration",
      "On-Device-Demo für Vorstand / Investor / Presse",
      "Drei Monate Iteration + Soft-Launch",
    ],
    includes_en: [
      "Surface choice + cost model (Ray-Ban Display / Vision Pro / Quest / Wear OS)",
      "Specification, latency budget, on-device LLM budget",
      "Native build (Meta Spatial SDK / SwiftUI + RealityKit / Jetpack Compose / WebXR fallback)",
      "Pairing companion (web or wearable)",
      "First-party data integration",
      "On-device demo for board, investor, or press",
      "Three months of iteration + soft launch",
    ],
    out_de: [
      "Hardware-Beschaffung",
      "App-Store- / Marketplace-Einreichung (wir bereiten vor, Sie reichen ein)",
      "Production-Härtung jenseits v0.5 (separate Quote)",
    ],
    out_en: [
      "Hardware procurement",
      "App-store / marketplace submission (we prepare; you submit)",
      "Production hardening beyond v0.5 (separate engagement)",
    ],
  },

  {
    slug: "cathedral",
    archetype: "cathedral",
    tier: "build",
    name_de: "Die Kathedrale",
    name_en: "The Cathedral",
    eyebrow_de: "Für SaaS-Gründer und Produktbauten",
    eyebrow_en: "For SaaS founders and product builds",
    aesthetic: "Editorial × Bento",
    accent: "#8C1E2C",
    price: "€58.000",
    price_en: "€58,000",
    timeline_days: 20,
    slots_per_quarter: 2,
    slots_remaining: 1,
    promise_de:
      "Eine vollständige Webanwendung von Auth bis Abrechnung. Zwanzig Tage vom Blueprint bis zum ersten zahlenden Kunden.",
    promise_en:
      "A full web application from auth to billing. Twenty days from blueprint to first paying customer.",
    for_de:
      "Pre-Product-Gründer mit einem echten Wedge. Mid-Stage-Produkte, die aus einem No-Code-Prototyp herausgewachsen sind und Engineering-Tiefe brauchen. Jeder, dessen Geschäft das Produkt selbst ist, nicht die Seite über das Produkt.",
    for_en:
      "Pre-product founders with a real wedge. Mid-stage products that grew out of a no-code prototype and need engineering depth. Anyone whose business is the product itself, not the page about the product.",
    includes_de: [
      "Full-Stack React + Django / FastAPI + Postgres",
      "Authentifizierung (Better Auth, Clerk, oder Custom)",
      "Stripe-Abrechnung (Subscription oder Usage-Based)",
      "Admin- / Dashboard-Tier",
      "WhatsApp + E-Mail transaktionale Benachrichtigungen",
      "Observability-First-Class (Sentry + OpenTelemetry)",
      "Render- oder Vercel-Deployment + CI/CD",
      "Sechs Monate Iterations-Fenster",
    ],
    includes_en: [
      "Full-stack React + Django / FastAPI + Postgres",
      "Authentication (Better Auth, Clerk, or custom)",
      "Stripe billing (subscription or usage-based)",
      "Admin / dashboard tier",
      "WhatsApp + email transactional notifications",
      "First-class observability (Sentry + OpenTelemetry)",
      "Render or Vercel deployment + CI/CD",
      "Six months of iteration window",
    ],
    out_de: [
      "Mobile Native-Apps (separate Quote)",
      "SOC 2 / HIPAA / PCI Compliance (nur Beratung)",
      "Marketing-Site jenseits einer 1-Pager",
    ],
    out_en: [
      "Mobile native apps (separate engagement)",
      "SOC 2 / HIPAA / PCI compliance (advisory only)",
      "Marketing site beyond a 1-pager",
    ],
  },
];

// Tier order for the on-page filter rail and SEO breadcrumb. Keep
// stable; the on-page rendering reads from PACKAGES directly.
export const PACKAGE_TIERS = [
  { id: "express",  label_en: "Express",  label_de: "Express",  days: "3-5 days",   days_de: "3-5 Tage" },
  { id: "practice", label_en: "Practice", label_de: "Praxis",   days: "6-8 days",   days_de: "6-8 Tage" },
  { id: "house",    label_en: "House",    label_de: "Haus",     days: "10 days",    days_de: "10 Tage" },
  { id: "build",    label_en: "Build",    label_de: "Bauwerk",  days: "14-20 days", days_de: "14-20 Tage" },
];

// Universal four-phase process shared across all packages. Day ranges
// given for the 10-day house cadence; the express and practice tiers
// run the same four phases, just compressed; the build tier extends
// each phase proportionally.
export const PROCESS_PHASES = [
  {
    n: "I",
    name_de: "Briefing & Konzept",
    name_en: "Brief & Concept",
    days_de: "Tag 1-2",
    days_en: "Day 1-2",
    body_de:
      "Wir hören zu. Wir lesen, was Sie bereits geschrieben haben. Wir nehmen die Stoffe, die Materialien, die Mandate in die Hand. Am Ende dieser Phase liegt ein Konzept vor: visuelle Richtung, Tonfall, Strukturentwurf.",
    body_en:
      "We listen. We read what you've already written. We hold the fabrics, the materials, the mandates. By the end of this phase, a concept lies on the table: visual direction, voice, structural draft.",
  },
  {
    n: "II",
    name_de: "Gestaltung",
    name_en: "Design",
    days_de: "Tag 3-5",
    days_en: "Day 3-5",
    body_de:
      "Die endgültige visuelle Sprache wird gebaut: Typografie, Farbpalette, Raster, Komponenten-System. Erste Seiten werden vollständig gestaltet. Eine Iterationsrunde ist eingeplant.",
    body_en:
      "The final visual language is built: typography, palette, grid, component system. First pages are fully designed. One iteration round is budgeted.",
  },
  {
    n: "III",
    name_de: "Bau",
    name_en: "Build",
    days_de: "Tag 6-8",
    days_en: "Day 6-8",
    body_de:
      "Engineering. React, Vite, Tailwind, lokale Schriftauslieferung. Inhalte werden eingepflegt. Tests auf realer Hardware, in echten Browsern, mit echten Verbindungen.",
    body_en:
      "Engineering. React, Vite, Tailwind, locally-hosted fonts. Content is poured in. Tests on real hardware, in real browsers, on real connections.",
  },
  {
    n: "IV",
    name_de: "Launch & Nachbetreuung",
    name_en: "Launch & Aftercare",
    days_de: "Tag 9-10",
    days_en: "Day 9-10",
    body_de:
      "Umstellung, Schulung, Übergabe. Erste Tage live werden engmaschig beobachtet. Sechs Monate Hosting und Monitoring sind anschließend inbegriffen. Wir verschwinden nicht am Tag des Launches.",
    body_en:
      "Cutover, training, handover. First days live are watched closely. Six months of hosting and monitoring follow, included. We don't disappear on launch day.",
  },
];

export function findPackage(slug) {
  return PACKAGES.find((p) => p.slug === slug);
}
