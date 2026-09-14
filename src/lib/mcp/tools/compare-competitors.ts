import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { comparison } from "../data";

const competitors = ["signalhire", "zoominfo", "contactout"] as const;

export default defineTool({
  name: "compare_competitors",
  title: "Compare Reachly with competitors",
  description:
    "Compare Reachly against SignalHire, ZoomInfo and ContactOut on price, data coverage, integrations, trial credits and discounts.",
  inputSchema: {
    competitor: z
      .enum(competitors)
      .optional()
      .describe("Limit the comparison to one competitor. Omit to compare against all of them."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ competitor }) => {
    const picked: (typeof competitors)[number][] = competitor ? [competitor] : [...competitors];
    const rows = comparison.map((row) => ({
      attribute: row.attribute as string,
      reachly: row.reachly as string,
      others: Object.fromEntries(picked.map((c) => [c, row[c] as string])) as Record<string, string>,
    }));
    const text = rows
      .map(
        (r) =>
          `${r.attribute}: Reachly ${r.reachly} | ${picked.map((c) => `${c} ${r.others[c]}`).join(" | ")}`,
      )
      .join("\n");
    return { content: [{ type: "text", text }], structuredContent: { rows } };
  },
});
