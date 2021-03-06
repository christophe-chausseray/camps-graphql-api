import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import { setup, teardown } from '../../helper/testCase';

var app: Express;

beforeAll(async () => {
  dotenv.config();
  const server = await setup();
  app = server.app;
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

  expect(JSON.parse(response.text)).toStrictEqual({
    data: {
      campings: [
        {
          id: '4bb3cccd-a767-4e3f-848f-16394bacda77',
          name: 'CAMPING HUTTOPIA RAMBOUILLET',
          location: {
            longitude: 48.630059,
            latitude: 1.835694,
          },
        },
        {
          id: 'ca683518-1c65-43b7-b544-8fcb5ac973bb',
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
