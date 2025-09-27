import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import fs from "fs";

dotenv.config({ path: "./backend/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware to parse JSON
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Create 'uploads' folder if it doesn't exist
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// DB connection and server start
app.listen(PORT, () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);
  connectDB();
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
