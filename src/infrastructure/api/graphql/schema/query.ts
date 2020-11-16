import { GraphQLObjectType } from 'graphql';
import hello from './queries/hello';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello,
  },
});

export default query;
