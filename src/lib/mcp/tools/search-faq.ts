import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { faqs } from "../data";

export default defineTool({
  name: "search_faq",
  title: "Search the FAQ",
  description: "Search Reachly's frequently asked questions about pricing, data accuracy, credits, mobile use and compliance.",
  inputSchema: {
    query: z.string().trim().optional().describe("Keywords to match. Omit to return every FAQ entry."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.toLowerCase() ?? "";
    const matches = q
      ? faqs.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q))
      : [...faqs];
    if (matches.length === 0) {
      return { content: [{ type: "text", text: `No FAQ entry matched "${query}".` }] };
    }
    return {
      content: [{ type: "text", text: matches.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n") }],
      structuredContent: { matches: matches.map((f) => ({ ...f })) },
    };
  },
});
