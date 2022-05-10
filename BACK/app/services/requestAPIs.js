const debug = require('debug')('services:requestAPIs');

const { ApiError } = require('../middlewares/handleError');

const fakeBooks = require('./fakeBooks'); // Fictive Request to get fake books, just for joke

const googlebooks = require('./google');
const worldCat = require('./worldCat');
const inventaire = require('./inventaire');

const validISBN13 = new RegExp(/^97[8-9]\d{10}$/);
const validISBN10 = new RegExp(/^\d{9}[\d||x||X]$/);

const requestApis = {
    async findBookByISBN(isbn) {
        if (!validISBN13.test(isbn) && !validISBN10.test(isbn)) {
            throw new ApiError('This is not a valid ISBN number', { statusCode: 400 });
        }

        let result = undefined;

        debug('GoogleBooks API searching...');
        result = await googlebooks.findBookByISBN(isbn);

        if (!result) {
            debug('GoogleBooks API failed!');
            debug('WorldCat API searching...');
            result = await worldCat.findBookByISBN(isbn);
        }

        if (!result) {
            debug('WorldCat API failed!');
            debug('Inventaire API searching...');
            result = await inventaire.findBookByISBN(isbn);
        }

        if (!result) {
            debug('Inventaire API failed!');

            // Fictive Request to get fake books, just for joke
            debug('fakeBooks API searching... ;-)');
            result = fakeBooks.findBookByISBN(isbn);
        }

        return result;
    },
};
module.exports = requestApis;
