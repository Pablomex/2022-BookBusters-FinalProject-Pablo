-- Deploy bookbusters:userlists-views to pg

BEGIN;

CREATE VIEW user_book_in_library AS
    SELECT
        "user_has_book"."user_id",
        count("book".*) as book_count,
        json_agg(json_build_object(
            'association_id', "user_has_book"."id",
            'book_id', "book"."id",
            'isbn13', "book"."isbn13",
            'isbn10', "book"."isbn10",
            'is_in_library', "user_has_book"."is_in_library",
            'is_in_donation', "user_has_book"."is_in_donation",
            'donation_date', "user_has_book"."donation_date",
            'is_in_favorite', "user_has_book"."is_in_favorite",
            'is_in_alert', "user_has_book"."is_in_alert"
        )) as books
    FROM "user_has_book"
    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
    JOIN "book" ON "book"."id" = "user_has_book"."book_id"
    WHERE "user_has_book"."is_in_library" = TRUE
    GROUP BY "user_has_book"."user_id";

CREATE VIEW user_book_in_favorite AS
    SELECT
        "user_has_book"."user_id",
        count("book".*) as book_count,
        json_agg(json_build_object(
            'association_id', "user_has_book"."id",
            'book_id', "book"."id",
            'isbn13', "book"."isbn13",
            'isbn10', "book"."isbn10",
            'is_in_library', "user_has_book"."is_in_library",
            'is_in_donation', "user_has_book"."is_in_donation",
            'donation_date', "user_has_book"."donation_date",
            'is_in_favorite', "user_has_book"."is_in_favorite",
            'is_in_alert', "user_has_book"."is_in_alert"
        )) as books
    FROM "user_has_book"
    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
    JOIN "book" ON "book"."id" = "user_has_book"."book_id"
    WHERE "user_has_book"."is_in_favorite" = TRUE
    GROUP BY "user_has_book"."user_id";

CREATE VIEW user_book_in_alert AS
    SELECT
        "user_has_book"."user_id",
        count("book".*) as book_count,
        json_agg(json_build_object(
            'association_id', "user_has_book"."id",
            'book_id', "book"."id",
            'isbn13', "book"."isbn13",
            'isbn10', "book"."isbn10",
            'is_in_library', "user_has_book"."is_in_library",
            'is_in_donation', "user_has_book"."is_in_donation",
            'donation_date', "user_has_book"."donation_date",
            'is_in_favorite', "user_has_book"."is_in_favorite",
            'is_in_alert', "user_has_book"."is_in_alert"
        )) as books
    FROM "user_has_book"
    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
    JOIN "book" ON "book"."id" = "user_has_book"."book_id"
    WHERE "user_has_book"."is_in_alert" = TRUE
    GROUP BY "user_has_book"."user_id";

COMMIT;
