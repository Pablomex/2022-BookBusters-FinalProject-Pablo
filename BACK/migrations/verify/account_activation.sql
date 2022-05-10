-- Verify bookbusters:account_activation on pg

BEGIN;

SELECT "active_account" FROM "user" WHERE false;

ROLLBACK;

