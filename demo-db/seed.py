"""
奇美實業 Workshop — 產品庫存 Demo 資料庫產生器
執行後會在 demo-db/ 產生 chimei-products.db
"""
import sqlite3
import random
from datetime import datetime, timedelta

DB_PATH = "demo-db/chimei-products.db"

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

# 產品主檔
c.execute("""
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    grade TEXT NOT NULL,
    unit_price REAL NOT NULL,
    unit TEXT DEFAULT 'kg',
    created_at TEXT NOT NULL
)
""")

# 庫存
c.execute("""
CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL REFERENCES products(id),
    warehouse TEXT NOT NULL,
    quantity REAL NOT NULL,
    updated_at TEXT NOT NULL
)
""")

# 出貨紀錄
c.execute("""
CREATE TABLE IF NOT EXISTS shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL REFERENCES products(id),
    customer TEXT NOT NULL,
    quantity REAL NOT NULL,
    ship_date TEXT NOT NULL,
    destination TEXT NOT NULL
)
""")

# 生產紀錄
c.execute("""
CREATE TABLE IF NOT EXISTS production (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL REFERENCES products(id),
    line TEXT NOT NULL,
    quantity REAL NOT NULL,
    production_date TEXT NOT NULL,
    quality_grade TEXT DEFAULT 'A'
)
""")

# === Seed Data ===

products = [
    ("ABS-757",  "ABS 樹脂 PA-757",    "ABS",  "通用級", 1200),
    ("ABS-747",  "ABS 樹脂 PA-747",    "ABS",  "通用級", 1150),
    ("ABS-758H", "ABS 樹脂 PA-758H",   "ABS",  "耐熱級", 1400),
    ("ABS-765",  "ABS 樹脂 PA-765",    "ABS",  "高流動", 1250),
    ("PMMA-205", "PMMA 壓克力 CM-205", "PMMA", "光學級", 1800),
    ("PMMA-211", "PMMA 壓克力 CM-211", "PMMA", "導光板", 2100),
    ("PC-110",   "PC 聚碳酸酯 PC-110", "PC",   "通用級", 2200),
    ("PC-120",   "PC 聚碳酸酯 PC-120", "PC",   "高透明", 2500),
    ("PS-33",    "PS 聚苯乙烯 PG-33",  "PS",   "通用級",  800),
    ("PS-55",    "PS 聚苯乙烯 PG-55",  "PS",   "高衝擊",  950),
    ("SAN-100",  "SAN 樹脂 SN-100",    "SAN",  "通用級",  900),
    ("TPE-200",  "TPE 彈性體 TE-200",  "TPE",  "通用級", 1600),
]

now = datetime.now()
for pid, name, cat, grade, price in products:
    created = (now - timedelta(days=random.randint(180, 720))).strftime("%Y-%m-%d")
    c.execute("INSERT OR REPLACE INTO products VALUES (?,?,?,?,?,?,?)",
              (pid, name, cat, grade, price, "kg", created))

# 倉庫庫存
warehouses = ["台南廠A倉", "台南廠B倉", "高雄倉", "台中倉"]
for pid, *_ in products:
    for wh in random.sample(warehouses, random.randint(2, 4)):
        qty = random.randint(500, 15000)
        updated = (now - timedelta(days=random.randint(0, 7))).strftime("%Y-%m-%d %H:%M")
        c.execute("INSERT INTO inventory (product_id, warehouse, quantity, updated_at) VALUES (?,?,?,?)",
                  (pid, wh, qty, updated))

# 客戶與出貨
customers = [
    ("鴻海精密", "深圳"),
    ("和碩聯合", "上海"),
    ("廣達電腦", "台北"),
    ("仁寶電腦", "昆山"),
    ("華碩電腦", "台北"),
    ("台達電子", "東莞"),
    ("光寶科技", "廣州"),
    ("緯創資通", "馬來西亞"),
    ("英業達",   "南京"),
    ("佳世達",   "蘇州"),
]

for _ in range(200):
    pid = random.choice(products)[0]
    cust, dest = random.choice(customers)
    qty = random.randint(100, 5000)
    days_ago = random.randint(0, 180)
    ship_date = (now - timedelta(days=days_ago)).strftime("%Y-%m-%d")
    c.execute("INSERT INTO shipments (product_id, customer, quantity, ship_date, destination) VALUES (?,?,?,?,?)",
              (pid, cust, qty, ship_date, dest))

# 生產紀錄
lines = ["一號線", "二號線", "三號線", "四號線"]
grades = ["A", "A", "A", "A", "B", "B", "C"]  # A 居多
for _ in range(300):
    pid = random.choice(products)[0]
    line = random.choice(lines)
    qty = random.randint(200, 8000)
    days_ago = random.randint(0, 180)
    prod_date = (now - timedelta(days=days_ago)).strftime("%Y-%m-%d")
    qg = random.choice(grades)
    c.execute("INSERT INTO production (product_id, line, quantity, production_date, quality_grade) VALUES (?,?,?,?,?)",
              (pid, line, qty, prod_date, qg))

conn.commit()

# 驗證
for table in ["products", "inventory", "shipments", "production"]:
    count = c.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
    print(f"{table}: {count} rows")

conn.close()
print(f"\n✅ Database created: {DB_PATH}")
