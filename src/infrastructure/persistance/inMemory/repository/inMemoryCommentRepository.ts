import { v4 as uuidv4 } from 'uuid';
import { Comment } from '../../../../domain/camping/model/write';
import {
  CommentIdentifier,
  createCommentIdentifier,
} from '../../../../domain/camping/valueObject';

const dataComments: Comment[] = [];

async function inMemoryCreateComment(comment: Comment): Promise<void> {
  dataComments.push(comment);
}

function inMemoryNextCommentIdentifier(): CommentIdentifier {
  const commentIdentifier = createCommentIdentifier(uuidv4());

  return commentIdentifier;
}

export { dataComments, inMemoryCreateComment, inMemoryNextCommentIdentifier };
