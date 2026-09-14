import { defineMcp } from "@lovable.dev/mcp-js";
import listPlansTool from "./tools/list-plans";
import listFeaturesTool from "./tools/list-features";
import compareCompetitorsTool from "./tools/compare-competitors";
import searchFaqTool from "./tools/search-faq";

export default defineMcp({
  name: "connect-save",
  title: "Connect & Save",
  version: "0.1.0",
  instructions:
    "Public tools for Reachly, a B2B contact intelligence product. Use `list_plans` for subscription pricing (monthly or annual), `list_features` for product capabilities, `compare_competitors` to compare Reachly with SignalHire, ZoomInfo and ContactOut, and `search_faq` for answers to common questions. All data is public marketing information.",
  tools: [listPlansTool, listFeaturesTool, compareCompetitorsTool, searchFaqTool],
});
