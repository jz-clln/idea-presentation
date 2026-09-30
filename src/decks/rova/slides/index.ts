import type { SlideDefinition } from "@/presentation";
import { Bullets, Cards, Closing, Flow, Hero, slide, Tally } from "./templates";

const farms3: Array<[string, string]> = [["Farmer A", "300 kg"], ["Farmer B", "250 kg"], ["Farmer C", "450 kg"]];

/**
 * 12 slides, one idea each:
 * problem -> solution -> how -> difference -> who -> money -> launch -> risks -> moat -> roadmap -> close
 */
export const slides: SlideDefinition[] = [
  slide("opening", "Rova", Hero, {
    notes: "Rova helps buyers get produce from many farms in one shared truckload. Say the tagline, then go straight to the problem.",
  }),

  slide("problem", "The problem", Tally, {
    title: "Farm supply is fragmented.",
    notes: "A buyer needs 1,000 kg of tomatoes. Three farms each have part of it. Today that means many calls, separate deals and half-empty trucks. Everything exists. Nothing is coordinated.",
    need: "1,000 kg tomatoes",
    farms: farms3,
    items: ["Many calls and separate deals", "Half-empty trucks", "Uncertain pickup times"],
    foot: "The farms, the buyer and the trucks all exist. The problem is coordination.",
  }),

  slide("solution", "The solution", Tally, {
    title: "Rova turns 3 farms into 1 delivery.",
    notes: "Same example. Rova combines 300, 250 and 450 kg into one 1,000 kg order. One truck picks it all up and delivers once, Friday before 5 AM.",
    need: "1,000 kg tomatoes",
    farms: farms3,
    chain: ["3 farms", "1 shared truck", "Buyer warehouse"],
    foot: "300 + 250 + 450 = 1,000 kg, delivered Friday before 5 AM.",
  }),

  slide("how", "How it works", Flow, {
    title: "How Rova works",
    notes: "Four steps. Point at step three: consolidation is what Rova does that marketplaces and delivery apps do not.",
    steps: [
      ["Buyer posts a need", "For example, 1,000 kg of tomatoes."],
      ["Farmers offer supply", "Each adds what they can provide."],
      ["Rova consolidates", "Checks quantity, timing and route fit."],
      ["One truck delivers", "Pickups and delivery are confirmed in the app."],
    ],
  }),

  slide("different", "What makes Rova different", Cards, {
    title: "What makes Rova different",
    notes: "Marketplaces link one seller to one buyer. Delivery apps link one sender to one driver. Rova combines many farms into one shared truck for one buyer.",
    cards: [
      { t: "Shopee / Lazada", d: "Marketplace: one seller to one buyer." },
      { t: "Lalamove", d: "Delivery app: one sender to one driver." },
      { t: "Rova", d: "Consolidation: many farms into one shared truck for one buyer.", hl: true },
    ],
    foot: "We coordinate supply and trucks. We don't sell produce or own trucks.",
  }),

  slide("users", "Who Rova serves", Cards, {
    title: "Who Rova serves",
    notes: "Four groups, each with one benefit. Farmers don't need a full truck. Buyers manage one order. Operators run fuller trucks. Cooperatives may be our strongest channel because they already manage many farmers.",
    n: 4,
    cards: [
      { t: "Farmers", d: "Reach buyers without filling a truck." },
      { t: "Buyers", d: "One order instead of many suppliers." },
      { t: "Truck operators", d: "Fuller trucks and fewer empty trips." },
      { t: "Cooperatives", d: "Manage many farmers and shipments in one place." },
    ],
    foot: "Cooperatives may be our strongest channel.",
  }),

  slide("business", "Business model", Cards, {
    title: "How Rova makes money",
    notes: "Main revenue is a small coordination fee on each shared route. The 6,000 and 300 peso figures are an example, not real revenue. Subscriptions and return cargo come later.",
    cards: [
      { t: "Route coordination fee", d: "Example: ₱300 fee on a ₱6,000 truck route.", hl: true },
      { t: "Subscriptions", d: "Buyers, cooperatives and fleet operators pay for dashboards and tools." },
      { t: "Return cargo", d: "Matching loads for trucks that would drive home empty." },
    ],
    foot: "Example figures for illustration, not current revenue.",
  }),

  slide("launch", "Launch plan", Bullets, {
    title: "Start with one anchor buyer",
    notes: "Don't recruit thousands of farmers. Start with one buyer whose weekly demand is known, one destination and one farm cluster, and run it for four to eight weeks. Success is measured by truck use, on-time delivery and margin per route.",
    lead: "Prove it on one route before expanding.",
    items: ["1 buyer, 1 destination", "10–30 farmers in one cluster", "2–3 trucks, 1–2 products", "4–8 week pilot"],
    chain: ["Demand", "Source supply", "Consolidate", "Deliver"],
    sub: "We measure truck utilization, on-time delivery and margin per route.",
    image: "buyer.png",
  }),

  slide("risks", "Risks", Cards, {
    title: "Biggest risks and our answers",
    notes: "Three risks. Not enough routes: start with one corridor. Farmers and buyers going around us: charge for ongoing coordination, not introductions. Unreliable pickups: backup farmers, collection points and proof of delivery.",
    cards: [
      { t: "Route density", d: "Start with one corridor, one buyer and one farm cluster." },
      { t: "Bypass", d: "Charge for ongoing coordination, not one-time introductions." },
      { t: "Reliability", d: "Backup farmers, collection points and proof of delivery." },
    ],
  }),

  slide("moat", "Why Rova wins", Cards, {
    title: "Why Rova gets stronger",
    notes: "More buyers bring more farms and trucks, which makes routes fuller and more reliable. Over time we hold demand, supply and reliability data that a new app can't copy.",
    cards: [
      { t: "Network effect", d: "More buyers, farms and trucks make routes fuller and more reliable." },
      { t: "Data", d: "Demand, supply, route and reliability data build up over time." },
      { t: "Relationships", d: "Cooperatives, buyers and operators are hard to replace." },
    ],
    foot: "The advantage is the data and relationships, not the app.",
  }),

  slide("roadmap", "Roadmap", Flow, {
    title: "Roadmap",
    notes: "Three phases. Prove consolidation works on one route. Make it reliable. Then expand one corridor at a time, only where demand, farms and trucks already exist.",
    n: 3,
    steps: [
      ["Prove it", "Pilot one route: consolidate, deliver, confirm."],
      ["Make it reliable", "Verification, replacement supply, recurring routes."],
      ["Expand", "Add corridors only where demand, farms and trucks exist."],
    ],
    foot: "First we prove consolidation works. Then we grow.",
  }),

  slide("closing", "The vision", Closing, {
    notes: "Individually the farms are small. Together they fill a 1,000 kg order. Rova is a freight coordination platform: a buyer posts a need, farmers contribute, Rova builds one shared load. Start with one buyer, one cluster, one destination, then grow corridor by corridor. End on the last line.",
  }),
];