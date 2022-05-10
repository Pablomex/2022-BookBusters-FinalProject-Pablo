const { Pool } = require('pg');

const config = {
    connectionString: process.env.PG_URL,

    // SSL config to connect to database on Heroku
    // ssl: {
    //     rejectUnauthorized: false,
    // },
};

const pool = new Pool(config);

module.exports = pool;
