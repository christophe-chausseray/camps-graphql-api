import { dbClient } from './../../dataProvider';
import Knex from 'knex';
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
    .select('id', 'title', 'description', 'author')
    .where('campingId', campingIdentifier.id);

  const commentItems = result.map(
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
    }) => createCommentItem(id, title, description, author)
  );

  return commentItems;
}

export { knexFindCommentItemsByCamping };
