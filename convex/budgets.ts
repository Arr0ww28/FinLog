import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBudgets = query({
  args: { month: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("budgets")
      .withIndex("by_month", (q) => q.eq("month", args.month))
      .collect();
  },
});

export const setBudget = mutation({
  args: {
    category: v.string(),
    limit: v.number(),
    month: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if budget for category and month exists
    const existing = await ctx.db
      .query("budgets")
      .withIndex("by_month", (q) => q.eq("month", args.month))
      .filter((q) => q.eq(q.field("category"), args.category))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { limit: args.limit });
    } else {
      await ctx.db.insert("budgets", args);
    }
  },
});

export const removeBudget = mutation({
  args: { id: v.id("budgets") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
