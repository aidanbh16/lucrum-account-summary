# Lucrum Account Summary Service

This repository contains the Account Summary Service (ACS) for Lucrum, a personal finance management application. Built with Node.js, Express, and TypeScript, it is responsible for generating AI-powered financial summaries and advice. The service accepts a user's monthly income and expense data, formats it into a structured prompt, and invokes Claude Haiku via LangChain's Anthropic integration to produce a concise analysis of the user's financial situation along with actionable recommendations. All requests are authenticated using the shared JWT cookie set by the Account Management Service — a valid token is required before any summary is generated.

---

## Overview

The service provides REST API endpoints for:

- Generating an AI-powered account summary based on income and expenses

Authentication is handled via JWT tokens stored in HTTP-only cookies, shared with the Account Management System.

---

## Tech Stack

- Node.js
- Express
- LangChain
- Anthropic (Claude)
- JWT (jsonwebtoken)
- Docker

---

## API Routes

### Summary

| Method | Endpoint   | Description                              |
|--------|------------|------------------------------------------|
| POST   | /summary   | Generate an AI summary for the user      |

#### Request Body

```json
{
  "income": 4000,
  "expenses": [
    { "name": "Netflix", "amount": 25, "type": "recurring", "frequency": "monthly" },
    { "name": "Groceries", "amount": 208, "type": "variable" }
  ]
}
```

---

## Authentication Flow

- Each route reads the `user` cookie and verifies the JWT
- A valid token is required before the summary is generated

---

## AI Model

The service uses Claude Haiku via LangChain's `ChatAnthropic` integration to generate summaries.
