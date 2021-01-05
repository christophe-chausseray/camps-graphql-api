import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import casual from 'casual';
import { constructTestServer } from './../../../../helper/testCase';

const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription OnCommentAdded($campingId: ID!) {
    commentAdded(campingId: $campingId) {
      id
      title
      description
      author
    }
  }
`;

test('Get comment added subscription', async () => {
  const campingId = casual.uuid;
  const server = constructTestServer();
  const { query } = createTestClient(server);

  const result = await query({
    query: COMMENT_ADDED_SUBSCRIPTION,
    variables: { campingId },
  });

  expect(result.data).toMatchObject({
    commentAdded: {
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      author: expect.any(String),
    },
  });
});
