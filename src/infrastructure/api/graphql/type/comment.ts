import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    title: String!
    description: String!
    author: String!
  }

  input CommentInput {
    title: String!
    description: String!
    author: String!
  }

  type Mutation {
    addComment(campingId: ID!, commentInput: CommentInput): Comment
  }
`;
