/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  AddCommentForCampingCommand,
  addCommentForCampingHandler,
  AddCommentForCampingResponse,
} from '../../../../application/camping/command';
import {
  knexCreateComment,
  knexGetCommentById,
  knexNextCommentIdentifier,
} from '../../../persistance/knex/repository';

export default {
  Mutation: {
    addComment: async (
      obj: any,
      arg: any
    ): Promise<AddCommentForCampingResponse> => {
      const addCommentForCampingCommand: AddCommentForCampingCommand = {
        title: arg.commentInput.title,
        description: arg.commentInput.description,
        author: arg.commentInput.author,
        campingId: arg.campingId,
      };
      const handler = addCommentForCampingHandler(
        knexCreateComment,
        knexGetCommentById,
        knexNextCommentIdentifier
      );

      const comment = await handler(addCommentForCampingCommand);

      return comment;
    },
  },
};
