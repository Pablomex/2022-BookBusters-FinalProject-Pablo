-- Verify bookbusters:book_in_donation on pg

BEGIN;

SELECT * FROM book_in_donation WHERE false;

ROLLBACK;
