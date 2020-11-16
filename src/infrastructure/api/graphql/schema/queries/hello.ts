import { GraphQLString } from 'graphql';

const hello = {
  type: GraphQLString,
  resolve(): string {
    return 'world';
  },
};

export default hello;
