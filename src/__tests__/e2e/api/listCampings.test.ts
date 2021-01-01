import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import { setup, teardown, resetDB } from '../../helper/testCase';

var app: Express;

beforeAll(async () => {
  dotenv.config();
  app = await setup();
});

beforeEach(async () => {
  await resetDB();
});

afterAll(() => {
  teardown();
});

test('List campings query', async () => {
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

  const response = await request(app)
    .get('/graphql')
    .type('json')
    .query({ query });

  expect(JSON.parse(response.text)).toEqual({
    data: {
      campings: [
        {
          id: expect.any(String),
          name: 'CAMPING HUTTOPIA RAMBOUILLET',
          address: "Route du Château d'eau",
          city: 'RAMBOUILLET',
          location: {
            longitude: 48.630059,
            latitude: 1.835694,
          },
        },
        {
          id: expect.any(String),
          name: 'CARAVANING LE VAUVERT',
          address: '26 Route de Vauvert',
          city: 'ORMOY-LA-RIVIÈRE',
          location: {
            longitude: 48.411278,
            latitude: 2.143939,
          },
        },
      ],
    },
  });
});
