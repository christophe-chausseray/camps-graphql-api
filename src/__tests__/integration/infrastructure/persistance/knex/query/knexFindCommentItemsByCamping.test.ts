import dotenv from 'dotenv';
import casual from 'casual';
import Knex from 'knex';
import { setup, teardown } from './../../../../../helper/testCase';
import { knexFindCommentItemsByCamping } from '../../../../../../infrastructure/persistance/knex/query';
import { knexNextCommentIdentifier } from '../../../../../../infrastructure/persistance/knex/repository';
import {
  CampingIdentifier,
  createCampingIdentifier,
} from '../../../../../../domain/camping/valueObject';
import { CommentItem } from '../../../../../../domain/camping/model/read';
import { Comment } from '../../../../../../domain/camping/model/write';

var dbClient: Knex;

beforeAll(async () => {
  dotenv.config();
  const { knex } = await setup();
  dbClient = knex;
});

afterAll(async () => {
  teardown();
});

test('It can find the comment items by camping', async () => {
  const campingHuttopiaIdentifier = createCampingIdentifier(
    '4bb3cccd-a767-4e3f-848f-16394bacda77'
  );
  const fakeCommentsForHuttopiaCamping = await createFakeCommentsForCamping(
    campingHuttopiaIdentifier
  );

  const commentItemsForHuttopiaCamping = await knexFindCommentItemsByCamping(
    campingHuttopiaIdentifier
  );

  assertCommentItems(
    commentItemsForHuttopiaCamping,
    fakeCommentsForHuttopiaCamping
  );
});

test('It can find the comment items ordered by created date', async () => {
  const campingHuttopiaIdentifier = createCampingIdentifier(
    'ca683518-1c65-43b7-b544-8fcb5ac973bb'
  );
  const fakeCommentsForHuttopiaCamping = await createFakeCommentsForCamping(
    campingHuttopiaIdentifier,
    5
  );
  const sortedFakecomments = fakeCommentsForHuttopiaCamping
    .map((comment) => ({
      id: comment.id,
      title: comment.title,
      description: comment.description,
      author: comment.author,
      created_at: comment.created_at,
    }))
    .sort(compareDate);

  const commentItemsForHuttopiaCamping = await knexFindCommentItemsByCamping(
    campingHuttopiaIdentifier
  );

  expect(commentItemsForHuttopiaCamping).toEqual(sortedFakecomments);
});

async function createFakeCommentsForCamping(
  campingIdentifier: CampingIdentifier,
  nbMaxInsert = 2
) {
  const fakeComments = [];
  for (let index = 0; index < nbMaxInsert; index++) {
    fakeComments.push({
      id: knexNextCommentIdentifier().id,
      title: casual.title,
      description: casual.short_description,
      author: casual.username,
      campingId: campingIdentifier.id,
      created_at: casual.date(),
    });
  }

  await dbClient.batchInsert('api.camps_comment', fakeComments);

  return fakeComments;
}

function assertCommentItems(
  commentItems: CommentItem[],
  createdComments: Comment[]
): void {
  createdComments.map(
    ({ id, title, description, author, created_at }: Comment) => {
      expect(commentItems).toContainEqual({
        id,
        title,
        description,
        author,
        created_at,
      });
    }
  );
}

function compareDate(firstComment: CommentItem, secondComment: CommentItem) {
  const firstCommentDate = new Date(firstComment.created_at).getTime();
  const secondCommentDate = new Date(secondComment.created_at).getTime();

  return firstCommentDate < secondCommentDate ? 1 : -1;
}
