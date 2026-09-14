import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { annualDiscountPercent, freeTrialCredits, plans } from "../data";

export default defineTool({
  name: "list_plans",
  title: "List subscription plans",
  description:
    "List Reachly's public subscription plans with monthly prices, included credits and features, optionally priced with the annual discount applied.",
  inputSchema: {
    billing: z
      .enum(["monthly", "annual"])
      .default("monthly")
      .describe("Which billing cycle to price the plans for."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ billing }) => {
    const factor = billing === "annual" ? 1 - annualDiscountPercent / 100 : 1;
    const priced = plans.map((p) => ({
      name: p.name,
      tag: p.tag,
      billing,
      pricePerMonthUsd: Number((p.monthlyPriceUsd * factor).toFixed(2)),
      features: [...p.features],
    }));
    const summary = priced
      .map((p) => `${p.name} — $${p.pricePerMonthUsd}/mo (${p.tag}): ${p.features.join(", ")}`)
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `${summary}\n\nAnnual billing saves ${annualDiscountPercent}%. Free trial includes ${freeTrialCredits} credits.`,
        },
      ],
      structuredContent: { plans: priced, annualDiscountPercent, freeTrialCredits },
    };
  },
});
