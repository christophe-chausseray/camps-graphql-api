import express from 'express';
import { graphqlHTTP, Options } from 'express-graphql';
import database from './database';
import schema from './schema';

const app = express();

var graphqlHTTPOptions: Options = {
    schema,
    graphiql: 'production' !== process.env.NODE_ENV
};

if ('production' !== process.env.NODE_ENV) {
    graphqlHTTPOptions.customFormatErrorFn = (error) => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
    });
}

app.use('/graphql',  graphqlHTTP(graphqlHTTPOptions));

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
