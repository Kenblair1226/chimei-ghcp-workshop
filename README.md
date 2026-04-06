# 🏭 Chi Mei GHCP Workshop — Product Inventory API

> 奇美實業 GitHub Copilot Workshop Demo Project

A simple Product Inventory API built with TypeScript + Express, designed for demonstrating GitHub Copilot features.

## Quick Start

```bash
npm install
npm run dev       # Start dev server
npm run verify    # Build + Lint + Test
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

## Workshop Branch Map

| Branch | Purpose |
|--------|---------|
| `main` | ✅ Stable baseline (all tests pass) |
| `demo/sre-broken` | 💥 Broken CI — for SRE Agent demo |
| `demo/review-bad-pr` | 👀 Code with issues — for Code Review demo |

## Workshop Agenda

### Part 1 — Agentic Workflow（80 min）
GitHub Copilot Coding Agent: Issue → Auto code → PR

### Part 2 — SRE Agent（70 min）
CI fails → Agent reads logs → Auto fix → PR

### Part 3 — Code Review（40 min）
Copilot auto-reviews PRs with custom guidelines

## Demo Reset

```bash
git checkout main
git pull origin main
```
