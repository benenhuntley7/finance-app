CREATE TABLE IF NOT EXISTS "asset_values_history" (
	"history_id" serial PRIMARY KEY NOT NULL,
	"asset_id" integer NOT NULL,
	"value" real,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assets" (
	"asset_id" serial PRIMARY KEY NOT NULL,
	"id" serial NOT NULL,
	"user_id" text,
	"category" text,
	"name" text,
	"created_at" timestamp,
	"value" real
);
--> statement-breakpoint
ALTER TABLE "share_purchase" RENAME COLUMN "share_price" TO "purchase_price";--> statement-breakpoint
ALTER TABLE "share_purchase" ADD COLUMN "qty" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_values_history" ADD CONSTRAINT "asset_values_history_asset_id_assets_asset_id_fk" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
