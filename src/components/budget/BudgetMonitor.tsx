"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Trash2 } from "lucide-react";

export default function BudgetMonitor() {
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM

  const budgets = useQuery(api.budgets.getBudgets, { month }) as any[] | undefined;
  const transactions = useQuery(api.transactions.getTransactions) as any[] | undefined;
  const setBudget = useMutation(api.budgets.setBudget);
  const removeBudget = useMutation(api.budgets.removeBudget);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!limit || isNaN(Number(limit))) return;

    await setBudget({
      category,
      limit: Number(limit),
      month,
    });
    setLimit("");
  };

  if (budgets === undefined || transactions === undefined) {
    return <div className="animate-pulse h-64 bg-muted rounded-xl"></div>;
  }

  // Calculate spending per category
  const expenses = transactions.filter((t) => t.type === "expense" && t.date.startsWith(month));
  const spendingByCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-foreground">Set New Budget</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
          </select>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Limit (₹)"
            className="flex-1 p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90">
            Set Limit
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((b) => {
          const spent = spendingByCategory[b.category] || 0;
          const percentage = Math.min((spent / b.limit) * 100, 100);
          const isOver = spent > b.limit;
          const isWarning = spent > b.limit * 0.8 && !isOver;

          return (
            <div key={b._id} className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{b.category}</h3>
                  <p className="text-sm text-muted-foreground">₹{spent.toLocaleString()} / ₹{b.limit.toLocaleString()}</p>
                </div>
                <button onClick={() => removeBudget({ id: b._id })} className="text-muted-foreground hover:text-destructive p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isOver ? "bg-destructive" : isWarning ? "bg-amber-500" : "bg-secondary"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className={`text-sm mt-2 font-medium ${isOver ? "text-destructive" : isWarning ? "text-amber-500" : "text-secondary"}`}>
                {isOver ? "Over Budget!" : `${percentage.toFixed(0)}% Used`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
