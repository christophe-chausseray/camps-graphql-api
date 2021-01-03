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

function knexNextCommentIdentifier(): CommentIdentifier {
  const commentIdentifier = createCommentIdentifier(uuidv4());

  return commentIdentifier;
}

export { knexCreateComment, knexNextCommentIdentifier };
