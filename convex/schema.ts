import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    date: v.string(), // ISO string
    type: v.union(v.literal("salary"), v.literal("income"), v.literal("expense"), v.literal("deposit")),
    category: v.string(),
    amount: v.number(),
    notes: v.optional(v.string()),
    // specific fields for deposits
    bankName: v.optional(v.string()),
    tenureMonths: v.optional(v.number()),
    interestRate: v.optional(v.number()),
  }).index("by_type", ["type"]).index("by_date", ["date"]),

  budgets: defineTable({
    category: v.string(),
    limit: v.number(),
    month: v.string(), // e.g., "2024-05"
  }).index("by_month", ["month"]),

  investments: defineTable({
    date: v.string(),
    name: v.string(),
    ticker: v.optional(v.string()),
    quantity: v.number(),
    cost: v.number(),
  }),

  goals: defineTable({
    title: v.string(),
    desc: v.optional(v.string()),
    target: v.number(),
    targetDate: v.string(),
    includeInvestments: v.boolean(),
  }),

  recurring: defineTable({
    type: v.union(v.literal("income"), v.literal("expense")),
    category: v.string(),
    amount: v.number(),
    frequency: v.union(v.literal("Monthly"), v.literal("Weekly"), v.literal("Quarterly")),
    lastGenerated: v.optional(v.string()),
    active: v.boolean(),
  }),

  watchlist: defineTable({
    ticker: v.string(),
  }),
});
