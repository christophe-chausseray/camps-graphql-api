/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { PubSub } from 'apollo-server-express';
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

const pubsub = new PubSub();
const COMMENT_ADDED = 'COMMENT_ADDED';

export default {
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator([COMMENT_ADDED]),
      resolve: (payload: any) => {
        return payload;
      },
    },
  },
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

      pubsub.publish(COMMENT_ADDED, {
        commentAdded: comment,
      });

      return comment;
    },
  },
};
