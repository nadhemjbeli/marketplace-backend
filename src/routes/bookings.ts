import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";

const router = Router();

// Create booking
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { listingId, startDate, endDate } = req.body;

  const booking = await prisma.booking.create({
    data: {
      userId: req.user.id,
      listingId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });
  res.json(booking);
});

// Get all bookings for logged-in user
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user.id },
    include: { listing: true },
  });
  res.json(bookings);
});

export default router;
