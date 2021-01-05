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

test('List of comment items by camping', async () => {
  const query = `
    query ListCommentItemsByCamping {
      comments(campingId: "4bb3cccd-a767-4e3f-848f-16394bacda77") {
        id
        title
        description
        author
      }
    }
  `;

  const response = await request(app)
    .get('/graphql')
    .type('json')
    .query({ query });

  expect(JSON.parse(response.text)).toStrictEqual({
    data: {
      comments: [
        {
          id: '55a903fd-bf0b-499b-9199-f7d8215e6d48',
          title: 'An awesome camping',
          description: 'The camping is awesome',
          author: 'joe',
        },
        {
          id: 'c5ece729-1fa7-4dfc-a54e-d200259dea36',
          title: 'A terrible camping',
          description: 'The camping is terrible',
          author: 'jack',
        },
      ],
    },
  });
});
