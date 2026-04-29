# Lucrum Account Summary Service

This repository contains the Account Summary Service (ACS) for Lucrum.  
It is an Express-based backend responsible for generating AI-powered financial summaries and advice.

The ACS takes a user's monthly income and expenses and uses Claude (via LangChain) to produce a concise summary of their financial situation along with actionable recommendations.

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
