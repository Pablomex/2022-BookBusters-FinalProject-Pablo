-- Script to seed database

BEGIN;

-- Table: avatar
INSERT INTO "avatar" ("label", "picture") VALUES
('default', '/avatar/default.png'),
('avatar1', '/avatar/avatar1.png');

-- Table: user
INSERT INTO "user" ("username", "email", "password", "bio", "location") VALUES
('Julien', 'julien.book@busters.fr', 'test', 'bio test de Julien', '(1,1)'),
('Pablo', 'pablo.book@busters.fr', 'test', 'bio test de Pablo', '(1,1)'),
('Elodie', 'elodie.book@busters.fr', 'test', 'bio test de Elodie', '(1,1)'),
('Yvan', 'yvan.book@busters.fr', 'test', 'bio test de Yvan', '(1,1)'),
('Paul', 'paul.book@busters.fr', 'test', 'bio test de Paul', '(1,1)');

-- Table: book
INSERT INTO "book" ("isbn13", "isbn13_formatted", "isbn10", "isbn10_formatted") VALUES
('9782909450018', '978-2-909450-01-8', '2909450015', '2-909450-01-5'),
('9782075094016', '978-2-07-509401-6', '2075094012', '2-07-509401-2'),
('9782075094504', '978-2-07-509450-4', '2075094500', '2-07-509450-0'),
('9782840116462', '978-2-84011-646-2', '2840116464', '2-84011-646-4'),
('9782330113551', '978-2-330-11355-1', '2330113552', '2-330-11355-2'),
('9782253002857', '978-2-253-00285-7', '2253002852', '2-253-00285-2'),
('9781474930413', '978-1-4749-3041-3', '1474930417', '1-4749-3041-7'),
('9782081386693', '978-2-08-138669-3', '2081386690', '2-08-138669-0'),
('9782251002262', '978-2-251-00226-2', '225100226X', '2-251-00226-X'),
('9781908707819', '978-1-908707-81-9', '190870781X', '1-908707-81-X');

-- Table: user_has_book
INSERT INTO "user_has_book" ("user_id", "book_id", "is_in_library", "is_in_donation", "is_in_favorite", "is_in_alert", "donation_date") VALUES
('1', '3', TRUE, TRUE, FALSE, FALSE, '2022-03-30 11:55:13.794178+00'),
('2', '1', TRUE, FALSE, FALSE, FALSE, NULL),
('3', '5', TRUE, TRUE, FALSE, FALSE, '2022-03-31 11:58:43.38215+00'),
('3', '3', TRUE, TRUE, FALSE, FALSE, '2022-03-31 11:58:43.38215+00'),
('4', '10', FALSE, FALSE, FALSE, TRUE, NULL),
('5', '10', FALSE, FALSE, TRUE, FALSE, NULL);

COMMIT;
