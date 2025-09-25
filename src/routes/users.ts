import { Router } from "express";
import { prisma } from "../prisma";
import {
  authMiddleware,
  adminMiddleware,
  AuthRequest,
} from "../middleware/auth.js";

const router = Router();

// Get all users (admin only)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
  });
  res.json(users);
});

// Get own profile
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, role: true, createdAt: true },
  });
  res.json(user);
});

export default router;
