import casual from 'casual';
import { gql, IMocks, MockList } from 'apollo-server-express';
import { constructTestServer } from '../../../../helper/testCase';
import { createTestClient } from 'apollo-server-testing';

const LIST_COMMENT_ITEMS_BY_CAMPING = gql`
  query ListCommentItemsByCamping($campingId: ID!) {
    comments(campingId: $campingId) {
      id
      title
      description
      author
    }
  }
`;

test('List comment items by camping query', async () => {
  const fakeCampingId = casual.uuid;
  const commentItemMocks = createCommentItemMocks(fakeCampingId);

  const server = constructTestServer(commentItemMocks);
  const { query } = createTestClient(server);

  const result = await query({
    query: LIST_COMMENT_ITEMS_BY_CAMPING,
    variables: { campingId: fakeCampingId },
  });

  expect(result.data.comments.length).toEqual(2);
  expect(result.data.comments[0]).toMatchObject({
    id: expect.any(String),
    title: expect.any(String),
    description: expect.any(String),
    author: expect.any(String),
  });
});

function createCommentItemMocks(campingId: string): IMocks {
  return {
    Comments: () => new MockList(2),
    Comment: () => ({
      id: casual.uuid,
      title: casual.title,
      description: casual.description,
      author: casual.username,
      campingId,
    }),
  };
}
