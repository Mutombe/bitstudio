// Bit Studio. The Offer ledger.
//
// Productised solutions, written in the Hormozi grammar: Problem →
// Outcome → Mechanism → Investment → ROI. We do not sell "software." We
// sell the end of a problem. Every offer names the pain first, the gain
// second, and the price last.
//
// Pricing is USD, Zimbabwe-market. Each offer carries its own keyword
// cluster so the page ranks for the searches its buyer actually types.
//
// Consumed by /offers (index) and /offers/:slug (OfferDetail). Slugs are
// load-bearing: sitemap + prerender + inbound links read them. Don't
// rename without updating both build scripts.

import { KW } from "./seo-keywords.js";

export const OFFERS = [
  // ───────────────────────────── REAL ESTATE ─────────────────────────────
  {
    slug: "real-estate-automation",
    number: "01",
    name: "Real Estate Automation System",
    eyebrow: "For property companies drowning in spreadsheets",
    industry: "Real Estate",
    icon: "Buildings",
    accent: "#D4FF3A",
    tint: "#1E5945",
    headline: "Stop tracking tenants in Excel.",
    promise:
      "Digital tenant records, rent that collects itself, and real-time portfolio visibility. The property system your spreadsheets keep promising and never deliver.",
    problem: {
      lead: "Most property companies run on spreadsheets and goodwill. It works until it doesn't.",
      pains: [
        "Tenants tracked in Excel that three people edit and nobody trusts",
        "Rent records lost, duplicated, or remembered wrong",
        "Payments that arrive late because nobody chased them",
        "Multiple administrators doing the same manual work twice",
        "No real-time reporting. The owner asks a question; you ask for a week",
      ],
    },
    outcome: [
      "Every tenant, lease, and payment in one place that tells the truth",
      "Rent invoiced and chased automatically, before it goes late",
      "Vacancy and arrears visible the moment they happen",
      "One administrator doing the work that used to take three",
      "A portfolio you can report on in seconds, not days",
    ],
    mechanism: {
      lead: "A property management platform built for how your buildings actually run.",
      points: [
        "Digital tenant and lease records with full history",
        "Automated rent invoicing, receipts, and payment reminders",
        "Owner and tenant portals for self-service",
        "Maintenance ticketing and accounting integrations",
        "Executive dashboards and AI-assisted reporting at the top tier",
      ],
    },
    tiers: [
      {
        badge: "Starter",
        name: "Rent Collection Accelerator",
        price: "$5,000",
        suitableFor: "1–500 units",
        includes: [
          "Digital tenant records",
          "Rent tracking",
          "Automated invoices",
          "Payment records",
          "Vacancy management",
        ],
        value: [
          "Save 10–20 hours weekly",
          "Eliminate spreadsheet chaos",
          "Reduce missed payments",
        ],
      },
      {
        badge: "Growth",
        name: "Property Operations Platform",
        price: "$8,000",
        suitableFor: "500–2,000 units",
        carryover: "Everything in Starter, plus:",
        includes: [
          "Owner portals",
          "Tenant portals",
          "Maintenance tickets",
          "Automated reminders",
          "Accounting integrations",
          "Agent management",
        ],
        value: [
          "Replace one full-time admin position",
          "Faster rent collection",
          "Better tenant experience",
        ],
      },
      {
        badge: "Enterprise",
        name: "Property ERP",
        price: "$16,000+",
        suitableFor: "Large agencies, property groups, REITs",
        carryover: "Everything in Growth, plus:",
        includes: [
          "Full accounting",
          "Financial reporting",
          "Branch management",
          "Multi-company support",
          "AI reporting",
          "Executive dashboards",
        ],
        value: [
          "Scale without increasing staff",
          "Real-time portfolio visibility",
          "Executive-level reporting",
        ],
      },
    ],
    roi: {
      lead: "If the system replaces one administrator's salary, it pays for itself inside the first year. Everything after that is margin.",
      points: [
        "One recovered late payment a month can cover the Starter tier",
        "One fewer admin hire covers Growth several times over",
      ],
    },
    keywords: [...KW.realEstate, "real estate automation", "property management ERP", "automate business processes"],
    seoTitle: "Real Estate Automation System Zimbabwe",
    seoDescription:
      "Property management software for Zimbabwe. Digital tenant records, rent collection software, real estate CRM, and property ERP. Replace Excel and automate rent collection from $5,000.",
  },

  // ───────────────────────────── LOGISTICS ─────────────────────────────
  {
    slug: "transport-logistics",
    number: "02",
    name: "Transport & Logistics System",
    eyebrow: "For fleets losing money they can't see",
    industry: "Logistics",
    icon: "Truck",
    accent: "#A8C72E",
    tint: "#102544",
    headline: "Your fleet is leaking money. Find it.",
    promise:
      "Fleet visibility, dispatch control, and a transport ERP that turns empty return trips and fuel theft into numbers you can act on.",
    problem: {
      lead: "Transport companies bleed margin in places a spreadsheet will never show you.",
      pains: [
        "Poor dispatching that sends the wrong truck to the wrong load",
        "Empty return trips nobody is paid to notice",
        "Fuel theft buried in honest-looking logs",
        "Delayed reporting, so problems surface a week after they cost you",
      ],
    },
    outcome: [
      "Every vehicle, driver, and trip visible in real time",
      "Dispatching that fills return legs instead of running them empty",
      "Fuel use you can audit to the litre",
      "More loads handled with the same staff",
    ],
    mechanism: {
      lead: "A logistics platform that grows from tracking to full operational control.",
      points: [
        "Vehicle tracking, driver records, and route history",
        "Dispatch and cargo management with a customer portal",
        "Driver mobile app for jobs, proof of delivery, and fuel logs",
        "Transport ERP tying finance, maintenance, HR, and procurement together",
      ],
    },
    tiers: [
      {
        badge: "Starter",
        name: "Fleet Visibility System",
        price: "$6,000",
        includes: [
          "Vehicle tracking",
          "Driver records",
          "Route history",
          "Fuel logs",
        ],
        value: [
          "Reduce fuel abuse",
          "Reduce paperwork",
          "Improve dispatching",
        ],
      },
      {
        badge: "Growth",
        name: "Logistics Control Center",
        price: "$12,000",
        carryover: "Everything in Starter, plus:",
        includes: [
          "Dispatch management",
          "Cargo management",
          "Customer portal",
          "Driver mobile app",
        ],
        value: [
          "Handle more loads with the same staff",
          "Better customer service",
          "Less manual coordination",
        ],
      },
      {
        badge: "Enterprise",
        name: "Transport ERP",
        price: "$25,000+",
        carryover: "Everything in Growth, plus:",
        includes: [
          "Fleet management",
          "Finance",
          "Maintenance",
          "HR",
          "Procurement",
        ],
        value: [
          "Complete operational visibility",
          "Significant admin reduction",
          "Scales nationally",
        ],
      },
    ],
    roi: {
      lead: "Curb fuel abuse and fill a fraction of your empty return trips and the system pays for itself in a single quarter.",
      points: [
        "A few audited fuel discrepancies a month can cover the Starter tier",
        "Filled return legs turn dead kilometres into revenue",
      ],
    },
    keywords: [...KW.logistics, "automate operations", "automate reporting"],
    seoTitle: "Fleet & Logistics Software Zimbabwe",
    seoDescription:
      "Fleet management software and logistics software for Zimbabwe. Transport management system, vehicle tracking, dispatch software, and trucking ERP. Fleet automation from $6,000.",
  },

  // ───────────────────────────── DEALERSHIPS ─────────────────────────────
  {
    slug: "car-dealerships",
    number: "03",
    name: "Car Dealership System",
    eyebrow: "For dealers losing leads they paid to get",
    industry: "Automotive",
    icon: "Car",
    accent: "#D4FF3A",
    tint: "#3A0A15",
    headline: "Sell more cars from the same lot.",
    promise:
      "Inventory online around the clock, every lead captured and followed up, and a dealership system that tells you who's selling and what's stuck.",
    problem: {
      lead: "Dealerships lose deals in the gap between a curious buyer and a closed sale.",
      pains: [
        "Managing inventory across paper, WhatsApp, and memory",
        "Leads that go cold because nobody followed up",
        "Advertising vehicles one slow manual post at a time",
        "No clear view of which salesperson is actually performing",
      ],
    },
    outcome: [
      "Your full inventory online and updated in minutes, not days",
      "Every enquiry captured and routed to a salesperson",
      "Sales performance you can see by person and by vehicle",
      "More vehicles sold without more foot traffic",
    ],
    mechanism: {
      lead: "A dealership platform that scales from a public inventory site to full automotive ERP. Proven: we already built Auto Eden.",
      points: [
        "Vehicle inventory platform that publishes 24/7",
        "Lead capture and management with sales dashboards",
        "Marketplace and customer management",
        "Automotive ERP tying inventory, sales, and finance together",
      ],
    },
    tiers: [
      {
        badge: "Starter",
        name: "Vehicle Inventory Platform",
        price: "$3,500",
        includes: [
          "Inventory online 24/7",
          "Vehicle listing management",
          "Lead capture forms",
          "Fast vehicle updates",
        ],
        value: [
          "Inventory online 24/7",
          "Better lead capture",
          "Faster vehicle updates",
        ],
      },
      {
        badge: "Growth",
        name: "Digital Dealership System",
        price: "$7,500",
        carryover: "Everything in Starter, plus:",
        includes: [
          "Marketplace",
          "Lead management",
          "Sales dashboards",
          "Customer management",
        ],
        value: [
          "More vehicle sales",
          "Better sales-team accountability",
        ],
      },
      {
        badge: "Enterprise",
        name: "Automotive ERP",
        price: "$15,000+",
        carryover: "Everything in Growth, plus:",
        includes: [
          "Inventory, sales, and finance in one system",
          "Multi-branch support",
          "Executive reporting",
        ],
        value: [
          "Complete dealership management",
          "Inventory, sales, finance in one system",
          "Executive reporting",
        ],
      },
    ],
    roi: {
      lead: "One extra car sold from leads you were already losing covers the Starter tier outright.",
      points: [
        "Recover the leads that go cold today and the system funds itself",
        "Accountable sales dashboards lift close rates across the team",
      ],
    },
    keywords: [
      "car dealership software Zimbabwe",
      "vehicle inventory software",
      "automotive ERP",
      "dealership management system",
      "lead tracking software",
      "marketplace development",
      ...KW.crm.slice(0, 3),
    ],
    seoTitle: "Car Dealership Software Zimbabwe",
    seoDescription:
      "Dealership management software for Zimbabwe. Vehicle inventory platform, lead tracking, sales dashboards, and automotive ERP. Sell more cars from $3,500.",
  },

  // ───────────────────────────── CONSTRUCTION ─────────────────────────────
  {
    slug: "construction",
    number: "04",
    name: "Construction Management System",
    eyebrow: "For projects that quietly go over budget",
    industry: "Construction",
    icon: "HardHat",
    accent: "#A8C72E",
    tint: "#4F0D18",
    headline: "Know the project is over budget before it is.",
    promise:
      "Site visibility, procurement control, and a construction ERP that catches the overrun while you can still do something about it.",
    problem: {
      lead: "Projects go over budget because management lacks visibility until it's too late to act.",
      pains: [
        "Daily site reality that never reaches the office in time",
        "Procurement and spend tracked after the money is gone",
        "Resources planned in someone's head, not on a system",
        "Multiple projects with no single view of profitability",
      ],
    },
    outcome: [
      "Daily reporting from site to office, automatically",
      "Procurement and budgets tracked as they happen",
      "Resource planning you can actually rely on",
      "Profitability visible across every project at once",
    ],
    mechanism: {
      lead: "A construction platform that grows from site reporting to end-to-end project control.",
      points: [
        "Site management with daily reporting and coordination",
        "Procurement control, budget tracking, and resource planning",
        "Construction ERP for end-to-end, multi-project visibility",
        "Executive reporting on cost, schedule, and profitability",
      ],
    },
    tiers: [
      {
        badge: "Starter",
        name: "Site Management Platform",
        price: "$5,000",
        includes: [
          "Project visibility",
          "Daily reporting",
          "Site coordination",
        ],
        value: [
          "Project visibility",
          "Daily reporting",
          "Better coordination",
        ],
      },
      {
        badge: "Growth",
        name: "Construction Operations Platform",
        price: "$10,000",
        carryover: "Everything in Starter, plus:",
        includes: [
          "Procurement control",
          "Budget tracking",
          "Resource planning",
        ],
        value: [
          "Procurement control",
          "Budget tracking",
          "Resource planning",
        ],
      },
      {
        badge: "Enterprise",
        name: "Construction ERP",
        price: "$20,000+",
        carryover: "Everything in Growth, plus:",
        includes: [
          "End-to-end project control",
          "Multi-project visibility",
          "Financial reporting",
        ],
        value: [
          "End-to-end project control",
          "Multi-project visibility",
          "Better profitability",
        ],
      },
    ],
    roi: {
      lead: "Catching a single budget overrun early can save more than the entire engagement costs.",
      points: [
        "One avoided cost blowout pays for the whole system",
        "Tighter procurement recovers margin on every project",
      ],
    },
    keywords: [...KW.construction, "project management software Zimbabwe", "automate reporting"],
    seoTitle: "Construction Management Software Zimbabwe",
    seoDescription:
      "Construction management software and construction ERP for Zimbabwe. Project management, contractor management, procurement, and budget tracking. From $5,000.",
  },

  // ───────────────────────────── REPLACE EXCEL ─────────────────────────────
  {
    slug: "replace-excel",
    number: "05",
    name: "Replace Excel",
    eyebrow: "The easiest decision you'll make this quarter",
    industry: "Any business",
    icon: "Table",
    accent: "#D4FF3A",
    tint: "#6B1521",
    headline: "We replace Excel with a system built for your business.",
    promise:
      "You don't buy software. You buy freedom from spreadsheets: less admin, faster reporting, fewer errors, real-time access, better decisions.",
    problem: {
      lead: "Spreadsheets are where good businesses go to slow down. Every team has people whose whole day is updating a file.",
      pains: [
        "Hours every week spent updating spreadsheets by hand",
        "Reports that take days because the data lives in ten files",
        "Errors nobody catches until they cost money",
        "No single source of truth, and no real-time access",
      ],
    },
    outcome: [
      "Less admin work",
      "Faster reporting",
      "Reduced errors",
      "Real-time access",
      "Better decision-making",
    ],
    mechanism: {
      lead: "A system built specifically for your business, around the exact process your spreadsheet is failing at.",
      points: [
        "We map the spreadsheet workflow you actually run",
        "We replace it with a system your team uses, not fights",
        "Centralised data, automated reporting, role-based access",
        "Built to grow into a full ERP or CRM when you're ready",
      ],
    },
    tiers: [
      {
        badge: "Fixed scope",
        name: "Excel Replacement System",
        price: "$4,000+",
        suitableFor: "Any team living inside a spreadsheet",
        includes: [
          "Workflow mapping of your current spreadsheet",
          "A custom system built for that exact process",
          "Centralised, real-time data",
          "Automated reporting and exports",
          "Role-based access and audit trail",
        ],
        value: [
          "Less admin work",
          "Faster, error-free reporting",
          "One source of truth your whole team can trust",
        ],
      },
    ],
    roi: {
      lead: "Count the hours your team spends updating spreadsheets, multiply by the salary, and the system pays for itself in months.",
      points: [
        "If it saves one person a day a week, it's saved you a salary's worth of time a year",
        "Fewer reporting errors means fewer expensive surprises",
      ],
    },
    salesAngle:
      "The client doesn't buy software. The client buys freedom from spreadsheets.",
    keywords: [...KW.painPoints, "replace Excel with software", "business process automation"],
    seoTitle: "Replace Excel With Software Zimbabwe",
    seoDescription:
      "Replace Excel spreadsheets with a custom business system. Automate manual processes, reduce data entry, centralise business data, and improve operational efficiency. From $4,000.",
  },

  // ───────────────────────────── ERP ─────────────────────────────
  {
    slug: "erp-development",
    number: "06",
    name: "ERP Development",
    eyebrow: "For businesses that outgrew their tools",
    industry: "Enterprise",
    icon: "Graph",
    accent: "#A8C72E",
    tint: "#6B1521",
    headline: "One system to run the whole business.",
    promise:
      "Inventory, procurement, finance, and operations in a single custom ERP. Built around how your business works, not how some vendor decided it should.",
    problem: {
      lead: "Growing businesses end up with a tool for everything and a system for nothing.",
      pains: [
        "Inventory in one place, finance in another, neither agreeing",
        "Procurement and stock tracked by hand and chronically wrong",
        "Off-the-shelf ERP that fits nobody and costs a fortune to bend",
        "No single view of the business when you need to make a call",
      ],
    },
    outcome: [
      "Inventory, procurement, and finance in one source of truth",
      "Stock and cash positions you can trust in real time",
      "A system shaped to your business, not the other way around",
      "Reporting that answers questions instead of raising them",
    ],
    mechanism: {
      lead: "A custom ERP, built and implemented around your operation.",
      points: [
        "Inventory and procurement management",
        "Finance, reporting, and business management modules",
        "Multi-branch and multi-company support",
        "ERP implementation and consulting, not just code thrown over a wall",
      ],
    },
    tiers: [
      {
        badge: "Starter",
        name: "Core ERP Module",
        price: "$8,000",
        includes: [
          "One core module (inventory, procurement, or finance)",
          "Custom data model for your business",
          "Reporting and exports",
          "Role-based access",
        ],
        value: [
          "Replace the worst spreadsheet first",
          "Real-time visibility on one critical area",
        ],
      },
      {
        badge: "Growth",
        name: "Integrated ERP",
        price: "$18,000",
        carryover: "Everything in Starter, plus:",
        includes: [
          "Multiple integrated modules",
          "Cross-module reporting",
          "Approvals and workflow automation",
          "Multi-branch support",
        ],
        value: [
          "One system across departments",
          "Automated reporting across the business",
        ],
      },
      {
        badge: "Enterprise",
        name: "Full Enterprise ERP",
        price: "$35,000+",
        carryover: "Everything in Growth, plus:",
        includes: [
          "Full finance and accounting",
          "Multi-company support",
          "Executive dashboards and BI",
          "Implementation and change management",
        ],
        value: [
          "Run the entire business from one place",
          "Executive-level, real-time reporting",
        ],
      },
    ],
    roi: {
      lead: "An ERP earns its keep by removing duplicate work and the costly errors that hide between disconnected tools.",
      points: [
        "Stop paying people to re-enter the same data twice",
        "Catch stock and cash discrepancies before they become losses",
      ],
    },
    keywords: [...KW.erp, ...KW.software.slice(0, 6)],
    seoTitle: "ERP Software & Development Zimbabwe",
    seoDescription:
      "Custom ERP development in Zimbabwe. Enterprise resource planning, inventory and procurement management, ERP implementation and consulting. Business management software from $8,000.",
  },

  // ───────────────────────────── CRM ─────────────────────────────
  {
    slug: "crm-development",
    number: "07",
    name: "CRM Development",
    eyebrow: "For sales teams flying blind",
    industry: "Sales",
    icon: "UsersThree",
    accent: "#D4FF3A",
    tint: "#1E5945",
    headline: "Never lose a lead again.",
    promise:
      "A customer relationship management system built around your sales process. Every lead tracked, every follow-up logged, every salesperson accountable.",
    problem: {
      lead: "Most businesses lose more deals to forgotten follow-ups than to lost pitches.",
      pains: [
        "Leads scattered across phones, inboxes, and notebooks",
        "Follow-ups that depend on someone remembering",
        "No idea which salesperson or channel actually converts",
        "Customer history that walks out the door when staff leave",
      ],
    },
    outcome: [
      "Every lead captured and tracked to a clear outcome",
      "Automated follow-ups so nothing goes cold",
      "Sales performance visible by person, channel, and stage",
      "Customer history that stays with the business",
    ],
    mechanism: {
      lead: "A custom CRM, built for how your team actually sells.",
      points: [
        "Lead tracking and a customer management system",
        "Sales pipeline and sales management software",
        "Automated follow-up and reminders",
        "CRM implementation tailored to your process",
      ],
    },
    tiers: [
      {
        badge: "Starter",
        name: "Sales Pipeline CRM",
        price: "$4,500",
        includes: [
          "Lead capture and tracking",
          "Sales pipeline stages",
          "Customer records",
          "Basic reporting",
        ],
        value: [
          "Stop losing leads",
          "See the pipeline at a glance",
        ],
      },
      {
        badge: "Growth",
        name: "Sales Operations CRM",
        price: "$9,000",
        carryover: "Everything in Starter, plus:",
        includes: [
          "Automated follow-ups and reminders",
          "Team performance dashboards",
          "Email and WhatsApp integration",
          "Quotes and proposals",
        ],
        value: [
          "Faster follow-up, higher close rate",
          "Accountable sales team",
        ],
      },
      {
        badge: "Enterprise",
        name: "Revenue Platform",
        price: "$18,000+",
        carryover: "Everything in Growth, plus:",
        includes: [
          "Multi-team and multi-branch support",
          "AI lead scoring and routing",
          "Executive dashboards",
          "Deep integrations with your ERP",
        ],
        value: [
          "Scale sales without losing control",
          "Forecasting you can actually trust",
        ],
      },
    ],
    roi: {
      lead: "Recovering even a small share of the leads you currently let go cold pays for the system many times over.",
      points: [
        "One saved deal a month can cover the Starter tier",
        "Higher close rates compound every month after launch",
      ],
    },
    keywords: [...KW.crm, "AI lead generation", "AI customer support"],
    seoTitle: "CRM Software & Development Zimbabwe",
    seoDescription:
      "Custom CRM development in Zimbabwe. Customer relationship management software, lead tracking, sales management, and CRM implementation. Never lose a lead. From $4,500.",
  },

  // ───────────────────────────── AI AUTOMATION ─────────────────────────────
  {
    slug: "ai-automation",
    number: "08",
    name: "AI Automation",
    eyebrow: "For teams doing work software should do",
    industry: "All industries",
    icon: "Robot",
    accent: "#D4FF3A",
    tint: "#3B2F8C",
    headline: "Automate 70% of the work nobody enjoys.",
    promise:
      "AI that answers customers, qualifies leads, processes documents, and runs the workflows your team is too valuable to keep doing by hand.",
    problem: {
      lead: "Every business has work that's important, repetitive, and a waste of a salaried human's day.",
      pains: [
        "Customer questions answered one slow message at a time",
        "Leads that wait hours for a reply and go elsewhere",
        "Documents and data entered by hand, with the errors that brings",
        "Reports and routine operations that eat whole afternoons",
      ],
    },
    outcome: [
      "Customers answered instantly, around the clock",
      "Leads qualified and followed up the moment they arrive",
      "Documents read, sorted, and entered automatically",
      "Routine reporting and operations that run themselves",
    ],
    mechanism: {
      lead: "AI agents and workflow automation wired into the tools you already use.",
      points: [
        "AI chatbots and WhatsApp AI assistants for customer support and lead generation",
        "ChatGPT and Claude integration into your systems",
        "AI document processing and data entry automation",
        "AI workflow automation across email, WhatsApp, and your databases",
      ],
    },
    tiers: [
      {
        badge: "Starter",
        name: "AI Assistant",
        price: "$3,500",
        includes: [
          "One AI chatbot or WhatsApp AI assistant",
          "Trained on your business and FAQs",
          "Human escalation built in",
          "Customer support or lead capture",
        ],
        value: [
          "Instant replies, 24/7",
          "Never miss a lead again",
        ],
      },
      {
        badge: "Growth",
        name: "AI Automation Suite",
        price: "$9,000",
        carryover: "Everything in Starter, plus:",
        includes: [
          "AI document processing",
          "AI lead qualification and routing",
          "Workflow automation across your tools",
          "ChatGPT / Claude integration",
        ],
        value: [
          "Automate the manual middle of the business",
          "Free your team for work only humans can do",
        ],
      },
      {
        badge: "Enterprise",
        name: "AI Operations Platform",
        price: "$20,000+",
        carryover: "Everything in Growth, plus:",
        includes: [
          "Multiple AI agents across departments",
          "Deep integration with ERP and CRM",
          "Monitoring, audit, and human-in-the-loop controls",
          "AI consulting and ongoing iteration",
        ],
        value: [
          "Scale operations without scaling headcount",
          "A measurable cut in operating cost",
        ],
      },
    ],
    roi: {
      lead: "If AI automates 70% of one role's repetitive work, you've recovered most of a salary, every year, on tap.",
      points: [
        "How many people spend their day on work an assistant could do?",
        "If the system saves one salary a year, it has already paid for itself",
      ],
    },
    salesAngle:
      "How much does that employee cost per year? If the system saves you one salary annually, it pays for itself.",
    keywords: [...KW.ai, "AI automation Harare"],
    seoTitle: "AI Automation & Chatbots Zimbabwe",
    seoDescription:
      "AI automation for Zimbabwe businesses. AI chatbots, WhatsApp AI, AI lead generation, document processing, and workflow automation. ChatGPT & Claude integration from $3,500.",
  },
];

export function findOffer(slug) {
  return OFFERS.find((o) => o.slug === slug);
}

export function adjacentOffers(slug) {
  const idx = OFFERS.findIndex((o) => o.slug === slug);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: OFFERS[(idx - 1 + OFFERS.length) % OFFERS.length],
    next: OFFERS[(idx + 1) % OFFERS.length],
  };
}
