CREATE TABLE IF NOT EXISTS "asset_values_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"asset_id" integer NOT NULL,
	"value" integer,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"category" text NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "share_purchase" (
	"row_id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"symbol" text,
	"purchased_at" timestamp NOT NULL,
	"purchase_price" real NOT NULL,
	"brokerage" real NOT NULL,
	"qty" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "share_symbol" (
	"row_id" serial PRIMARY KEY NOT NULL,
	"symbol" text NOT NULL,
	"long_name" text NOT NULL,
	CONSTRAINT "share_symbol_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"row_id" serial PRIMARY KEY NOT NULL,
	"id" text,
	"first_name" text,
	"last_name" text,
	"email" text,
	"password" text,
	"role" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	"income" integer,
	"income_frequency" integer,
	CONSTRAINT "user_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_values_history" ADD CONSTRAINT "asset_values_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_values_history" ADD CONSTRAINT "asset_values_history_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
