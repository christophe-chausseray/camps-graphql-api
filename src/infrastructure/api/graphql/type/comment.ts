import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: ID!
    title: String!
    description: String!
    author: String!
  }

  input CommentInput {
    title: String!
    description: String!
    author: String!
  }

  type Query {
    comments(campingId: ID!): [Comment]
  }

  type Mutation {
    addComment(campingId: ID!, commentInput: CommentInput): Comment
  }
`;
