"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function OverviewCards() {
  const transactions = useQuery(api.transactions.getTransactions) as any[] | undefined;

  if (transactions === undefined) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse h-32 bg-muted rounded-xl"></div>
        ))}
      </div>
    );
  }

  const income = transactions.filter(t => t.type === 'income' || t.type === 'salary').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const deposits = transactions.filter(t => t.type === 'deposit').reduce((acc, t) => acc + t.amount, 0);
  
  // Need to also subtract investments to calculate true liquid, but investments are not added yet.
  const liquid = income - expenses - deposits;

  const cards = [
    { title: "Liquid Balance", amount: liquid, icon: Wallet, color: "text-foreground", bg: "bg-background" },
    { title: "Total Income", amount: income, icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
    { title: "Total Expenses", amount: expenses, icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
    { title: "Deposits", amount: deposits, icon: PiggyBank, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center space-x-4">
          <div className={`p-4 rounded-full ${card.bg}`}>
            <card.icon className={`w-8 h-8 ${card.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
            <h3 className={`text-2xl font-black ${card.color}`}>₹{card.amount.toLocaleString()}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
