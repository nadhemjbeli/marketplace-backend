import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// Create listing
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { title, city, price } = req.body;
  const listing = await prisma.listing.create({
    data: {
      title,
      city,
      price,
      userId: req.user.id,
    },
  });
  res.json(listing);
});

// Get all listings
router.get("/", async (req, res) => {
  const listings = await prisma.listing.findMany({
    include: { user: { select: { id: true, email: true } } },
  });
  res.json(listings);
});

// Get listing by ID
router.get("/:id", async (req, res) => {
  const listing = await prisma.listing.findUnique({
    where: { id: Number(req.params.id) },
    include: { user: { select: { id: true, email: true } } },
  });
  res.json(listing);
});

export default router;
