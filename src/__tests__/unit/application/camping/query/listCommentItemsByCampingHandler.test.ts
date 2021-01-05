import casual from 'casual';
import { listCommentItemsByCampingHandler } from '../../../../../application/camping/query';
import { CommentItem } from '../../../../../domain/camping/model/read';
import { Comment } from '../../../../../domain/camping/model/write';
import { inMemoryFindCommentItemsByCamping } from '../../../../../infrastructure/persistance/inMemory/query';
import {
  inMemoryCreateComment,
  inMemoryNextCampingIdentifier,
  inMemoryNextCommentIdentifier,
} from '../../../../../infrastructure/persistance/inMemory/repository';

test('It can handle the query to get the list of comment items by camping', async () => {
  const handler = listCommentItemsByCampingHandler(
    inMemoryFindCommentItemsByCamping
  );
  const fakeCampingId = inMemoryNextCampingIdentifier().id;
  const listCommentItemsByCampingQuery = {
    campingId: fakeCampingId,
  };

  const fakeComments = await createFakeComments(fakeCampingId);

  const commentItems = await handler(listCommentItemsByCampingQuery);

  assertCommentItems(commentItems, fakeComments);
});

async function createFakeComments(campingId: string): Promise<Comment[]> {
  const comments = [];

  for (let index = 0; index < 2; index++) {
    const comment = {
      id: inMemoryNextCommentIdentifier().id,
      title: casual.title,
      description: casual.description,
      author: casual.username,
      campingId,
    };

    await inMemoryCreateComment(comment);
    comments.push(comment);
  }

  return comments;
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
