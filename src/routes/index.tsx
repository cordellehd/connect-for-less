import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, X, Search, Shield, Zap, Mail, Phone, Linkedin, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <Comparison />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">R</span>
          Reachly
        </Link>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#compare" className="hover:text-foreground">Compare</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          {signedIn ? (
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate({ to: "/dashboard" })}>
              Open dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate({ to: "/auth" })}>
                Sign in
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate({ to: "/auth" })}>
                Start free
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> 700M+ verified contacts · from $9.99/mo
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Reach anyone. <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>For a fraction of the price.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Verified emails, direct dials, and LinkedIn enrichment for sales and recruiting teams.
            The affordable alternative to SignalHire, ZoomInfo and ContactOut — starting at just $9.99/month.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate({ to: "/auth" })} className="bg-primary text-primary-foreground hover:bg-primary/90" style={{ boxShadow: "var(--shadow-glow)" }}>
              Start free — 25 credits
            </Button>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Get the app
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No credit card required · Cancel anytime · Save 40% annually</p>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl" />
          <img
            src={heroImg}
            alt="Reachly contact intelligence network"
            width={1600}
            height={1200}
            className="relative rounded-2xl border border-border/50 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const names = ["Acme", "Northwind", "Globex", "Umbrella", "Initech", "Hooli"];
  return (
    <div className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">Trusted by teams at</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
          {names.map((n) => (
            <span key={n} className="text-lg font-semibold text-muted-foreground">{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Features() {
  const items = [
    { icon: Mail, title: "Verified emails", body: "Real-time SMTP validation on every export. 97% deliverability guaranteed." },
    { icon: Phone, title: "Direct dials", body: "Mobile and office numbers of decision-makers — not switchboards." },
    { icon: Linkedin, title: "LinkedIn enrichment", body: "One-click enrichment from any LinkedIn profile with our browser extension." },
    { icon: Search, title: "Advanced search", body: "Filter 700M+ contacts by role, seniority, tech stack, funding and more." },
    { icon: Zap, title: "CRM sync", body: "Native integrations with HubSpot, Salesforce, Pipedrive and Zapier." },
    { icon: Shield, title: "GDPR & CCPA", body: "Fully compliant sourcing with a clear opt-out flow for every profile." },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to prospect faster</h2>
        <p className="mt-4 text-muted-foreground">One tool for sales, recruiting and founders — without the enterprise price tag.</p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const rows: [string, boolean | string, boolean | string, boolean | string, boolean | string][] = [
    ["Starting price", "$9.99/mo", "$99/mo", "$14,995/yr", "$29/mo"],
    ["Verified emails", true, true, true, true],
    ["Direct dial phone numbers", true, true, true, false],
    ["LinkedIn extension", true, true, false, true],
    ["Bulk enrichment", true, true, true, false],
    ["CRM integrations", true, false, true, true],
    ["Free trial credits", "25", "5", "0", "10"],
    ["Annual discount", "40%", "20%", "—", "15%"],
  ];
  const cell = (v: boolean | string, highlight = false) =>
    typeof v === "boolean" ? (
      v ? <Check className={`mx-auto h-5 w-5 ${highlight ? "text-primary" : "text-muted-foreground"}`} /> : <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
    ) : (
      <span className={highlight ? "font-semibold text-primary" : "text-muted-foreground"}>{v}</span>
    );
  return (
    <section id="compare" className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we compare</h2>
          <p className="mt-4 text-muted-foreground">The same verified data as the big players — at a price teams can actually afford.</p>
        </div>
        <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left font-medium text-muted-foreground"></th>
                <th className="p-4 text-center">
                  <div className="font-bold text-primary">Reachly</div>
                </th>
                <th className="p-4 text-center font-medium text-muted-foreground">SignalHire</th>
                <th className="p-4 text-center font-medium text-muted-foreground">ZoomInfo</th>
                <th className="p-4 text-center font-medium text-muted-foreground">ContactOut</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, r, s, z, c]) => (
                <tr key={label} className="border-b border-border/60 last:border-0">
                  <td className="p-4 font-medium">{label}</td>
                  <td className="p-4 text-center">{cell(r, true)}</td>
                  <td className="p-4 text-center">{cell(s)}</td>
                  <td className="p-4 text-center">{cell(z)}</td>
                  <td className="p-4 text-center">{cell(c)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Starter",
      price: "9.99",
      tag: "For individuals",
      features: ["100 email credits/mo", "25 phone credits/mo", "Chrome extension", "CSV export", "Email support"],
    },
    {
      name: "Pro",
      price: "20.99",
      tag: "Most popular",
      highlight: true,
      features: ["500 email credits/mo", "150 phone credits/mo", "Bulk enrichment", "CRM integrations", "Priority support"],
    },
    {
      name: "Team",
      price: "49",
      tag: "For growing teams",
      features: ["2,000 email credits/mo", "600 phone credits/mo", "5 seats included", "Shared lists & workspaces", "API access"],
    },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, honest pricing</h2>
        <p className="mt-4 text-muted-foreground">
          Save an extra <span className="font-semibold text-primary">40% when billed annually</span>. No hidden fees, no forced annual contracts.
        </p>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              p.highlight
                ? "border-primary bg-card"
                : "border-border bg-card/60"
            }`}
            style={p.highlight ? { boxShadow: "var(--shadow-glow)" } : undefined}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {p.tag}
              </span>
            )}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            {!p.highlight && <p className="text-sm text-muted-foreground">{p.tag}</p>}
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight">${p.price}</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Billed monthly · 40% off yearly</p>
            <Button
              onClick={() => navigate({ to: "/auth" })}
              className={`mt-6 ${p.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
              variant={p.highlight ? "default" : "outline"}
            >
              Start with {p.name}
            </Button>
            <ul className="mt-8 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Need more volume? <a className="text-primary hover:underline" href="#">Talk to sales</a> about custom Enterprise plans.
      </p>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How is Reachly so much cheaper than ZoomInfo?", a: "We built our data pipeline from the ground up on modern infrastructure, and we sell direct — no enterprise sales team means we can pass those savings on to you." },
    { q: "Is the data really verified?", a: "Yes. Every email is SMTP-validated at export time, and phone numbers are cross-referenced across multiple sources with a 95%+ accuracy guarantee." },
    { q: "Can I use Reachly on my phone?", a: "Absolutely. Reachly is a Progressive Web App — install it from your browser and it works like a native app on iOS and Android." },
    { q: "Do unused credits roll over?", a: "Yes, on Pro and Team plans unused credits roll over for up to 3 months." },
    { q: "Is Reachly GDPR compliant?", a: "Yes. We follow strict GDPR and CCPA sourcing rules, and every contact has a documented opt-out path." },
  ];
  return (
    <section id="faq" className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5 open:border-primary/50">
              <summary className="cursor-pointer list-none font-medium marker:hidden">
                <div className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-primary transition group-open:rotate-45">+</span>
                </div>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded bg-primary text-primary-foreground text-xs font-bold">R</span>
          © {new Date().getFullYear()} Reachly. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
