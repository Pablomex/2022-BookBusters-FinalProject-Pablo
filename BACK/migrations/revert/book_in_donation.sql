-- Revert bookbusters:book_in_donation from pg

BEGIN;

DROP VIEW book_in_donation;

COMMIT;
