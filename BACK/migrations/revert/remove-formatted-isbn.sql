-- Revert bookbusters:remove-formatted-isbn from pg

BEGIN;

-- Drop the book_in_donation view to succeed in adding columns in book table
DROP VIEW "book_in_donation";

ALTER TABLE "book"
ADD COLUMN "isbn13_formatted" TEXT,
ADD COLUMN "isbn10_formatted" TEXT;

-- Recreate the book_in_donation_view
CREATE VIEW "book_in_donation" AS
SELECT
    "book".*,
    MAX(user_has_book.donation_date) AS donation_date,
    json_agg(to_jsonb("user".*)-'bio'-'password'-'mail_alert'-'mail_donation') as "user"
FROM book
JOIN "user_has_book" ON book.id=user_has_book.book_id
JOIN "user" ON "user".id = user_has_book.user_id
WHERE user_has_book.is_in_donation = TRUE
GROUP BY book.id
ORDER BY donation_date;


COMMIT;
