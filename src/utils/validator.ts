export interface ValidationError {
  field: string;
  message: string;
}

export function validateCreateProduct(
  body: unknown
): ValidationError[] {
  const errors: ValidationError[] = [];
  const input = body as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return [{ field: "body", message: "Request body must be a JSON object" }];
  }

  if (typeof input.name !== "string" || input.name.trim().length === 0) {
    errors.push({ field: "name", message: "Name is required and must be a non-empty string" });
  }

  if (typeof input.category !== "string" || input.category.trim().length === 0) {
    errors.push({ field: "category", message: "Category is required and must be a non-empty string" });
  }

  if (typeof input.price !== "number" || input.price <= 0) {
    errors.push({ field: "price", message: "Price must be a positive number" });
  }

  if (typeof input.stock !== "number" || !Number.isInteger(input.stock) || input.stock < 0) {
    errors.push({ field: "stock", message: "Stock must be a non-negative integer" });
  }

  return errors;
}

export function validateUpdateProduct(
  body: unknown
): ValidationError[] {
  const errors: ValidationError[] = [];
  const input = body as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return [{ field: "body", message: "Request body must be a JSON object" }];
  }

  if (input.name !== undefined && (typeof input.name !== "string" || input.name.trim().length === 0)) {
    errors.push({ field: "name", message: "Name must be a non-empty string" });
  }

  if (input.category !== undefined && (typeof input.category !== "string" || input.category.trim().length === 0)) {
    errors.push({ field: "category", message: "Category must be a non-empty string" });
  }

  if (input.price !== undefined && (typeof input.price !== "number" || input.price < 0)) {
    errors.push({ field: "price", message: "Price must be a non-negative number" });
  }

  if (input.stock !== undefined && (typeof input.stock !== "number" || !Number.isInteger(input.stock) || input.stock < 0)) {
    errors.push({ field: "stock", message: "Stock must be a non-negative integer" });
  }

  return errors;
}
