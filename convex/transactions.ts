import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTransactions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("transactions").order("desc").collect();
  },
});

export const addTransaction = mutation({
  args: {
    date: v.string(),
    type: v.union(v.literal("salary"), v.literal("income"), v.literal("expense"), v.literal("deposit")),
    category: v.string(),
    amount: v.number(),
    notes: v.optional(v.string()),
    bankName: v.optional(v.string()),
    tenureMonths: v.optional(v.number()),
    interestRate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transactions", args);
  },
});

export const removeTransaction = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
