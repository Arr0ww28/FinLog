"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function TransactionLogger() {
  const addTransaction = useMutation(api.transactions.addTransaction);
  const [type, setType] = useState<"income" | "expense" | "salary" | "deposit">("expense");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    await addTransaction({
      type,
      category: type === "salary" ? "Salary" : category,
      amount: Number(amount),
      date,
      notes,
    });
    
    setAmount("");
    setNotes("");
    alert("Transaction added!");
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden">
      <h2 className="text-xl font-bold mb-6 text-foreground relative z-10">Log Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="flex gap-4 mb-4">
          {["expense", "income", "salary", "deposit"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t as any)}
              className={`flex-1 py-2 rounded-lg capitalize font-medium transition-colors ${
                type === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>

        {type !== "salary" && type !== "deposit" && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {type === "expense" ? (
                <>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Rent">Rent</option>
                </>
              ) : (
                <>
                  <option value="Freelance">Freelance</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Gift">Gift</option>
                  <option value="Interest">Interest</option>
                </>
              )}
            </select>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Notes (Optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What was this for?"
            className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all mt-4"
        >
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </form>
    </div>
  );
}
