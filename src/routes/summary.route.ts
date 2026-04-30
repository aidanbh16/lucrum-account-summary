import { Router } from "express";
import jwt from "jsonwebtoken";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { env } from "../config/env";

const router = Router();

const model = new ChatAnthropic({
    model: "claude-haiku-4-5-20251001",
    apiKey: env.ANTHROPIC_API_KEY,
    maxTokens: 1024,
});

router.post("/", async (req, res) => {
    const token = req.cookies.user;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        jwt.verify(token, env.JWT_SECRET!);
    } catch {
        return res.status(401).json({ error: "Unauthorized" });
    }


    const { income, expenses } = req.body;

    if (typeof income !== "number" || !Array.isArray(expenses)) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const recurring = expenses.filter((e: any) => e.type === "recurring");
    const variable = expenses.filter((e: any) => e.type === "variable");

    const recurringLines = recurring.length > 0
        ? recurring.map((e: any) => `  - ${e.name}: $${e.amount} (${e.frequency})`).join("\n")
        : "  None";

    const variableLines = variable.length > 0
        ? variable.map((e: any) => `  - ${e.name}: $${e.amount}`).join("\n")
        : "  None";

    const userMessage = `
Monthly Income: $${income}

Recurring Expenses:
${recurringLines}

Variable Expenses:
${variableLines}
    `.trim();

    try {
        const response = await model.invoke([
            new SystemMessage(
                "You are a personal finance advisor. The user will provide their monthly income and expenses. " +
                "Write a concise summary of their financial situation followed by 2-3 specific, actionable pieces of advice. " +
                "Be direct and friendly. Do not use markdown formatting or bullet points — write in plain paragraphs. " +
                "Do not begin with any greeting, title, or introductory phrase — start directly with the financial summary."
            ),
            new HumanMessage(userMessage),
        ]);

        const summary = typeof response.content === "string"
            ? response.content
            : response.content.map((c: any) => c.text ?? "").join("");

        return res.status(200).json({ summary });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;
