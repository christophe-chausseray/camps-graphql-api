import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const database = knex({
    client: 'pg',
    debug: 'production' !== process.env.NODE_ENV,
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

export default database;
