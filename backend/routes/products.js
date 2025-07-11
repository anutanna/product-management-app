import express from "express";
import Product from "../models/Product.js"; 
import auth from "../middleware/authMiddleware.js";

const router = express.Router();
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
// GET all products (protected)
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET single product by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// CREATE product
router.post("/", auth, async (req, res) => {
  try {
    const { name, banner, description, price } = req.body;
    const newProduct = new Product({ name, banner, description, price });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: "Failed to create product" });
  }
});

// UPDATE product
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update product" });
  }
});

// DELETE product
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete product" });
  }
});

export default router;
