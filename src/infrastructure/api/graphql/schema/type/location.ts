import { GraphQLFloat, GraphQLObjectType } from 'graphql';

const Location = new GraphQLObjectType({
  name: 'Location',
  description: 'Location type definition',
  fields: () => ({
    longitude: {
      type: GraphQLFloat,
    },
    latitude: {
      type: GraphQLFloat,
    },
  }),
});

export default Location;
