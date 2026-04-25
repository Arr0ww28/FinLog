import BudgetMonitor from "@/components/budget/BudgetMonitor";
import { CircleHighlight, UnderlineHighlight } from "@/components/layout/HandDrawnAccents";

export default function BudgetsPage() {
  return (
    <div className="space-y-8 relative">
      <CircleHighlight className="w-64 h-64 -top-12 -right-12" />
      
      <div>
        <h1 className="text-4xl font-black text-foreground relative inline-block">
          Budgets
          <UnderlineHighlight />
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Monitor your spending limits and stay on track.</p>
      </div>

      <BudgetMonitor />
    </div>
  );
}
