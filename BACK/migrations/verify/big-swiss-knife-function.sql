-- Verify bookbusters:big-swiss-knife-function on pg

BEGIN;

SELECT * FROM get_book(5, '{}', '{}', '{}', 1, 0) WHERE FALSE;

ROLLBACK;
