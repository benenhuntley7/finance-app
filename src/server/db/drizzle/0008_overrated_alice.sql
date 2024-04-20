ALTER TABLE "asset_values_history" RENAME COLUMN "history_id" TO "id";--> statement-breakpoint
ALTER TABLE "asset_values_history" DROP CONSTRAINT "asset_values_history_asset_id_assets_asset_id_fk";
--> statement-breakpoint
ALTER TABLE "assets" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "assets" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "share_purchase" ALTER COLUMN "purchased_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "share_purchase" ALTER COLUMN "purchase_price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "share_purchase" ALTER COLUMN "brokerage" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "share_purchase" ALTER COLUMN "qty" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "share_symbol" ALTER COLUMN "symbol" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "share_symbol" ALTER COLUMN "long_name" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_values_history" ADD CONSTRAINT "asset_values_history_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "assets" DROP COLUMN IF EXISTS "asset_id";--> statement-breakpoint
ALTER TABLE "assets" DROP COLUMN IF EXISTS "created_at";