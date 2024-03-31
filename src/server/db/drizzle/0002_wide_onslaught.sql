CREATE TABLE IF NOT EXISTS "share_search_history" (
	"row_id" serial PRIMARY KEY NOT NULL,
	"symbol" text,
	"long_name" text,
	CONSTRAINT "share_search_history_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "income" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "income_frequency" integer;