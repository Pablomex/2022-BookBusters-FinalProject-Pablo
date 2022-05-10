-- Deploy bookbusters:postalcommunecode to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN "postal_code" text NOT NULL DEFAULT 75000;
ALTER TABLE "user" ADD COLUMN "commune_code" text NOT NULL DEFAULT 75000;
ALTER TABLE "user" ALTER COLUMN "postal_code" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "commune_code" DROP DEFAULT;

COMMIT;
