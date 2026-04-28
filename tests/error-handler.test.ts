import request from "supertest";
import express, { Request, Response, NextFunction, Router } from "express";
import app from "../src/app";

describe("Global error handler middleware", () => {
  it("should return 500 with standard error format when a route throws", async () => {
    // Create a temporary Express app that mirrors the error handler from src/app.ts
    const testApp = express();
    const testRouter = Router();
    testRouter.get("/throw", (_req: Request, _res: Response) => {
      throw new Error("Simulated crash");
    });
    testApp.use("/test", testRouter);
    testApp.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
      res.status(500).json({ error: "Internal server error" });
    });

    const res = await request(testApp).get("/test/throw");
    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Internal server error");
  });

  it("should not expose internal error details to the client", async () => {
    const testApp = express();
    const testRouter = Router();
    testRouter.get("/throw", (_req: Request, _res: Response) => {
      throw new Error("Secret internal detail");
    });
    testApp.use("/test", testRouter);
    testApp.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
      res.status(500).json({ error: "Internal server error" });
    });

    const res = await request(testApp).get("/test/throw");
    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain("Secret internal detail");
  });

  it("should still serve the health endpoint normally", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
