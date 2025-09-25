import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import listingsRoutes from "./routes/listings";
import bookingsRoutes from "./routes/bookings";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/listings", listingsRoutes);
app.use("/bookings", bookingsRoutes);

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
