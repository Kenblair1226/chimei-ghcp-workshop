# 🎁 Bonus Demo：MCP + Copilot 自然語言查詢資料庫

## 概念

透過 MCP（Model Context Protocol）讓 Copilot Chat 直接連接 SQLite 資料庫，
使用者用自然語言提問，Copilot 自動產生 SQL、執行、回傳結果。

## 資料庫 Schema

| 資料表 | 說明 | 筆數 |
|--------|------|------|
| `products` | 產品主檔（ABS、PMMA、PC、PS、SAN、TPE） | 12 |
| `inventory` | 各倉庫庫存量 | ~37 |
| `shipments` | 出貨紀錄（客戶、數量、目的地） | 200 |
| `production` | 生產紀錄（產線、品質等級） | 300 |

## 設定方式

MCP 設定已寫在 `.vscode/mcp.json`，VS Code 開啟此專案後自動生效。

首次使用需安裝 MCP Server：
```bash
npx -y @anthropic-ai/mcp-server-sqlite --db-path ./demo-db/chimei-products.db
```

## 示範提問

在 VS Code Copilot Chat（Agent Mode）中輸入：

### 基本查詢
- 「列出所有 ABS 系列產品的名稱和單價」
- 「目前各倉庫的庫存總量是多少？」
- 「哪個產品的庫存最少？」

### 出貨分析
- 「上個月出貨量最大的前 5 個客戶是誰？」
- 「鴻海精密今年總共訂了多少 ABS 樹脂？」
- 「各產品類別的出貨量佔比是多少？」

### 生產分析
- 「各產線的產量比較，哪條線效率最高？」
- 「品質等級 C 的產品主要出現在哪條產線？」
- 「本月的生產量跟上個月比，成長了多少？」

### 跨表分析
- 「哪些產品的出貨量超過庫存量？可能有缺貨風險？」
- 「台南廠 A 倉的 ABS 樹脂夠供應鴻海下個月的需求嗎？」

## 重新產生資料

```bash
rm demo-db/chimei-products.db
python3 demo-db/seed.py
```
