import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getInvestments = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("investments").collect();
  },
});

export const addInvestment = mutation({
  args: {
    date: v.string(),
    name: v.string(),
    ticker: v.optional(v.string()),
    quantity: v.number(),
    cost: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("investments", args);
  },
});

export const removeInvestment = mutation({
  args: { id: v.id("investments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getWatchlist = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("watchlist").collect();
  },
});

export const addToWatchlist = mutation({
  args: { ticker: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("watchlist").filter(q => q.eq(q.field("ticker"), args.ticker)).first();
    if (!existing) {
      await ctx.db.insert("watchlist", { ticker: args.ticker });
    }
  },
});

export const removeFromWatchlist = mutation({
  args: { id: v.id("watchlist") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
