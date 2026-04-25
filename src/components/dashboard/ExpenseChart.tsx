"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function ExpenseChart() {
  const transactions = useQuery(api.transactions.getTransactions) as any[] | undefined;

  if (transactions === undefined) {
    return <div className="animate-pulse h-[400px] bg-muted rounded-xl"></div>;
  }

  const expenses = transactions.filter(t => t.type === 'expense');
  
  // Group by category
  const grouped = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(grouped).map(key => ({
    name: key,
    amount: grouped[key]
  })).sort((a, b) => b.amount - a.amount);

  const colors = ["#35858E", "#7DA78C", "#C2D099", "#E6EEC9", "#215C63", "#5A7465"];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-foreground">Spending by Category</h2>
      
      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          No expenses logged yet.
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} tick={{ fill: 'var(--muted-foreground)' }} />
              <Tooltip 
                cursor={{ fill: 'var(--muted)' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
