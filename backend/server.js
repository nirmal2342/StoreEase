import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", productRoutes);

// DB connection and server start
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
