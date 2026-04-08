# 🏭 奇美實業 GitHub Copilot Workshop — 產品庫存管理 API

> 奇美實業 GitHub Copilot Workshop 展示專案

使用 TypeScript + Express 建構的簡易產品庫存管理 API，專為展示 GitHub Copilot 功能而設計。

## 快速開始

```bash
npm install
npm run dev       # 啟動開發伺服器
npm run verify    # 建置 + Lint 檢查 + 測試
```

## API 端點

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/health` | 健康檢查 |
| GET | `/api/products` | 取得所有產品 |
| GET | `/api/products/:id` | 依 ID 取得產品 |
| POST | `/api/products` | 新增產品 |
| PUT | `/api/products/:id` | 更新產品 |
| DELETE | `/api/products/:id` | 刪除產品 |

## Workshop 分支說明

| 分支 | 用途 |
|------|------|
| `main` | ✅ 穩定基線（所有測試通過） |
| `demo/sre-broken` | 💥 CI 故障版 — SRE Agent 展示用 |
| `demo/review-bad-pr` | 👀 有問題的程式碼 — Code Review 展示用 |

## Workshop 議程

### Part 1 — Agentic Workflow 實戰（80 min）
GitHub Copilot Coding Agent：Issue → 自動撰寫程式碼 → 提交 PR

### Part 2 — 自治式 SRE Agent（70 min）
CI 失敗 → Agent 分析日誌 → 自動修復 → 提交 PR

### Part 3 — 自動化 Code Review（40 min）
Copilot 依據團隊規範自動審查 PR

## 重置 Demo

```bash
git checkout main
git pull origin main
```
