import express from 'express';
import { graphqlHTTP, Options } from 'express-graphql';
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

export default app;
