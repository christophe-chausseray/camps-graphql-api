import Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';
import {
  CommentIdentifier,
  createCommentIdentifier,
} from '../../../../domain/camping/valueObject';
import { dbClient } from '../../dataProvider';
import { Comment } from './../../../../domain/camping/model/write';

async function knexCreateComment(comment: Comment): Promise<void> {
  const knex: Knex = dbClient.postgres;

  await knex('api.camps_comment').insert(comment);
}

async function knexGetCommentById(id: string): Promise<Comment> {
  const knex: Knex = dbClient.postgres;
  const result = await knex('api.camps_comment')
    .select('id', 'title', 'description', 'author', 'campingId')
    .first()
    .where('id', '=', id);

  return result;
}

function knexNextCommentIdentifier(): CommentIdentifier {
  const commentIdentifier = createCommentIdentifier(uuidv4());

  return commentIdentifier;
}

export { knexCreateComment, knexGetCommentById, knexNextCommentIdentifier };
