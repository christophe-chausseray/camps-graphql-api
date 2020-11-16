import { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphqlHTTPOptions } from './../../api/graphql';

function init(app: Express): void {
  app.get('/graphql', graphqlHTTP(graphqlHTTPOptions));
}

export default { init };
