"use client";

import { Sparkles, BrainCircuit, Lightbulb, TrendingUp } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="space-y-8">
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm text-center max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <BrainCircuit className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-black mb-4 text-foreground">AI Financial Advisor</h2>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Get personalized insights, budget optimizations, and investment critiques based on your actual spending habits.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
          <div className="bg-background p-4 rounded-lg border border-border">
            <Lightbulb className="w-6 h-6 text-amber-500 mb-2" />
            <h3 className="font-bold text-foreground">Smart Budgeting</h3>
            <p className="text-sm text-muted-foreground mt-1">Discover areas where you can save more without compromising lifestyle.</p>
          </div>
          <div className="bg-background p-4 rounded-lg border border-border">
            <TrendingUp className="w-6 h-6 text-secondary mb-2" />
            <h3 className="font-bold text-foreground">Portfolio Check</h3>
            <p className="text-sm text-muted-foreground mt-1">Analyze your asset allocation and risk exposure across investments.</p>
          </div>
          <div className="bg-background p-4 rounded-lg border border-border">
            <Sparkles className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-bold text-foreground">Action Plans</h3>
            <p className="text-sm text-muted-foreground mt-1">Get 30-day actionable steps to reach your financial goals faster.</p>
          </div>
        </div>

        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center mx-auto space-x-2">
          <span>Connect AI Model</span>
          <span className="bg-primary-foreground/20 text-xs px-2 py-1 rounded-full ml-2">Coming Soon</span>
        </button>
      </div>
    </div>
  );
}
