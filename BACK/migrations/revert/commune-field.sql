-- Revert bookbusters:commune-field from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN "commune_name";

COMMIT;
