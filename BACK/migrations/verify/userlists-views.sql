-- Verify bookbusters:userlists-views on pg

BEGIN;

SELECT * FROM user_book_in_library WHERE false;

SELECT * FROM user_book_in_favorite WHERE false;

SELECT * FROM user_book_in_alert WHERE false;

ROLLBACK;
