import dotenv from 'dotenv';
import casual from 'casual';
import { setup, teardown } from './../../../../../helper/testCase';
import {
  knexCreateComment,
  knexGetCommentById,
  knexNextCommentIdentifier,
} from '../../../../../../infrastructure/persistance/knex/repository';
import { Comment } from '../../../../../../domain/camping/model/write';

beforeAll(async () => {
  dotenv.config();
  await setup();
});

afterAll(async () => {
  teardown();
});

test('It can create comment in the db and retrieve it', async () => {
  const campingHuttopiaId = '4bb3cccd-a767-4e3f-848f-16394bacda77';
  const expectedComment = {
    id: casual.uuid,
    title: casual.title,
    description: casual.description,
    author: casual.username,
    campingId: campingHuttopiaId,
  };

  knexCreateComment(expectedComment);

  const actualComment = await knexGetCommentById(expectedComment.id);

  assertComment(expectedComment, actualComment);
});

test('It can get the next comment identifier', () => {
  const commentIdentifier = knexNextCommentIdentifier();

  expect(commentIdentifier).toEqual({ id: expect.any(String) });
});

function assertComment(expectedComment: Comment, actualComment: Comment): void {
  expect(expectedComment.id).toEqual(actualComment.id);
  expect(expectedComment.title).toEqual(actualComment.title);
  expect(expectedComment.description).toEqual(actualComment.description);
  expect(expectedComment.author).toEqual(actualComment.author);
  expect(expectedComment.campingId).toEqual(actualComment.campingId);
}
