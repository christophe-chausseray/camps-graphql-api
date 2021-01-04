import { Comment, createComment } from '../../../domain/camping/model/write';
import { CommentIdentifier } from '../../../domain/camping/valueObject';

type AddCommentForCampingCommand = {
  title: string;
  description: string;
  author: string;
  campingId: string;
};

type AddCommentForCampingResponse = {
  title: string;
  description: string;
  author: string;
};

const addCommentForCampingHandler = (
  createCommentInDB: (comment: Comment) => Promise<void>,
  getCommentById: (id: string) => Promise<Comment>,
  nextCommentIdentifier: () => CommentIdentifier
) => async (
  addCommentCommand: AddCommentForCampingCommand
): Promise<AddCommentForCampingResponse> => {
  const commentId = nextCommentIdentifier().id;
  const comment = createComment(
    commentId,
    addCommentCommand.title,
    addCommentCommand.description,
    addCommentCommand.author,
    addCommentCommand.campingId
  );

  await createCommentInDB(comment);

  const { title, description, author } = await getCommentById(commentId);

  return { title, description, author };
};

export {
  AddCommentForCampingCommand,
  AddCommentForCampingResponse,
  addCommentForCampingHandler,
};
