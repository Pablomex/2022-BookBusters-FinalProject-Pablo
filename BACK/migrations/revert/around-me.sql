-- Revert bookbusters:around-me from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION around_me;

COMMIT;
