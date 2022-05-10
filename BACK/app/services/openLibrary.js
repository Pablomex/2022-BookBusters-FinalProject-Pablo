const debug = require('debug')('services:OpenLibraryAPI');
const fetch = require('node-fetch');
// const { AbortController } = require('node-abort-controller');

/**
 * @typedef {object} BookCover
 * @property {string} isbn
 * @property {string} coverOL - url d'une cover
 */


const openLibrary = {
    async findBookCoverByISBN(isbn) {
        // const controller = new AbortController();
        // signal = controller.signal;

        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`;
        const response = await fetch(url /*, { signal }*/ );
        // setTimeout(() => controller.abort(), 500);

        const json = await response.json();

        let result = {};

        // If no answer
        if (Object.entries(json).length === 0) {
            return (result = undefined);
        }

        // If at least one answer
        if (Object.entries(json).length >= 1) {
            const ISBNKey = `ISBN:${isbn}`;

            // If no cover found in result
            if (!json[ISBNKey].thumbnail_url) {
                return (result = undefined);
            } else {
                result = {
                    isbnOL: json[ISBNKey].bib_key.split('ISBN:')[1],
                    coverOLM: json[ISBNKey].thumbnail_url.split('-S').join('-M'),
                    coverOLL: json[ISBNKey].thumbnail_url.split('-S').join('-L'),
                };
            }
        }

        return result;
    },
};

module.exports = openLibrary;
