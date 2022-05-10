/* eslint-disable no-useless-catch */
/* eslint-disable eqeqeq */
/* eslint-disable spaced-comment */

const fakeBooks = {
    findBookByISBN(isbn) {
        // Livre fictif Bookworm
        if (isbn === '9781235567890' || isbn === '1235567890') {
            bookworm = {
                isbn10: '1235567890',
                isbn13: '9781235567890',
                title: 'BookWorm - trichez et gagnez',
                author: ['Agathe, ', 'Phil, ', 'Yoan, ', 'Thibaud, ', 'Bilal'],
                resume: 'Toutes les soluces pour que votre ver devienne riche et gras',
                publishedDate: '2022',
                cover: 'https://i.ibb.co/yk1bbgV/bookworm-cover.png',
                language: 'fr',
            };

            result = bookworm;
        }

        // Livre fictif C du Prop's
        if (isbn === '9781235667890' || isbn === '1235667890') {
            cduprops = {
                isbn10: '1235667890',
                isbn13: '9781235667890',
                title: "C du Prop's - Gagnez sans rien faire",
                author: ['Guillaume, ', 'Anne, ', 'Patrick, ', 'Amélie, ', 'Axel'],
                resume: 'Tous les codes pour tricher et gagner sans faire aucune tâche ménagère',
                publishedDate: '2022',
                cover: 'https://i.ibb.co/r5RZZKL/cduprops-cover.jpg',
                language: 'fr',
            };

            result = cduprops;
        }

        // Livre fictif Kampus
        if (isbn === '9781225667890' || isbn === '1225667890') {
            kampus = {
                isbn10: '1225667890',
                isbn13: '9781225667890',
                title: 'Organizatron (Kanpus)',
                author: ['Inès, ', 'Ludo, ', 'Romain, ', 'Mark'],
                resume: "Avec l'organizatron organise ton planning comme jamais !",
                publishedDate: '2022',
                cover: 'https://i.ibb.co/WPnn1zH/kanpus-cover.jpg',
                language: 'fr',
            };

            result = kampus;
        }

        //If no answer
        if (!result) {
            return undefined;
        }

        return result;
    },
};

module.exports = fakeBooks;
