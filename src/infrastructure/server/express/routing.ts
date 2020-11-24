import { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphqlHTTPOptions } from './../../api/graphql';

function initRouting(app: Express): void {
  app.use('/graphql', graphqlHTTP(graphqlHTTPOptions));
}

export { initRouting };
