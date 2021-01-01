import { gql } from 'apollo-server-express';

export default gql`
  type Camping {
    id: ID!
    name: String!
    description: String
    image: String
    address: String
    zipcode: Int
    city: String
    nb_spots: Int
    nb_stars: Int
    phone_number: String
    email: String
    website: String
    location: Location!
  }

  type Location {
    longitude: Float
    latitude: Float
  }

  type Query {
    campings: [Camping]
    camping(id: ID!): Camping
  }
`;
