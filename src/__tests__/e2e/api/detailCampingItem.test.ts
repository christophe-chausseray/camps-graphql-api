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

test('Detail camping item query', async () => {
  const query = `
    query detailCampingItem {
      camping(id: "4bb3cccd-a767-4e3f-848f-16394bacda77") {
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

  const response = await request(app)
    .get('/graphql')
    .type('json')
    .query({ query });

  expect(JSON.parse(response.text)).toEqual({
    data: {
      camping: {
        id: '4bb3cccd-a767-4e3f-848f-16394bacda77',
        name: 'CAMPING HUTTOPIA RAMBOUILLET',
        description: 'Description camping huttopia',
        image: '/path/to/camping-uttopia.png',
        address: "Route du Château d'eau",
        zipcode: 78120,
        city: 'RAMBOUILLET',
        nb_spots: 20,
        nb_stars: 3,
        phone_number: '168403928',
        email: 'contact@le-camping-huttopia.com',
        website: 'le-camping-huttopia.com',
        location: {
          longitude: 48.630059,
          latitude: 1.835694,
        },
      },
    },
  });
});
