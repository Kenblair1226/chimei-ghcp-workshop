import express, { Request, Response, NextFunction } from "express";
import healthRouter from "./routes/health";
import productsRouter from "./routes/products";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/products", productsRouter);

// Global error handler middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Unhandled error:", { message: err.message, stack: err.stack });
  res.status(500).json({ error: "Internal server error" });
});

export default app;
