import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import { setup, teardown, resetDB } from './../helper/server';

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

test('hello world query', async () => {
  const query = `
    query {
      hello
    }
  `;

  const response = await request(app)
    .get('/graphql')
    .type('json')
    .send(JSON.stringify({ query }));

  expect(JSON.parse(response.text)).toEqual({
    data: {
      hello: 'world',
    },
  });
});
