import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import { setup, teardown } from '../../helper/testCase';

var app: Express;

beforeAll(async () => {
  dotenv.config();
  app = await setup();
});

afterAll(async () => {
  teardown();
});

test('List camping items query', async () => {
  const query = `
    query listCampingItems {
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
          location: {
            longitude: 48.630059,
            latitude: 1.835694,
          },
        },
        {
          id: expect.any(String),
          name: 'CARAVANING LE VAUVERT',
          location: {
            longitude: 48.411278,
            latitude: 2.143939,
          },
        },
      ],
    },
  });
});
