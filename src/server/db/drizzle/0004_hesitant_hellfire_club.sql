CREATE TABLE IF NOT EXISTS "share_purchase" (
	"row_id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"symbol" text,
	"purchased_at" timestamp,
	"share_price" real,
	"brokerage" real
);
--> statement-breakpoint
ALTER TABLE "share_search_history" RENAME TO "share_symbol";--> statement-breakpoint
ALTER TABLE "share_symbol" DROP CONSTRAINT "share_search_history_symbol_unique";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "share_purchase" ADD CONSTRAINT "share_purchase_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "share_purchase" ADD CONSTRAINT "share_purchase_symbol_share_symbol_symbol_fk" FOREIGN KEY ("symbol") REFERENCES "share_symbol"("symbol") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "share_symbol" ADD CONSTRAINT "share_symbol_symbol_unique" UNIQUE("symbol");