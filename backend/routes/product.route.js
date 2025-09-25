import express from "express";
import {
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import multer from "multer";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // images will be stored in uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.post("/", upload.single("image"), createProducts); // For create
router.put("/:id", upload.single("image"), updateProduct); // For update
router.delete("/:id", deleteProduct);

export default router;
