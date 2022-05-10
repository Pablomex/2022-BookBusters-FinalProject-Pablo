const client = require('../config/database');

/**
 * @typedef {object} User
 * @property {number} id - Identifiant unique, Pk de la table
 * @property {string} username
 * @property {string} email
 * @property {string} bio
 * @property {string} Location
 * @property {string} communeCode - exemple : "10500"
 * @property {string} postalCode - exemple : "10115"
 * @property {boolean} mail_donation
 * @property {boolean} mail_alert
 * @property {number} avatar_id
 */

/**
 * @typedef {object} InputUser
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} bio
 * @property {string} postalCode - exemple : "10115"
 * @property {string} communeCode - exemple : "10500"
 * @property {boolean} mail_donation - default TRUE
 * @property {boolean} mail_alert - default TRUE
 * @property {number} avatar_id - default 1
 */

/**
 * @typedef {object} BookRelation
 * @property {number} user_id
 * @property {number} book_count
 * @property {[BookUser]} password
 */

/**
 * @typedef {object} Login
 * @property {string} login - Email
 * @property {string} password
 */

const userDataMapper = {
    async findAll() {
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },

    async findOneUserById(userId) {
        const result = await client.query('SELECT * FROM "user" WHERE id = $1', [userId]);
        return result.rows[0];
    },

    async findOneUserByEmail(userEmail) {
        const result = await client.query('SELECT * FROM "user" WHERE email = $1', [userEmail]);
        return result.rows[0];
    },

    async findUsersInAlert(ISBN) {
        const result = await client.query(`SELECT * from 
            ("user" INNER JOIN user_has_book ON user_has_book.user_id = "user".id)
            INNER JOIN book ON user_has_book.book_id = book.id
            WHERE is_in_alert = true AND isbn13 = $1 OR isbn10 = $1`, [ISBN]);
        return result.rows;
    },

    async findUsersWithExpiredBook() {
        const result = await client.query(`SELECT * from 
        ("user" INNER JOIN user_has_book ON user_has_book.user_id = "user".id)
        INNER JOIN book ON user_has_book.book_id = book.id
        WHERE is_in_donation = true AND DATE_PART('day', NOW() - donation_date) = 180 OR DATE_PART('day', NOW() - donation_date) = 187`);
        return result.rows;
    },

    async findUsersWithZombiBooks() {
        const result = await client.query(`SELECT * from 
        ("user" INNER JOIN user_has_book ON user_has_book.user_id = "user".id)
        INNER JOIN book ON user_has_book.book_id = book.id
        WHERE is_in_donation = true AND DATE_PART('day', NOW() - donation_date) >= 210`);
        return result.rows;
    },

    /**
     * Ajoute dans la base de données
     * @param {InputUser} user - Les données à insérer
     * @returns {User} - Le user ajouté
     */
    async insert(user) {
        const savedUser = await client.query(
            `
            INSERT INTO "user"
            ("username", "email", "password", "bio", "location", "postal_code", "commune_code", "commune_name", "mail_donation", "mail_alert", "avatar_id") VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, username, email, bio, location, postal_code, commune_code, commune_name, mail_donation, mail_alert, avatar_id
        `,
            [
                user.username,
                user.email,
                user.password,
                user.bio,
                user.location,
                user.postalCode,
                user.communeCode,
                user.communeName,
                user.mail_donation,
                user.mail_alert,
                user.avatar_id,
            ],
        );
        return savedUser.rows[0];
    },

    /**
     * Supprime de la base de données
     * @param {number} id - L'id à supprimer
     * @returns {boolean} - Le résultat de la suppression
     */
    async delete(id) {
        const result = await client.query('DELETE FROM "user" WHERE id = $1', [id]);
        return !!result.rowCount;
    },

    /**
     * Vérifie si un user existe déjà avec le username ou l'email
     * @param {object} inputData - Les données fourni par l'utilisateur
     * @param {number} userId - L'identifiant du user (optionnel)
     * @returns {(User|undefined)} - Le User existant
     * ou undefined si aucun User avec ces données
     */
    async isUnique(inputData, userId) {
        const fields = [];
        const values = [];
        // On récupère la liste des infos envoyés
        Object.entries(inputData).forEach(([key, value], index) => {
            // On ne garde que les infos qui sont censées être unique
            if (['username', 'email'].includes(key)) {
                // On génère le filtre avec ces infos
                fields.push(`"${key}" = $${index + 1}`);
                values.push(value);
            }
        });

        const preparedQuery = {
            text: `SELECT * FROM "user" WHERE (${fields.join(' OR ')})`,
            values,
        };

        // Si l'id est fourni on exclu l'enregistrement qui lui correspond
        if (userId) {
            preparedQuery.text += ` AND id <> $${values.length + 1}`;
            preparedQuery.values.push(userId);
        }
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    /**
     * Modifie dans la base de données
     * @param {number} id - L'id à modifier
     * @param {InputUser} user - Les données à modifier
     * @returns {User} - Le User modifié
     */
    async update(id, user) {
        const fields = Object.keys(user).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(user);

        const savedUser = await client.query(
            `
                UPDATE "user" SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedUser.rows[0];
    },

    async swithTheAccountActive(id) {
        const activeAccount = await client.query(
            `
                UPDATE "user" SET
                    active_account = true
                WHERE id = $1
                RETURNING id, username, email, bio, location, postal_code, commune_code, commune_name, mail_donation, mail_alert, avatar_id`,
            [id],
        );
        if (!activeAccount) {
            return null;
        }
        return activeAccount;
    },
};

module.exports = userDataMapper;
