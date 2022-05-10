-- Verify bookbusters:add_commune_name_in_big_function on pg

BEGIN;

-- XXX Add verifications here.
SELECT * FROM get_book(0, '{}', '{}', '{}', 1, 0) WHERE FALSE;

ROLLBACK;
