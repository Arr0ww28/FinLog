import OverviewCards from "@/components/dashboard/OverviewCards";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import { CircleHighlight, UnderlineHighlight } from "@/components/layout/HandDrawnAccents";

export default function DashboardPage() {
  return (
    <div className="space-y-8 relative">
      <CircleHighlight className="w-96 h-96 -top-24 -right-24 opacity-10" />
      
      <div>
        <h1 className="text-4xl font-black text-foreground relative inline-block">
          Overview
          <UnderlineHighlight />
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Welcome back! Here's your financial snapshot.</p>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpenseChart />
        {/* We can add another chart here in the future, e.g. Income vs Expense line chart */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col justify-center items-center text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">More Insights Coming Soon</h3>
            <p className="text-muted-foreground max-w-sm">
                We'll be adding trend analysis and budget tracking visualizations here shortly.
            </p>
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-muted flex items-center justify-center animate-[spin_10s_linear_infinite]">
                <span className="text-3xl">✨</span>
            </div>
        </div>
      </div>
    </div>
  );
}
