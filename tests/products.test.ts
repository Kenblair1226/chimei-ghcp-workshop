import request from "supertest";
import app from "../src/app";
import { productStore } from "../src/models/product";

beforeEach(() => {
  productStore.reset();
});

describe("GET /api/products", () => {
  it("should return all seeded products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
    expect(res.body.total).toBe(5);
  });
});

describe("GET /api/products/:id", () => {
  it("should return a product by ID", async () => {
    const res = await request(app).get("/api/products/PROD-0001");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("ABS 樹脂 PA-757");
  });

  it("should return 404 for non-existent product", async () => {
    const res = await request(app).get("/api/products/PROD-9999");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Product not found");
  });
});

describe("POST /api/products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: "SAN 樹脂 SN-100",
      category: "SAN",
      price: 950,
      stock: 4000,
    };
    const res = await request(app)
      .post("/api/products")
      .send(newProduct);
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("SAN 樹脂 SN-100");
    expect(res.body.data.id).toMatch(/^PROD-/);
  });

  it("should reject invalid input", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "", price: -1 });
    expect(res.status).toBe(400);
    expect(res.body.details.length).toBeGreaterThan(0);
  });
});

describe("PUT /api/products/:id", () => {
  it("should update an existing product", async () => {
    const res = await request(app)
      .put("/api/products/PROD-0001")
      .send({ price: 1300 });
    expect(res.status).toBe(200);
    expect(res.body.data.price).toBe(1300);
  });

  it("should return 404 for non-existent product", async () => {
    const res = await request(app)
      .put("/api/products/PROD-9999")
      .send({ price: 100 });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/products/:id", () => {
  it("should delete an existing product", async () => {
    const res = await request(app).delete("/api/products/PROD-0001");
    expect(res.status).toBe(204);

    const check = await request(app).get("/api/products/PROD-0001");
    expect(check.status).toBe(404);
  });

  it("should return 404 for non-existent product", async () => {
    const res = await request(app).delete("/api/products/PROD-9999");
    expect(res.status).toBe(404);
  });
});
