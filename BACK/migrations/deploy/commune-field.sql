-- Deploy bookbusters:commune-field to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN "commune_name" text NOT NULL DEFAULT 'Paris';
ALTER TABLE "user" ALTER COLUMN "commune_name" DROP DEFAULT;

COMMIT;
