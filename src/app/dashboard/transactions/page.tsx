import TransactionLogger from "@/components/transactions/TransactionLogger";
import TransactionHistory from "@/components/transactions/TransactionHistory";
import { CircleHighlight, UnderlineHighlight } from "@/components/layout/HandDrawnAccents";

export default function TransactionsPage() {
  return (
    <div className="space-y-8 relative">
      <CircleHighlight className="w-64 h-64 -top-12 -right-12" />
      
      <div>
        <h1 className="text-4xl font-black text-foreground relative inline-block">
          Transactions
          <UnderlineHighlight />
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Log your income, expenses, and deposits here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TransactionLogger />
        </div>
        <div className="lg:col-span-2">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}
