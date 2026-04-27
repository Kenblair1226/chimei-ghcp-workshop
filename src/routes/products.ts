import { Router, Request, Response } from "express";
import { productStore } from "../models/product";
import { validateCreateProduct, validateUpdateProduct } from "../utils/validator";

const router = Router();

// List all products
router.get("/", (_req: Request, res: Response) => {
  const products = productStore.findAll();
  res.json({ data: products, total: products.length });
});

// Search products by name
router.get("/search", (req: Request, res: Response): void => {
  const name = typeof req.query.name === "string" ? req.query.name : "";
  const products = name ? productStore.findByName(name) : productStore.findAll();
  res.json({ data: products, total: products.length });
});

// Get product by ID
router.get("/:id", (req: Request, res: Response) => {
  const product = productStore.findById(req.params.id as string);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ data: product });
});

// Create product
router.post("/", (req: Request, res: Response) => {
  const errors = validateCreateProduct(req.body);
  if (errors.length > 0) {
    res.status(400).json({ error: "Validation failed", details: errors });
    return;
  }
  const product = productStore.create(req.body);
  res.status(201).json({ data: product });
});

// Update product
router.put("/:id", (req: Request, res: Response) => {
  const errors = validateUpdateProduct(req.body);
  if (errors.length > 0) {
    res.status(400).json({ error: "Validation failed", details: errors });
    return;
  }
  const product = productStore.update(req.params.id as string, req.body);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ data: product });
});

// Delete product
router.delete("/:id", (req: Request, res: Response) => {
  const deleted = productStore.delete(req.params.id as string);
  if (!deleted) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.status(204).send();
});

export default router;
