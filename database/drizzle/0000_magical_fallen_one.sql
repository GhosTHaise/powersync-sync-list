CREATE TABLE "lists" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"name" text,
	"owner_id" text
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" text PRIMARY KEY NOT NULL,
	"list_id" text,
	"created_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"description" text,
	"created_by" text,
	"completed_by" text,
	"completed" integer DEFAULT 0
);
