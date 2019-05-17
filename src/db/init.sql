-- drop all tables if exist
DROP TABLE IF EXISTS "public"."papers";
DROP TABLE IF EXISTS "public"."project_papers";
DROP TABLE IF EXISTS "public"."projects";

-- papers: {
--  id: <serial8>, //paper id
--	date_created: <timestamp>, //creation date of paper
--	date_last_modified: <timestamp>,  // last modified date of paper
--	date_deleted: <timestamp>,  // date of elimination of paper
--	data: <jsonb>,        // json field that stores the paper data
-- }


CREATE TABLE "public"."papers" (
"id" serial8 NOT NULL,
"date_created" timestamptz NOT NULL,
"date_last_modified" timestamptz NOT NULL,
"date_deleted" timestamptz,
"data" jsonb NOT NULL,
PRIMARY KEY ("id")
)
WITH (OIDS=FALSE)
;

-- projects: {
--  id: <serial8>, //project id
--	date_created: <timestamp>, //creation date of paper
--	date_last_modified: <timestamp>,  // last modified date of paper
--	date_deleted: <timestamp>,  // date of elimination of paper
--	data: <jsonb>,        // json field that stores the project name and description
-- }


CREATE TABLE "public"."projects" (
"id" serial8 NOT NULL,
"date_created" timestamptz NOT NULL,
"date_last_modified" timestamptz NOT NULL,
"date_deleted" timestamptz,
"data" jsonb NOT NULL,
PRIMARY KEY ("id")
)
WITH (OIDS=FALSE)
;

-- project_papers: {
--  id: <serial8>, //paper id
--	date_created: <timestamp>, //creation date of paper
--	date_last_modified: <timestamp>,  // last modified date of paper
--	date_deleted: <timestamp>,  // date of elimination of paper
--	data: <jsonb>,        // json field that stores the paper data
-- project_id: <integer>, //project associated, foreign key with casacade option
-- }




CREATE TABLE "public"."project_papers" (
"id" serial8 NOT NULL,
"date_created" timestamptz NOT NULL,
"date_last_modified" timestamptz NOT NULL,
"date_deleted" timestamptz,
"data" jsonb NOT NULL,
"project_id" int8 NOT NULL,
PRIMARY KEY ("id", "project_id"),
CONSTRAINT "project_id" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
)
WITH (OIDS=FALSE)
;
