import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 8082,
    JWT_SECRET: process.env.JWT_SECRET,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
};
