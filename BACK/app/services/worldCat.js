/* eslint-disable no-useless-catch */
const debug = require('debug')('services:worlCatAPI');

const fetch = require('node-fetch');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: false, mergeAttrs: true, explicitArray: false })
/**
 * @typedef {object} BookCover
 * @property {string} cover - Book cover url
 */

const worldCat = {
    async findBookByISBN(isbn) {
        const url = `http://classify.oclc.org/classify2/Classify?isbn=${isbn}&summary=true`;
        const response = await fetch(url);
        const content = await response.text();
        const data = await parser.parseStringPromise(content);
        let result = {};
        if (data.classify.works) {
            const books = data.classify.works.work;
            const APIIsbn = data.classify.input._;
            const regex1 = new RegExp(/^97[8-9]\d{10}$/);
            const regex2 = new RegExp(/^97[8-9]\d{7}$/);
            let isbn13 = null;
            let isbn10 = null;
            if (regex1.test(APIIsbn)) {
                isbn13 = APIIsbn;
            }
            if (regex2.test(APIIsbn)) {
                isbn10 = APIIsbn;
            }
            books.forEach(book => {
                if (book.format == 'Book') {
                    result = {
                        isbn13: isbn13,
                        isbn10: isbn10,
                        title: book.title,
                        author: book.author,
                        publishedDate: book.lyr,
                    };
                }
            });
        } else {
            result = undefined;
        }
        return result;
    },
};

module.exports = worldCat;
