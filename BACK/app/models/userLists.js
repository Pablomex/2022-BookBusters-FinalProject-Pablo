const client = require('../config/database');
const debug = require('debug')('userLists model');
/**
 * @typedef {object} Books
 * @property {number} association_id - Indentifiant unique, Pk de la table user_has_book
 * @property {number} book_id - Indentifiant unique, Pk de la table book
 * @property {string} isbn13
 * @property {string} isbn10
 * @property {boolean} is_in_libray
 * @property {boolean} is_in_donation
 * @property {string} donation_date
 * @property {boolean} is_in_favorite
 * @property {boolean} is_in_alert
 */

/**
 * @typedef {object} UserLists
 * @property {number} user_id - Indentifiant unique, Pk de la table user
 * @property {string} book_count - Number of books in the list
 * @property {[Books]} books
 */

const userListsDataMapper = {

    async findAllBooksInList(
        userId,
        page,
        list,
        limit = 10,
    ) {
        /*const result = await client.query('SELECT * FROM user_book_in_favorite WHERE user_id = $1', [
            userId,
        ]);*/
        const offset = page * limit;

        const result = await client.query(`SELECT * FROM get_book($1, '{}', '{}', '{}', 0, 0)
        WHERE "id"
        IN (SELECT book_id FROM user_has_book WHERE user_id = $1 AND ${list} = TRUE)
        ORDER BY "id" DESC LIMIT $2 OFFSET $3`, [userId, limit, offset]);

        return result.rows;
    },



    async updateDonationDate(userId, bookId) {
        const result = await client.query(`UPDATE user_has_book SET donation_date = NOW()
        WHERE book_id=$1 AND user_id=$2 RETURNING *`, [
            userId, bookId,
        ]);

        return result.rows[0];
    },
    async delete(bookId, userId) {
        const result = await client.query('DELETE FROM user_has_book WHERE book_id = $1 AND user_id = $2', [bookId, userId]);
        return !!result.rowCount;
    },
};

module.exports = userListsDataMapper;
