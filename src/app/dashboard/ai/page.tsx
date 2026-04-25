import AIInsights from "@/components/ai/AIInsights";
import { CircleHighlight, UnderlineHighlight } from "@/components/layout/HandDrawnAccents";

export default function AIPage() {
  return (
    <div className="space-y-8 relative">
      <CircleHighlight className="w-64 h-64 -top-12 -right-12 text-secondary" />
      
      <div>
        <h1 className="text-4xl font-black text-foreground relative inline-block">
          AI Insights
          <UnderlineHighlight />
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Your personal financial advisor.</p>
      </div>

      <AIInsights />
    </div>
  );
}
