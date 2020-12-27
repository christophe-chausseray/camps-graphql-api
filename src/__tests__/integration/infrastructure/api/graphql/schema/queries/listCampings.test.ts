import { addMocksToSchema, MockList } from '@graphql-tools/mock';
import { graphql } from 'graphql';
import casual from 'casual';
import schema from './../../../../../../../infrastructure/api/graphql/schema';

test('List all the campings query', async () => {
  const mocks = {
    Campings: () => new MockList(2),
    Camping: () => ({
      name: casual.name,
      address: casual.address,
      city: casual.city,
      location: {
        longitude: casual.longitude,
        latitude: casual.latitude,
      },
    }),
  };
  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks,
  });

  const query = `
    query listCampings {
        campings {
            id
            name
            address
            city
            location {
                longitude
                latitude
            }
        }
    }
  `;

  const result = await graphql(schemaWithMocks, query);

  expect(result.data.campings.length).toEqual(2);
  expect(result.data.campings[0]).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    address: expect.any(String),
    city: expect.any(String),
    location: {
      longitude: expect.any(Number),
      latitude: expect.any(Number),
    },
  });
});
