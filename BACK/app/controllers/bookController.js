const bookDataMapper = require('../models/book');
const userDataMapper = require('../models/user');
const { ApiError } = require('../middlewares/handleError');
const bookReformatter = require('../services/bookReformatter');
const debug = require('debug')('bookController');
const mailer = require('../services/mailer');
module.exports = {
    /**
     * Product controller to get all books in donation.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAllInDonation(req, res) {
        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        let page;
        req.query.page ? page = Number(req.query.page) : page = 0

        let books = await bookDataMapper.findBooksInDonation(connectedUserId, page);

        if (books.length === 0) {
            return res.json([]);
            //throw new ApiError('no new book in donation', { statusCode: 404 });
        }

        books = await bookReformatter.reformat(books, req.body.user);

        return res.json(books);
    },

    async getOneBookById(req, res) {
        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        const bookId = req.params.id;
        let book = await bookDataMapper.findBooks(connectedUserId, `{${bookId}}`, '{}', '{}', 1, 0);
        if (book.length === 0) {
            throw new ApiError('Book not found', { statusCode: 404 });
        }
        book = await bookReformatter.reformat(book);

        return res.json(book[0]);
    },

    /**
     * Book controller to add a book
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async addBook(req, res) {
        debug('req.body dans le controlleur', req.body)
        const savedUserHasBook = await bookDataMapper.updateOrInsert(req.body);

        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        let book = await bookDataMapper.findBooks(
            connectedUserId,
            `{${savedUserHasBook.book_id}}`,
            '{}',
            '{}',
            1,
            0,
        );

        book = await bookReformatter.reformat(book);

        if (book[0].connected_user.is_in_donation) {
            debug(`Un nouveau livre en donation, j'envoie un mail d'alerte`);
            let isbn = null;
            if (book[0].isbn13) {
                isbn = book[0].isbn13;
            }
            else { isbn = book[0].isbn10; }
            debug(`ISBN :`, isbn);
            const users = await userDataMapper.findUsersInAlert(isbn);
            debug(`Les users en alerte :`, users);
            if (users) {
                await mailer.sendAlertingMails(users);
            }
        }
        return res.json(book[0]);
    },

    /**
     * Book controller to add a book
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getBooksAroundMe(req, res) {
        const booksAroundMe = await bookDataMapper.findBooksIdAround(
            req.body.location,
            req.body.radius,
        );

        if (booksAroundMe.length === 0) {
           return res.json([]);
        }

        let bookIds = [];
        booksAroundMe.forEach(row => {
            bookIds.push(...row.book_ids);
        })

        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        let books = await bookDataMapper.findBooks(connectedUserId, bookIds, '{}', '{}', 10, 0);
        books = await bookReformatter.reformat(books);

        // Redispatch books by locations
        const result = [];
        booksAroundMe.forEach((row) => {
            const locatedBooks = [];
            row.book_ids.forEach((book_id) => {
                const bookPush = books.find((book) => book_id === book.id);
                if(bookPush){
                    locatedBooks.push(bookPush);
                }
            });

            result.push({
                location: row.loc,
                books: locatedBooks,
            });
        });

        return res.json(result);
    },
};
