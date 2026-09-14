// Public marketing content for Reachly, mirrored from the landing page.

export const plans = [
  {
    name: "Starter",
    monthlyPriceUsd: 9.99,
    tag: "For individuals",
    features: [
      "100 email credits/mo",
      "25 phone credits/mo",
      "Chrome extension",
      "CSV export",
      "Email support",
    ],
  },
  {
    name: "Pro",
    monthlyPriceUsd: 20.99,
    tag: "Most popular",
    features: [
      "500 email credits/mo",
      "150 phone credits/mo",
      "Bulk enrichment",
      "CRM integrations",
      "Priority support",
    ],
  },
  {
    name: "Team",
    monthlyPriceUsd: 49,
    tag: "For growing teams",
    features: [
      "2,000 email credits/mo",
      "600 phone credits/mo",
      "5 seats included",
      "Shared lists & workspaces",
      "API access",
    ],
  },
] as const;

export const annualDiscountPercent = 40;
export const freeTrialCredits = 25;

export const features = [
  { title: "Verified emails", description: "Real-time SMTP validation on every export. 97% deliverability guaranteed." },
  { title: "Direct dials", description: "Mobile and office numbers of decision-makers — not switchboards." },
  { title: "LinkedIn enrichment", description: "One-click enrichment from any LinkedIn profile with our browser extension." },
  { title: "Advanced search", description: "Filter 700M+ contacts by role, seniority, tech stack, funding and more." },
  { title: "CRM sync", description: "Native integrations with HubSpot, Salesforce, Pipedrive and Zapier." },
  { title: "GDPR & CCPA", description: "Fully compliant sourcing with a clear opt-out flow for every profile." },
] as const;

export const comparison = [
  { attribute: "Starting price", reachly: "$9.99/mo", signalhire: "$99/mo", zoominfo: "$14,995/yr", contactout: "$29/mo" },
  { attribute: "Verified emails", reachly: "yes", signalhire: "yes", zoominfo: "yes", contactout: "yes" },
  { attribute: "Direct dial phone numbers", reachly: "yes", signalhire: "yes", zoominfo: "yes", contactout: "no" },
  { attribute: "LinkedIn extension", reachly: "yes", signalhire: "yes", zoominfo: "no", contactout: "yes" },
  { attribute: "Bulk enrichment", reachly: "yes", signalhire: "yes", zoominfo: "yes", contactout: "no" },
  { attribute: "CRM integrations", reachly: "yes", signalhire: "no", zoominfo: "yes", contactout: "yes" },
  { attribute: "Free trial credits", reachly: "25", signalhire: "5", zoominfo: "0", contactout: "10" },
  { attribute: "Annual discount", reachly: "40%", signalhire: "20%", zoominfo: "—", contactout: "15%" },
] as const;

export const faqs = [
  {
    question: "How is Reachly so much cheaper than ZoomInfo?",
    answer:
      "We built our data pipeline from the ground up on modern infrastructure, and we sell direct — no enterprise sales team means we can pass those savings on to you.",
  },
  {
    question: "Is the data really verified?",
    answer:
      "Yes. Every email is SMTP-validated at export time, and phone numbers are cross-referenced across multiple sources with a 95%+ accuracy guarantee.",
  },
  {
    question: "Can I use Reachly on my phone?",
    answer:
      "Absolutely. Reachly is a Progressive Web App — install it from your browser and it works like a native app on iOS and Android.",
  },
  {
    question: "Do unused credits roll over?",
    answer: "Yes, on Pro and Team plans unused credits roll over for up to 3 months.",
  },
  {
    question: "Is Reachly GDPR compliant?",
    answer:
      "Yes. We follow strict GDPR and CCPA sourcing rules, and every contact has a documented opt-out path.",
  },
] as const;
