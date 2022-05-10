-- Verify bookbusters:remove-formatted-isbn on pg

BEGIN;

SELECT * FROM book_in_donation WHERE false;

ROLLBACK;
