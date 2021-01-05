import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import casual from 'casual';
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

test('Add comment mutation', async () => {
  const campingId = '4bb3cccd-a767-4e3f-848f-16394bacda77';
  const commentTitleInput = casual.title;
  const commentDescriptionInput = casual.short_description;
  const commentAuthorInput = casual.username;
  const commentInput = `{title: "${commentTitleInput}", description: "${commentDescriptionInput}", author: "${commentAuthorInput}"}`;

  const mutation = `
    mutation AddCommentForCamping {
      addComment(campingId: "${campingId}", commentInput: ${commentInput}) {
        id
        title
        description
        author
      }
    }
  `;

  const response = await request(app)
    .post('/graphql')
    .type('json')
    .set('Accept', 'application/json')
    .send({ query: mutation });

  expect(JSON.parse(response.text)).toStrictEqual({
    data: {
      addComment: {
        id: expect.any(String),
        title: commentTitleInput,
        description: commentDescriptionInput,
        author: commentAuthorInput,
      },
    },
  });
});
