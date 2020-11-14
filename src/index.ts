import app from './app';
import database from './database';

async function start(): Promise<void> {
    try {
        //check database connection
        await database.raw('SELECT 1 + 1 as result');

        app.listen('3000', () => {
            console.log('Server started at http://localhost:3000');
        });
    } catch(error) {
        if ('production' !== process.env.NODE_ENV) {
            console.log(error);
        }

        process.exit(1);
    }
}

start();
