-- Deploy bookbusters:account_activation to pg


BEGIN;

ALTER TABLE "user" ADD COLUMN "active_account" BOOLEAN NOT NULL DEFAULT FALSE;

COMMIT;

