import { type Config } from "drizzle-kit";

const dbURL = process.env.DATABASE_URL!;

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: dbURL,
  },
  tablesFilter: ["template3_*"],
} satisfies Config;
