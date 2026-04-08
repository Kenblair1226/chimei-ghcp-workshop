# Copilot 程式碼規範 — 奇美實業 Workshop

## 語言與框架
- TypeScript + Express.js
- 啟用嚴格模式（strict mode）

## 程式碼風格
- 盡量使用 `const`，避免使用 `let`；禁止使用 `var`
- 未使用的參數以 `_` 開頭命名（例如 `_req`）
- 所有 route handler 必須明確標示回傳型別或回傳 `void`
- 使用 async/await，不要直接使用 raw Promise

## API 設計規範
- 所有回應必須遵循標準封裝格式：
  - 成功：`{ "data": ... }` 或 `{ "data": [...], "total": number }`
  - 錯誤：`{ "error": "錯誤訊息", "details": [...] }`
- 使用正確的 HTTP 狀態碼（200、201、204、400、404、500）
- 處理前必須驗證所有外部輸入

## 型別安全
- 禁止在 route handler 或商業邏輯中使用 `any`
- 為所有 request/response 定義明確的 interface
- 使用 type guard 進行執行期型別檢查

## 測試規範
- 每個新增的 endpoint 都必須有對應的測試
- 測試應涵蓋：正常流程、驗證錯誤、資料不存在的情況
- 使用 `beforeEach` 在每個測試之間重置狀態

## 錯誤處理
- 禁止將內部錯誤細節暴露給客戶端
- 錯誤日誌需包含上下文資訊（route 路徑、輸入參數）
- 回傳一致的錯誤回應格式
