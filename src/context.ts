import type { Request } from "express";
import { verifyToken } from "./utils/jwt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  user: { id: number; role: string } | null;
}

export const createContext = ({ req }: { req: Request }): Context => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  const user = token ? verifyToken(token) : null;

  return { prisma, user };
};
