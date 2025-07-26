import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },

  // https://orm.drizzle.team/docs/drizzle-config-file#schemafilter
  // schemaFilter: ["public"],
  tablesFilter: ["projects", "commits"],
});
