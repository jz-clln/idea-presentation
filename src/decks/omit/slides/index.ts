import type { SlideDefinition } from "@/presentation";
import { Cards, Chips, Compare, Flow, Opening, Points, Product, slide, Vision } from "./templates";

/**
 * 10 slides, one idea each:
 * opening -> problem -> example -> solution -> product -> difference -> Philippines -> who pays -> model -> vision
 */
export const slides: SlideDefinition[] = [
  slide("opening", "Omit", Opening, {
    notes: "Every day, we send IDs, bank statements and other documents containing far more personal information than the recipient actually needs. Omit fixes that.",
  }),

  slide("problem", "The problem", Points, {
    title: "We overshare without realizing it.",
    notes: "The problem isn't that people shouldn't share documents. The problem is that documents were never designed to share only what is necessary. A rental applicant sends a bank statement to prove income, and it carries all of this.",
    lead: "Applying for a rental? A bank statement proves your income. It also reveals:",
    items: ["Bank account number", "Home address", "Full transaction history", "Signature", "QR codes", "Customer or government IDs"],
    foot: "The recipient may need the document. They don't need everything inside it.",
  }),

  slide("example", "One simple example", Compare, {
    title: "You only need to prove your income.",
    notes: "Left is what a landlord needs: name, monthly income, statement date. Right is what the landlord receives today. Three things needed, eight or more exposed.",
    needTitle: "Landlord needs",
    need: ["Name", "Monthly income", "Statement date"],
    gotTitle: "Landlord receives today",
    got: ["Name", "Monthly income", "Statement date", "Account number", "Address", "Transactions", "Signature", "QR code"],
    extraFrom: 3,
    foot: "3 things needed. 8+ things exposed.",
  }),

  slide("solution", "The solution", Flow, {
    title: "Omit creates the safe version automatically.",
    notes: "Five steps. The key one is step two: the user tells Omit why they are sharing the document. Omit doesn't just ask what is sensitive, it asks what the recipient actually needs.",
    n: 5,
    steps: [
      "Upload document",
      "Tell Omit why you're sharing it",
      "Omit finds sensitive information",
      "Review what stays or is hidden",
      "Share the safe copy",
    ],
    foot: "Omit doesn't just ask what is sensitive. It asks what the recipient actually needs.",
  }),

  slide("product", "The product", Product, {
    title: "Privacy before you press send.",
    notes: "This is Omit. The user uploads a document, chooses why they're sharing it, and Omit recommends what should stay visible and what should be removed. Let the image do the talking.",
    callouts: [
      { t: "Purpose-aware protection", d: "Choose why you're sharing, e.g. Rental Application." },
      { t: "Sensitive data detected", d: "Account numbers, addresses, signatures, IDs." },
      { t: "Safe copy generated", d: "Unnecessary information removed." },
    ],
  }),

  slide("different", "What makes Omit different", Cards, {
    title: "Redaction asks what to hide. Omit asks what to show.",
    notes: "Traditional redaction is manual. AI redaction finds sensitive data automatically. Omit goes further: it understands the document, the purpose and the recipient, then recommends the minimum necessary disclosure. This is the most important slide.",
    cards: [
      { t: "Traditional redaction", d: "You find the sensitive information yourself." },
      { t: "AI redaction", d: "AI detects sensitive information automatically." },
      { t: "Omit", d: "Understands the document, purpose and recipient, then recommends the minimum necessary disclosure.", hl: true },
    ],
    foot: "From redaction to intelligent disclosure.",
  }),

  slide("philippines", "Built for the Philippines", Chips, {
    title: "Built for real Philippine documents.",
    notes: "Local privacy needs are different. Omit already recognizes Philippine IDs, numbers and peso transactions. That gives us a believable first market without limiting the company: we add countries one by one.",
    items: [
      "TIN", "SSS Number", "PhilHealth Number", "Pag-IBIG Number", "Government ID information",
      "Bank account numbers", "Signatures", "QR codes", "Addresses", "Peso transactions",
    ],
    foot: "Start in the Philippines. Expand the privacy engine country by country.",
  }),

  slide("customers", "Who pays", Cards, {
    title: "People use Omit. Businesses scale Omit.",
    notes: "Individuals protect their own documents. Businesses that collect sensitive documents all day have the same problem at scale: HR, finance, real estate, healthcare and legal. Consumers build awareness, business workflows create recurring revenue.",
    n: 4,
    cards: [
      { t: "Individuals", d: "Protect IDs, statements and personal documents." },
      { t: "HR and recruitment", d: "Handle applicant and employee documents safely." },
      { t: "Finance and accounting", d: "Protect bank and financial information." },
      { t: "Real estate, healthcare, legal", d: "Collect sensitive documents without unnecessary exposure." },
    ],
    foot: "Consumer adoption creates awareness. Business privacy workflows create recurring revenue.",
  }),

  slide("model", "Business model", Cards, {
    title: "From free tool to privacy infrastructure.",
    notes: "Three levels. Personal is free or a Pro subscription. Teams pay per user for company policies and audit logs. The API and SDK is usage-based, for banks, HR platforms and fintechs that embed Omit. We haven't tested prices yet, so we don't show any.",
    cards: [
      { t: "Personal", tag: "Free / Pro subscription", d: "Safe document sharing and privacy presets." },
      { t: "Teams", tag: "Monthly per-user subscription", d: "Company policies, shared rules, audit logs and admin tools." },
      { t: "API / SDK", tag: "Usage-based pricing", d: "Banks, HR platforms and fintechs embed Omit directly.", hl: true },
    ],
    foot: "SaaS subscriptions + usage-based infrastructure revenue.",
  }),

  slide("vision", "The vision", Vision, {
    notes: "Today Omit protects a document. Tomorrow, Omit can sit between your personal information and everywhere you share it. We want Omit to become the privacy layer people and businesses rely on before data leaves their hands.",
    lines: ["We have protection against dangerous files.", "Omit protects us from dangerous sharing."],
    chips: ["Documents", "Screenshots", "Email attachments", "Cloud uploads", "AI uploads"],
    final: "Share what they need. Omit what they don't.",
  }),
];