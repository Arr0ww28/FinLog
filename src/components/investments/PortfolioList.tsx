"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Trash2, Plus, TrendingUp } from "lucide-react";

export default function PortfolioList() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const investments = useQuery(api.investments.getInvestments) as any[] | undefined;
  const addInvestment = useMutation(api.investments.addInvestment);
  const removeInvestment = useMutation(api.investments.removeInvestment);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || isNaN(Number(quantity)) || isNaN(Number(cost))) return;

    await addInvestment({
      date,
      name,
      ticker: ticker.toUpperCase(),
      quantity: Number(quantity),
      cost: Number(cost),
    });

    setName("");
    setTicker("");
    setQuantity("");
    setCost("");
  };

  if (investments === undefined) {
    return <div className="animate-pulse h-64 bg-muted rounded-xl"></div>;
  }

  const totalCost = investments.reduce((sum, inv) => sum + inv.cost, 0);

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-foreground flex items-center">
          <Plus className="mr-2 text-primary" /> Log Investment
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Asset Name (e.g. S&P 500)"
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Ticker (Optional, e.g. VOO)"
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring uppercase"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Total Cost (₹)"
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <div className="md:col-span-3 lg:col-span-5">
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 mt-2">
              Add to Portfolio
            </button>
          </div>
        </form>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
          <h2 className="text-xl font-bold text-foreground flex items-center">
            <TrendingUp className="mr-2 text-primary" /> Current Holdings
          </h2>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-medium">Total Invested</p>
            <p className="text-2xl font-black text-foreground">₹{totalCost.toLocaleString()}</p>
          </div>
        </div>
        
        {investments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No investments logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground bg-muted/10">
                  <th className="py-4 px-6 font-medium">Asset</th>
                  <th className="py-4 px-6 font-medium">Ticker</th>
                  <th className="py-4 px-6 font-medium text-right">Quantity</th>
                  <th className="py-4 px-6 font-medium text-right">Total Cost</th>
                  <th className="py-4 px-6 font-medium text-right">Avg Price</th>
                  <th className="py-4 px-6 font-medium pl-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => (
                  <tr key={inv._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6 font-medium">{inv.name}</td>
                    <td className="py-4 px-6">
                      {inv.ticker ? (
                        <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-md text-xs font-bold border border-secondary/20">
                          {inv.ticker}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">{inv.quantity.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right font-bold">₹{inv.cost.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right text-muted-foreground text-sm">
                      ₹{(inv.cost / inv.quantity).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6 pl-8">
                      <button 
                        onClick={() => removeInvestment({ id: inv._id })}
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
    </div>
  );
}
