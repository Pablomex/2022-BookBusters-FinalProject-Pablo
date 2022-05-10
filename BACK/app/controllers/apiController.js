const requestAPIs = require('../services/requestAPIs');
const google = require('../services/google');
const worldCat = require('../services/worldCat');
const { ApiError } = require('../middlewares/handleError');
const bookReformatter = require('../services/bookReformatter');
const debug = require('debug')('apiController');

module.exports = {

    async getBookByISBN(req, res) {
        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        const APIResult = await requestAPIs.findBookByISBN(req.params.isbn);

        if (!APIResult) {
            return res.json([])
            //throw new ApiError('Sorry, book with this ISBN not found', { statusCode: 404 });
        }

        const book = await bookReformatter.reformat([APIResult], connectedUserId);

        return res.json(book[0]);
    },
    /*
    async getBookCoverByISBN(req, res) {
        const cover = await openLibrary.findBookCoverByISBN(req.params.isbn);
        if (!cover) {
            throw new ApiError('Sorry, book cover with this ISBN not found', { statusCode: 204 });
        }
        return res.json(cover);
    },
*/
    async getBookByKeyword(req, res) {
        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        const keyWords = req.query.q;
        const limit = req.query.limit || 10; // limitation du nombre de résultat auprès de GoogleBooks API
        const page = req.query.start * limit || 0; // indication de l'index de démarrage souhaité auprès de GoogleBooks API

        let books = await google.findBookByKeyword(keyWords, limit, page);

        if (!books) {
            return res.json([])
        // throw new ApiError('Sorry, book with this keyword not found', { statusCode: 404 });
        }

        books = await bookReformatter.reformat(books, connectedUserId);

        return res.json(books);
    },

    async getBookWithWorldCat(req, res) {
        const book = await worldCat.findBookByISBN(req.params.isbn);
        if (!book) {
            return res.json([])
        // throw new ApiError(`Sorry, book with the ISBN ${req.params.isbn} not found`, 404);
        }
        return res.json(book);
    },
};
