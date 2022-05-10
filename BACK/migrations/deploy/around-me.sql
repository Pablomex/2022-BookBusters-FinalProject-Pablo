-- Deploy bookbusters:around-me to pg

BEGIN;

-- XXX Add DDLs here.
CREATE FUNCTION around_me(point, integer) RETURNS TABLE (total bigint, book_ids json, loc text) AS $$
SELECT COUNT(book.id), json_agg(book.id) as book_id,  "user".location::text FROM "user"
	JOIN user_has_book ON user_has_book.user_id="user".id
	JOIN book ON book.id= user_has_book.book_id WHERE ("user".location <-> $1)*111 < $2 AND user_has_book.is_in_donation=TRUE GROUP BY "user".location::text
$$ LANGUAGE SQL STRICT;

COMMIT;
