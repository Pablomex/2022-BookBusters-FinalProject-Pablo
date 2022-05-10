-- Revert bookbusters:account_activation from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN "active_account";

COMMIT;
