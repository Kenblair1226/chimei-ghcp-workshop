export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface UpdateProductInput {
  name?: string;
  category?: string;
  price?: number;
  stock?: number;
}

class ProductStore {
  private products: Map<string, Product> = new Map();
  private counter = 0;

  constructor() {
    this.seed();
  }

  private seed(): void {
    const seedData: CreateProductInput[] = [
      { name: "ABS 樹脂 PA-757", category: "ABS", price: 1200, stock: 5000 },
      { name: "PMMA 壓克力 CM-205", category: "PMMA", price: 1800, stock: 3000 },
      { name: "PC 聚碳酸酯 PC-110", category: "PC", price: 2200, stock: 2000 },
      { name: "PS 聚苯乙烯 PG-33", category: "PS", price: 800, stock: 8000 },
      { name: "ABS 樹脂 PA-747", category: "ABS", price: 1150, stock: 6000 },
    ];
    for (const item of seedData) {
      this.create(item);
    }
  }

  reset(): void {
    this.products.clear();
    this.counter = 0;
    this.seed();
  }

  findAll(): Product[] {
    return Array.from(this.products.values());
  }

  findById(id: string): Product | undefined {
    return this.products.get(id);
  }

  create(input: CreateProductInput): Product {
    this.counter++;
    const id = `PROD-${String(this.counter).padStart(4, "0")}`;
    const now = new Date();
    const product: Product = {
      id,
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    this.products.set(id, product);
    return product;
  }

  update(id: string, input: UpdateProductInput): Product | undefined {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updated: Product = {
      ...product,
      ...input,
      updatedAt: new Date(),
    };
    this.products.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.products.delete(id);
  }
}

export const productStore = new ProductStore();
