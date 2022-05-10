require('dotenv').config();

const debug = require('debug')('import-data:log');
const { Client } = require('pg');
const fs = require('fs');

const config = {
    connectionString: process.env.PG_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};

const client = new Client(config);

const cleanSql = fs.readFileSync('./data/clean-tables.sql', 'utf-8');
const seedSql = fs.readFileSync('./data/data-seed.sql', 'utf-8');

(async () => {
    debug('Client connexion');
    await client.connect();

    debug('Database Deleting...');
    await client.query(cleanSql);

    debug('Database Seeding...');
    await client.query(seedSql);

    debug('Close connexion');
    await client.end();
})();
