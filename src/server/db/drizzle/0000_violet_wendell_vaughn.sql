CREATE TABLE IF NOT EXISTS "user" (
	"row_id" serial PRIMARY KEY NOT NULL,
	"id" text,
	"name" text,
	"email" text,
	"password" text,
	"role" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "user_id_unique" UNIQUE("id")
);
