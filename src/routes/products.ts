import { Router, Request, Response } from "express";
import { productStore } from "../models/product";
import { validateCreateProduct, validateUpdateProduct } from "../utils/validator";

const router = Router();

interface ProductListQuery {
  page?: string;
  pageSize?: string;
}

function parsePositiveInt(value: string, name: string): { value: number } | { error: string } {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return { error: `${name} must be a positive integer` };
  }
  return { value: parsed };
}

// List all products with pagination
router.get("/", (req: Request<object, object, object, ProductListQuery>, res: Response): void => {
  const rawPage = req.query.page ?? "1";
  const rawPageSize = req.query.pageSize ?? "10";

  const pageResult = parsePositiveInt(rawPage, "page");
  const pageSizeResult = parsePositiveInt(rawPageSize, "pageSize");

  const details: string[] = [];
  if ("error" in pageResult) details.push(pageResult.error);
  if ("error" in pageSizeResult) details.push(pageSizeResult.error);

  if (details.length > 0) {
    res.status(400).json({ error: "Invalid pagination parameters", details });
    return;
  }

  const page = (pageResult as { value: number }).value;
  const pageSize = (pageSizeResult as { value: number }).value;

  const all = productStore.findAll();
  const total = all.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = all.slice(start, start + pageSize);

  res.json({ data, total, page, pageSize, totalPages });
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
