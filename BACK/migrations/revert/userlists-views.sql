-- Revert bookbusters:userlists-views from pg

BEGIN;

DROP VIEW user_book_in_library;

DROP VIEW user_book_in_favorite;

DROP VIEW user_book_in_alert;

COMMIT;
