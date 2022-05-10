const debug = require('debug')('bookReformatter');

const google = require('./google');
const openLibrary = require('./openLibrary');
const bookDataMapper = require('../models/book');
const requestApis = require('./requestAPIs');

const bookReformatter = {
    /**
     * Regroup all books' information from a search in GoogleBooks API.
     * @param {[Book]} books Array of book in BDD
     */
    async reformat(books, userId) {
        // Test to know where books come from
        if (books[0].title) {
            // books has titles, so they come from a Google result's research
            return await bookReformatter.completeWithDatabaseData(books, userId);
        } else {
            // books hasn't titles, so they comme from our database
            return await bookReformatter.completeWithAPIsData(books);
        }
    },

    /**
     * Complete books' informations with BookBusters' data
     * @param {[Book]} books Array of book in BDD
     */
    async completeWithDatabaseData(books, userId) {
        debug('completeWithDatabaseData');

        const openLibraryQueries = [];
        const bookISBNs = [];

        // Promise Array of book in BookBusters BDD and OpenLibrary Cover
        books.forEach((book) => {
            if (book.isbn13) {
                bookISBNs.push(book.isbn13);
                if (!book.cover) {
                    openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn13));
                }
            } else if (book.isbn10) {
                bookISBNs.push(book.isbn10);
                if (!book.cover) {
                    openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn10));
                }
            }
        });
        const openLibResult = await Promise.all(openLibraryQueries);
        const booksInBDDResult = await bookDataMapper.findBooks(
            userId,
            '{}',
            `{${bookISBNs}}`,
            `{${bookISBNs}}`,
            0,
            0,
        );

        // Group all books' info between APIs and Database
        books = books.map((book) => {
            booksInBDDResult.find((bookInBDD) => {
                if (
                    bookInBDD &&
                    (bookInBDD.isbn13 === book.isbn13 || bookInBDD.isbn10 === book.isbn10)
                ) {
                    book = {
                        ...book,
                        ...bookInBDD,
                    };
                }
            });

            // Add cover from OpenLibrary if not found on Google Books
            openLibResult.find((cover) => {
                if (
                    cover &&
                    cover.coverOLL &&
                    (cover.isbnOL === book.isbn13 || cover.isbnOL === book.isbn10)
                ) {
                    book.cover = cover.coverOLL;
                }
            });

            return book;
        });

        return books;
    },

    /**
     * Complete books' informations with APIs' data
     * @param {[Book]} books Array of book in BDD
     */
    async completeWithAPIsData(books) {
        debug('completeWithAPIsData');

        const APIQueries = [];
        const openLibraryQueries = [];

        // Promise Array of book in GoogleBooks
        books.forEach((book) => {
            if (book.isbn13) {
                APIQueries.push(requestApis.findBookByISBN(book.isbn13));
            } else if (book.isbn10) {
                APIQueries.push(requestApis.findBookByISBN(book.isbn10));
            }
        });
        const booksResult = await Promise.all(APIQueries);

        // Promise Array of OpenLibrary Cover
        booksResult.forEach((bookInGoogle) => {
            if (bookInGoogle && !bookInGoogle.cover) {
                if (bookInGoogle.isbn13) {
                    openLibraryQueries.push(openLibrary.findBookCoverByISBN(bookInGoogle.isbn13));
                } else if (bookInGoogle.isbn10) {
                    openLibraryQueries.push(openLibrary.findBookCoverByISBN(bookInGoogle.isbn10));
                }
            }
        });
        const openLibResult = await Promise.all(openLibraryQueries);

        // Group all books' info between APIs and Database
        books = books.map((book) => {
            booksResult.find((bookInAPI) => {
                if (
                    bookInAPI &&
                    (book.isbn13 === bookInAPI.isbn13 || book.isbn10 === bookInAPI.isbn10)
                ) {
                    book = {
                        ...bookInAPI,
                        ...book,
                    };
                }
            });

            // Add cover from OpenLibrary if not found on Google Books
            openLibResult.find((cover) => {
                if (
                    cover &&
                    cover.coverOLL &&
                    (cover.isbnOL === book.isbn13 || cover.isbnOL === book.isbn10)
                ) {
                    book.cover = cover.coverOLL;
                }
            });

            return book;
        });

        return books;
    },
};

module.exports = bookReformatter;
