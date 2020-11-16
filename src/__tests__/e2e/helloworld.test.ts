import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import ServerTest from './server';

var app: Express;

beforeAll(async () => {
  dotenv.config();
  app = await ServerTest.setup();
});

afterAll(() => {
  ServerTest.teardown();
});

test('hello world query', async () => {
  const query = `
    query {
      hello
    }
  `;

  // var app = Application.init();
  // var client = await DataProvider.createDB();
  const response = await request(app)
    .get('/graphql')
    .type('json')
    .send(JSON.stringify({ query }));

  expect(JSON.parse(response.text)).toEqual({
    data: {
      hello: 'world',
    },
  });

  // client.postgres.destroy();
});
