-- Revert bookbusters:add_commune_name_in_big_function from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION get_book;

CREATE FUNCTION get_book
(
	connected_user INT DEFAULT 0, -- The id of the connected user (req.body.user.userId)
	books_ids INT[] DEFAULT '{}'::INT[], -- an array of books id from the BookBusters' database
	books_isbn13s TEXT[] DEFAULT '{}'::TEXT[], -- an array of books ISBN 13
	books_isbn10s TEXT[] DEFAULT '{}'::TEXT[], -- an array of books ISBN 10
    max_rows_per_page INT DEFAULT 10, -- the number of rows return
	page_number INT DEFAULT 0 -- the page number
)
-- The function returns a table with the following columns
RETURNS TABLE (
    "id" INT, -- the id of the book
    "isbn13" TEXT, -- the isbn 13 of the book
    "isbn10" TEXT, -- the isbn 10 of the book
    "connected_user" JSON, -- a json oject with the connected user information and relation with the book
    "last_donation_date" TIMESTAMPTZ, -- the last donation date for the book
    "number_of_donors" BIGINT, -- number of donors of the book except the connected user
    "donors" JSON -- an array with all the donors of the book except the connected user
) AS $$

	SELECT
	    "book"."id", "book"."isbn13", "book"."isbn10",
	    ROW_TO_JSON("connected_user") AS "connected_user",
	    MAX("donor"."donation_date") AS "last_donation_date",
	    COUNT("donor".*) AS "number_of_donors",
	    JSON_AGG(TO_JSONB("donor".*)) AS "donors"

	FROM book

-- Join a sub-select named "donor" to get all donnors of the book
	LEFT JOIN (
	    SELECT
	    	"user_has_book"."user_id" AS "donor_id",
	    	"user"."username",
	    	"avatar"."picture" AS "avatar",
	    	"user"."email",
	    	"user"."location",
	    	"user_has_book"."book_id",
	    	"user_has_book"."donation_date"
	    FROM "user_has_book"
	    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
        JOIN "avatar" ON "avatar"."id" = "user"."avatar_id"
	    WHERE "user_has_book"."is_in_donation" = TRUE
	    AND "user_has_book"."user_id" <> ("connected_user")::INT
	) "donor"
	ON "book"."id" = "donor"."book_id"

-- Join a sub-select named "doconnected_usernor" to get his information and his relation lists with the book
	LEFT JOIN (
	    SELECT
	    	"user"."id" AS "user_id",
	    	"user"."username",
	    	"avatar"."picture" AS "avatar",
	    	"user"."email",
	    	"user"."location"::TEXT,
	    	"user_has_book"."id" AS "associations_id",
	    	"user_has_book"."book_id",
	    	"user_has_book"."is_in_library",
	    	"user_has_book"."is_in_donation",
	    	"user_has_book"."donation_date",
	    	"user_has_book"."is_in_favorite",
	    	"user_has_book"."is_in_alert"
	    FROM "user_has_book"
	    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
        JOIN "avatar" ON "avatar"."id" = "user"."avatar_id"
	    WHERE "user_has_book"."user_id" = ("connected_user")::INT
	) AS "connected_user"
	ON "book"."id" = "connected_user"."book_id"

-- conditions
	WHERE
        -- If no book's id, isbn 13 or isbn 10 is asked => the funtion returns all books in database
		CASE WHEN ("books_ids" = '{}' AND "books_isbn13s" = '{}' AND "books_isbn10s" = '{}')
		THEN TRUE

		ELSE
        -- If book's ids, isbns 13 or isbns 10 are asked :
			CASE "books_ids"
				WHEN '{}' THEN "book"."id" = 0 -- if no book's id
				ELSE "book"."id" = ANY ("books_ids"::INT[]) -- search in the array of 1 or more book's ids
			END

			OR

			CASE "books_isbn13s"
				WHEN '{}' THEN "book"."isbn13" = '0' -- if no isbn 13
				ELSE "book"."isbn13" = ANY ("books_isbn13s"::TEXT[]) -- search in the array of 1 or more isbn 13
			END

			OR

			CASE "books_isbn10s"
				WHEN '{}' THEN "book"."isbn10" = '0' -- if no isbn 10
				ELSE "book"."isbn10" = ANY ("books_isbn10s"::TEXT[]) -- search in the array of 1 or more isbn 10
			END

		END

	GROUP BY "book"."id", "connected_user".*

	LIMIT -- limit the number of rows return
	    CASE "max_rows_per_page"
	    WHEN 0 THEN NULL -- if limit parameter is 0 => no limit
		ELSE
		    max_rows_per_page
	    END

    OFFSET page_number * max_rows_per_page -- set an offset for pagination
    ;

$$ LANGUAGE SQL STRICT;
COMMIT;
