import Knex from 'knex';
import moment from 'moment';
import { dbClient } from './../../dataProvider';
import {
  CommentItem,
  createCommentItem,
} from '../../../../domain/camping/model/read';
import { CampingIdentifier } from '../../../../domain/camping/valueObject';

async function knexFindCommentItemsByCamping(
  campingIdentifier: CampingIdentifier
): Promise<CommentItem[]> {
  const knex: Knex = dbClient.postgres;
  const result = await knex('api.camps_comment')
    .select('id', 'title', 'description', 'author', 'created_at')
    .where('campingId', campingIdentifier.id)
    .orderBy('created_at', 'desc');

  const commentItems = result.map(
    ({
      id,
      title,
      description,
      author,
      created_at,
    }: {
      id: string;
      title: string;
      description: string;
      author: string;
      created_at: string;
    }) =>
      createCommentItem(
        id,
        title,
        description,
        author,
        moment(created_at).format('YYYY-MM-DD')
      )
  );

  return commentItems;
}

export { knexFindCommentItemsByCamping };
