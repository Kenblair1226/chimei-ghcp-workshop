# Copilot Coding Guidelines — Chi Mei Workshop

## Language & Framework
- TypeScript + Express.js
- Strict mode enabled

## Code Style
- Use `const` over `let` wherever possible; never use `var`
- Prefix unused parameters with `_` (e.g., `_req`)
- All route handlers must have explicit return types or return `void`
- Use async/await instead of raw Promises

## API Design
- All responses must follow the standard envelope format:
  - Success: `{ "data": ... }` or `{ "data": [...], "total": number }`
  - Error: `{ "error": "message", "details": [...] }`
- Use proper HTTP status codes (200, 201, 204, 400, 404, 500)
- Validate ALL external input before processing

## Type Safety
- Do NOT use `any` in route handlers or business logic
- Define explicit interfaces for all request/response payloads
- Use type guards for runtime type checking

## Testing
- Every new endpoint MUST have corresponding tests
- Tests should cover: happy path, validation errors, not-found cases
- Use `beforeEach` to reset state between tests

## Error Handling
- Never expose internal error details to the client
- Log errors to console with context (route, input)
- Return consistent error response shape
