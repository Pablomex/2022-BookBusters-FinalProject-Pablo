-- Verify bookbusters:postalcommunecode on pg

BEGIN;

SELECT "commune_code", "postal_code" FROM "user" WHERE false;

ROLLBACK;
