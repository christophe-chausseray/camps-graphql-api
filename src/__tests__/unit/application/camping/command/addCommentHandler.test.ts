import casual from 'casual';
import {
  AddCommentForCampingCommand,
  addCommentForCampingHandler,
} from '../../../../../application/camping/command';
import { Comment } from '../../../../../domain/camping/model/write';
import {
  dataComments,
  inMemoryCreateComment,
  inMemoryGetCommentById,
  inMemoryNextCommentIdentifier,
} from '../../../../../infrastructure/persistance/inMemory/repository';

test('It can handle the command to add a comment', async () => {
  const handler = addCommentForCampingHandler(
    inMemoryCreateComment,
    inMemoryGetCommentById,
    inMemoryNextCommentIdentifier
  );
  const fakeAddCommentCommand = {
    title: casual.title,
    description: casual.description,
    author: casual.username,
    campingId: casual.uuid,
  };

  await handler(fakeAddCommentCommand);

  assertCommentAdded(dataComments[0], fakeAddCommentCommand);
});

function assertCommentAdded(
  comment: Comment,
  addCommentCommand: AddCommentForCampingCommand
) {
  expect(comment.title).toEqual(addCommentCommand.title);
  expect(comment.description).toEqual(addCommentCommand.description);
  expect(comment.author).toEqual(addCommentCommand.author);
}
