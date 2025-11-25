import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load .env.local first (higher priority), then .env
config({ path: ".env.local" });
config({ path: ".env" });

// Get DIRECT_URL if available, otherwise use DATABASE_URL
const directUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
    // Only include directUrl if it's different from DATABASE_URL
    ...(directUrl && directUrl !== process.env.DATABASE_URL ? { directUrl } : {}),
  },
});
