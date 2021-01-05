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
import { Comment } from '../../../../../../domain/camping/model/write';
import { CommentItem } from '../../../../../../domain/camping/model/read';

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

async function createFakeCommentsForCamping(
  campingIdentifier: CampingIdentifier
) {
  const fakeComments = [];
  for (let index = 0; index < 2; index++) {
    fakeComments.push({
      id: knexNextCommentIdentifier().id,
      title: casual.title,
      description: casual.description,
      author: casual.username,
      campingId: campingIdentifier.id,
    });
  }

  await dbClient.batchInsert('api.camps_comment', fakeComments);

  return fakeComments;
}

function assertCommentItems(
  commentItems: CommentItem[],
  createdComment: Comment[]
): void {
  createdComment.map(
    ({
      id,
      title,
      description,
      author,
    }: {
      id: string;
      title: string;
      description: string;
      author: string;
    }) => {
      expect(commentItems).toContainEqual({
        id,
        title,
        description,
        author,
      });
    }
  );
}
