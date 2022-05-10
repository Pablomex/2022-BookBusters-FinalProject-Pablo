-- Script to truncate all database tables

BEGIN;

-- Drop current data
TRUNCATE "user_has_book", "chat", "book", "user", "avatar" RESTART IDENTITY;

COMMIT;
