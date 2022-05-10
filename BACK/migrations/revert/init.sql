-- Revert bookbusters:init from pg

BEGIN;

DROP TABLE "chat", "user_has_book", "book", "user", "avatar";

COMMIT;
