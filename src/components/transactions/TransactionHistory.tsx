"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Trash2 } from "lucide-react";

export default function TransactionHistory() {
  const transactions = useQuery(api.transactions.getTransactions) as any[] | undefined;
  const removeTransaction = useMutation(api.transactions.removeTransaction);

  if (transactions === undefined) {
    return <div className="animate-pulse h-64 bg-muted rounded-xl"></div>;
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-foreground">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No transactions yet. Log one above!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Type</th>
                <th className="py-3 font-medium">Category</th>
                <th className="py-3 font-medium text-right">Amount</th>
                <th className="py-3 font-medium pl-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 text-sm">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${t.type === 'income' || t.type === 'salary' ? 'bg-secondary/20 text-secondary' : 
                        t.type === 'deposit' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-medium">{t.category}</td>
                  <td className={`py-4 text-right font-bold ${
                    t.type === 'income' || t.type === 'salary' ? 'text-secondary' : 
                    t.type === 'deposit' ? 'text-primary' : 'text-foreground'
                  }`}>
                    {t.type === 'expense' ? '-' : '+'}₹{t.amount.toLocaleString()}
                  </td>
                  <td className="py-4 pl-4">
                    <button 
                      onClick={() => removeTransaction({ id: t._id })}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-md hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
