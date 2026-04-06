import { Router, Request, Response } from "express";
import { productStore } from "../models/product";

const router = Router();

// Get statistics
router.get("/", (req: any, res: any) => {
  const products = productStore.findAll();
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const categories: any = {};

  products.forEach((p) => {
    if (!categories[p.category]) {
      categories[p.category] = { count: 0, totalStock: 0 };
    }
    categories[p.category].count++;
    categories[p.category].totalStock += p.stock;
  });

  res.json({
    totalProducts: products.length,
    totalValue,
    categories,
  });
});

// Restock product — no input validation
router.post("/restock/:id", (req: Request, res: Response) => {
  const quantity = req.body.quantity;
  const product = productStore.findById(req.params.id as string);
  if (!product) {
    res.status(404).send("not found");
    return;
  }
  const updated = productStore.update(req.params.id as string, {
    stock: product.stock + quantity,
  });
  res.json(updated);
});

export default router;
