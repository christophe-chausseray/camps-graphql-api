import express from 'express';
import { graphqlHTTP, Options } from 'express-graphql';
import cors from 'cors';
import responseTime from 'response-time';
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

app.use(cors());
app.use(responseTime(function (req, res, time) {
    if ('production' !== process.env.NODE_ENV) {
        console.log(`${req.method} ${req.url}: ${time}ms`);
    }
}));
app.use('/graphql',  graphqlHTTP(graphqlHTTPOptions));

export default app;
