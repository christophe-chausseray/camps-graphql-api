/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  AddCommentForCampingCommand,
  addCommentForCampingHandler,
  AddCommentForCampingResponse,
} from '../../../../application/camping/command';
import {
  listCommentItemsByCampingHandler,
  ListCommentItemsByCampingQuery,
} from '../../../../application/camping/query';
import { CommentItem } from '../../../../domain/camping/model/read';
import { knexFindCommentItemsByCamping } from '../../../persistance/knex/query';
import {
  knexCreateComment,
  knexGetCommentById,
  knexNextCommentIdentifier,
} from '../../../persistance/knex/repository';

export default {
  Query: {
    comments: async (obj: any, arg: any): Promise<CommentItem[]> => {
      const listCommentItemsByCamping: ListCommentItemsByCampingQuery = {
        campingId: arg.campingId,
      };
      const handler = listCommentItemsByCampingHandler(
        knexFindCommentItemsByCamping
      );

      const commentItems = await handler(listCommentItemsByCamping);

      return commentItems;
    },
  },
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
