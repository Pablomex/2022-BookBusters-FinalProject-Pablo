-- Revert bookbusters:postalcommunecode from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN "commune_code";
ALTER TABLE "user" DROP COLUMN "postal_code";

COMMIT;
