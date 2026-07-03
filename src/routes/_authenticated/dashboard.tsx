import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, CreditCard, Search, Users } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — Reachly" }] }),
});

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const stats = [
    { icon: Search, label: "Searches this month", value: "0" },
    { icon: Users, label: "Contacts saved", value: "0" },
    { icon: CreditCard, label: "Credits remaining", value: "25" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">R</span>
            Reachly
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center gap-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" /> Welcome to Reachly
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Hi{email ? `, ${email.split("@")[0]}` : ""} 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          You're on the <span className="font-semibold text-foreground">Free trial</span> — 25 credits to test the platform.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{label}</p>
              <p className="mt-1 text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/40 bg-card p-8">
          <h2 className="text-xl font-semibold">Ready to upgrade?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Unlock 500+ contact credits, bulk enrichment, and CRM sync from just $20.99/mo.
          </p>
          <Button className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link to="/">View pricing</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}