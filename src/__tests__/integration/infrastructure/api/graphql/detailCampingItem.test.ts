import { gql, MockList } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import casual from 'casual';
import { constructTestServer } from './../../../../helper/testCase';

const GET_DETAIL_CAMPING_ITEM = gql`
  query DetailCampingItem($campingId: ID!) {
    camping(id: $campingId) {
      id
      name
      description
      image
      address
      zipcode
      city
      nb_spots
      nb_stars
      phone_number
      email
      website
      location {
        longitude
        latitude
      }
    }
  }
`;

test('Detail camping item query', async () => {
  const campingId = casual.uuid;
  const detailedCampingItemMocks = {
    Campings: () => new MockList(2),
    Camping: () => ({
      id: campingId,
      name: casual.name,
      description: casual.description,
      image: casual.url,
      address: casual.address,
      zipcode: Number(casual.zip(5)),
      city: casual.city,
      nb_spots: casual.integer(0, 100),
      nb_stars: casual.integer(1, 5),
      phone_number: casual.phone,
      email: casual.email,
      website: casual.url,
      location: {
        longitude: casual.longitude,
        latitude: casual.latitude,
      },
    }),
  };

  const server = constructTestServer(detailedCampingItemMocks);
  const { query } = createTestClient(server);

  const result = await query({
    query: GET_DETAIL_CAMPING_ITEM,
    variables: { campingId },
  });

  expect(result.data).toMatchObject({
    camping: {
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
      address: expect.any(String),
      city: expect.any(String),
      nb_spots: expect.any(Number),
      nb_stars: expect.any(Number),
      phone_number: expect.any(String),
      email: expect.any(String),
      website: expect.any(String),
      location: {
        longitude: expect.any(Number),
        latitude: expect.any(Number),
      },
    },
  });
});
