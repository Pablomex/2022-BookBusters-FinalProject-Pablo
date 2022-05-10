-- Verify bookbusters:commune-field on pg

BEGIN;

SELECT "commune_name" FROM "user" WHERE false;

ROLLBACK;
