import type { Context } from "../context.js";
import { hashPassword, comparePassword, signToken } from "../utils/jwt.js";

export const resolvers = {
  Query: {
    users: async (_parent: any, _args: any, ctx: Context) => {
      if (!ctx.user || ctx.user.role !== "ADMIN")
        throw new Error("Not authorized");
      return ctx.prisma.user.findMany();
    },
    listings: (_parent: any, _args: any, ctx: Context) =>
      ctx.prisma.listing.findMany(),
    bookings: (_parent: any, _args: any, ctx: Context) => {
      if (!ctx.user) throw new Error("Not authorized");
      return ctx.prisma.booking.findMany({ where: { userId: ctx.user.id } });
    },
  },

  Mutation: {
    register: async (_parent: any, args: any, ctx: Context) => {
      const hashed = await hashPassword(args.password);
      return ctx.prisma.user.create({
        data: { name: args.name, email: args.email, password: hashed },
      });
    },

    login: async (_parent: any, args: any, ctx: Context) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) throw new Error("Invalid credentials");
      const valid = await comparePassword(args.password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      return signToken({ id: user.id, role: user.role });
    },

    createListing: async (_parent: any, args: any, ctx: Context) => {
      if (!ctx.user) throw new Error("Not authorized");
      return ctx.prisma.listing.create({
        data: { ...args, userId: ctx.user.id },
      });
    },

    bookListing: async (_parent: any, args: any, ctx: Context) => {
      if (!ctx.user) throw new Error("Not authorized");
      return ctx.prisma.booking.create({
        data: {
          listingId: args.listingId,
          userId: ctx.user.id,
          startDate: new Date(args.startDate),
          endDate: new Date(args.endDate),
        },
      });
    },
  },
};
