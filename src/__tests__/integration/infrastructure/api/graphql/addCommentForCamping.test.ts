import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import casual from 'casual';
import { constructTestServer } from '../../../../helper/testCase';

const ADD_COMMENT_FOR_CAMPING = gql`
  mutation AddCommentForCamping($campingId: ID!, $commentInput: CommentInput) {
    addComment(campingId: $campingId, commentInput: $commentInput) {
      title
      description
      author
    }
  }
`;

test('Add comment mutation', async () => {
  const fakeCampingId = casual.uuid;
  const fakeCommentInput = {
    title: casual.uuid,
    description: casual.description,
    author: casual.username,
  };

  const server = constructTestServer();
  const { mutate } = createTestClient(server);

  const result = await mutate({
    mutation: ADD_COMMENT_FOR_CAMPING,
    variables: { campingId: fakeCampingId, commentInput: fakeCommentInput },
  });

  expect(result.data).toMatchObject({
    addComment: {
      title: expect.any(String),
      description: expect.any(String),
      author: expect.any(String),
    },
  });
});
