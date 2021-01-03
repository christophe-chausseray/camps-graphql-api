import { Comment, createComment } from '../../../domain/camping/model/write';
import { CommentIdentifier } from '../../../domain/camping/valueObject';

type AddCommentCommand = {
  title: string;
  description: string;
  author: string;
  campingId: string;
};

const addCommentHandler = (
  createCommentInDB: (comment: Comment) => Promise<void>,
  nextCommentIdentifier: () => CommentIdentifier
) => async (addCommentCommand: AddCommentCommand): Promise<void> => {
  const comment = createComment(
    nextCommentIdentifier().id,
    addCommentCommand.title,
    addCommentCommand.description,
    addCommentCommand.author,
    addCommentCommand.campingId
  );

  await createCommentInDB(comment);
};

export { AddCommentCommand, addCommentHandler };
