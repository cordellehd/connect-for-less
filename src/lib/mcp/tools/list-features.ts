import { defineTool } from "@lovable.dev/mcp-js";
import { features } from "../data";

export default defineTool({
  name: "list_features",
  title: "List product features",
  description: "List Reachly's product features, such as verified emails, direct dials, CRM sync and compliance.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: features.map((f) => `${f.title}: ${f.description}`).join("\n") }],
    structuredContent: { features: features.map((f) => ({ ...f })) },
  }),
});
