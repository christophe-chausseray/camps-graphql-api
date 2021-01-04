import { gql, MockList } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import casual from 'casual';
import { constructTestServer } from '../../../../helper/testCase';

const GET_LIST_CAMPING_ITEMS = gql`
  query ListCampingItems {
    campings {
      id
      name
      location {
        longitude
        latitude
      }
    }
  }
`;

test('List all the camping items query', async () => {
  const campingMocks = {
    Campings: () => new MockList(2),
    Camping: () => ({
      name: casual.name,
      location: {
        longitude: casual.longitude,
        latitude: casual.latitude,
      },
    }),
  };

  const server = constructTestServer(campingMocks);
  const { query } = createTestClient(server);

  const result = await query({
    query: GET_LIST_CAMPING_ITEMS,
  });

  expect(result.data.campings.length).toEqual(2);
  expect(result.data.campings[0]).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    location: {
      longitude: expect.any(Number),
      latitude: expect.any(Number),
    },
  });
});
