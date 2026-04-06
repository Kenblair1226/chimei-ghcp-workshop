import express from "express";
import healthRouter from "./routes/health";
import productsRouter from "./routes/products";
import statsRouter from "./routes/stats";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/products", productsRouter);
app.use("/api/stats", statsRouter);

export default app;
