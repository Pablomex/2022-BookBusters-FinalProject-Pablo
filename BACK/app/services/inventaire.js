const fetch = require('node-fetch');

const inventaire = {
    async findBookByISBN(isbn) {
        const url = `https://inventaire.io/api/data?action=isbn&isbn=${isbn}`;
        const response = await fetch(url);

        const json = await response.json();

        let result = {};

        // If no answer
        if (!json.title) {
            return (result = undefined);
        }

        book = {
            isbn13: json.isbn13,
            isbn10: json.isbn10,
            title: json.title,
            author: json.authors,
            publishedDate: json.publicationDate,
            language: json.groupLang,
        };

        if ((book.isbn13 || book.isbn10) && book.title) {
            result = book;
        }

        return result;
    },
};

module.exports = inventaire;
