import { defineConfig } from "drizzle-kit";
import CONFIG from "../config";
export default defineConfig({
  schemaFilter: ["public", "category"],
  schema: "./src/**/*.schema.ts",
  dialect: "postgresql", // "postgresql" | "mysql"
  dbCredentials: {
    url: CONFIG.NEON_DATABASE_URL,
  },
});
