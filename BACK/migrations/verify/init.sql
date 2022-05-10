-- Verify bookbusters:init on pg

BEGIN;

SELECT * FROM "avatar" WHERE false;

SELECT * FROM "user" WHERE false;
SELECT * FROM "book" WHERE false;
SELECT * FROM "user_has_book" WHERE false;
SELECT * FROM "chat" WHERE false;


ROLLBACK;
