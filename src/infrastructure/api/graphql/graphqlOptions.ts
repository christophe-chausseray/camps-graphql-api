import { Options } from 'express-graphql';
import schema from './schema';

var graphqlHTTPOptions: Options = {
  schema,
  graphiql: 'dev' === process.env.APP_ENV,
};

if ('dev' === process.env.APP_ENV) {
  graphqlHTTPOptions.customFormatErrorFn = (error) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  });
}

export default graphqlHTTPOptions;
