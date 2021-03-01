import {
  CommentItem,
  createCommentItem,
} from '../../../../domain/camping/model/read';
import { Comment } from '../../../../domain/camping/model/write';
import { CampingIdentifier } from '../../../../domain/camping/valueObject';
import { dataComments } from '../repository';

async function inMemoryFindCommentItemsByCamping(
  campingIdentifier: CampingIdentifier
): Promise<CommentItem[]> {
  const selectedComments = dataComments.filter(
    (comment: Comment) => campingIdentifier.id === comment.campingId
  );

  const commentItems = selectedComments.map(
    ({ id, title, description, author, created_at }: Comment) =>
      createCommentItem(id, title, description, author, created_at)
  );

  return commentItems;
}

export { inMemoryFindCommentItemsByCamping };
