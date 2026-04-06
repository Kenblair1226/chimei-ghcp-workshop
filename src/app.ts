import express from "express";
import healthRouter from "./routes/health";
import productsRouter from "./routes/products";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/products", productsRouter);

export default app;
