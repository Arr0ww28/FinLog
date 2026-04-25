import PortfolioList from "@/components/investments/PortfolioList";
import { CircleHighlight, UnderlineHighlight } from "@/components/layout/HandDrawnAccents";

export default function InvestmentsPage() {
  return (
    <div className="space-y-8 relative">
      <CircleHighlight className="w-64 h-64 -top-12 -right-12" />
      
      <div>
        <h1 className="text-4xl font-black text-foreground relative inline-block">
          Investments
          <UnderlineHighlight />
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Track your stock and fund portfolio.</p>
      </div>

      <PortfolioList />
    </div>
  );
}
