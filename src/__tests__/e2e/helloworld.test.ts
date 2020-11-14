import request from 'supertest';
import app from '../../app';

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
