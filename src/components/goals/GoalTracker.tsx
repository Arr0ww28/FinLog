"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Target, Trash2, Calendar } from "lucide-react";

export default function GoalTracker() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const goals = useQuery(api.goals.getGoals) as any[] | undefined;
  const transactions = useQuery(api.transactions.getTransactions) as any[] | undefined;
  const addGoal = useMutation(api.goals.addGoal);
  const removeGoal = useMutation(api.goals.removeGoal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target || isNaN(Number(target))) return;

    await addGoal({
      title,
      desc,
      target: Number(target),
      targetDate,
      includeInvestments: false,
    });
    
    setTitle("");
    setDesc("");
    setTarget("");
    setTargetDate("");
  };

  if (goals === undefined || transactions === undefined) {
    return <div className="animate-pulse h-64 bg-muted rounded-xl"></div>;
  }

  // Calculate current savings towards goals
  // Simple calculation: Total Income - Total Expenses
  const income = transactions.filter(t => t.type === 'income' || t.type === 'salary').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalSaved = Math.max(income - expenses, 0);

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-foreground flex items-center">
          <Target className="mr-2 text-primary" /> Create New Goal
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal Title (e.g. New Car)"
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target Amount (₹)"
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short Description"
            className="p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring"
          />
          <div className="md:col-span-2 mt-2">
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90">
              Add Goal
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          // For now, distribute total savings evenly or simply show total savings against each goal
          // A more complex app would let you allocate funds to specific goals
          const percentage = Math.min((totalSaved / goal.target) * 100, 100);
          
          return (
            <div key={goal._id} className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden group">
              <button 
                onClick={() => removeGoal({ id: goal._id })} 
                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <h3 className="font-bold text-2xl text-foreground">{goal.title}</h3>
              {goal.desc && <p className="text-muted-foreground mt-1">{goal.desc}</p>}
              
              <div className="mt-6 flex justify-between items-end mb-2">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Progress</p>
                  <p className="font-black text-xl text-primary">₹{totalSaved.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ ₹{goal.target.toLocaleString()}</span></p>
                </div>
                <div className="flex items-center text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(goal.targetDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </div>
              </div>
              
              <div className="h-4 w-full bg-muted rounded-full overflow-hidden mt-2 relative">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-right text-sm mt-2 font-bold text-primary">{percentage.toFixed(1)}%</p>
            </div>
          );
        })}
        {goals.length === 0 && (
          <div className="md:col-span-2 text-center py-12 text-muted-foreground bg-card rounded-xl border border-dashed border-border">
            No goals set yet. What are you saving for?
          </div>
        )}
      </div>
    </div>
  );
}
