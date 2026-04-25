import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getGoals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("goals").collect();
  },
});

export const addGoal = mutation({
  args: {
    title: v.string(),
    desc: v.optional(v.string()),
    target: v.number(),
    targetDate: v.string(),
    includeInvestments: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("goals", args);
  },
});

export const removeGoal = mutation({
  args: { id: v.id("goals") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
