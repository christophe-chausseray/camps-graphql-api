import { CommentItem } from '../../../domain/camping/model/read';
import {
  CampingIdentifier,
  createCampingIdentifier,
} from '../../../domain/camping/valueObject';

type ListCommentItemsByCampingQuery = {
  campingId: string;
};

const listCommentItemsByCampingHandler = (
  findCommentItemsByCampingQuery: (
    campingIdentifier: CampingIdentifier
  ) => Promise<CommentItem[]>
) => async (
  listCommentItemsByCampingQuery: ListCommentItemsByCampingQuery
): Promise<CommentItem[]> => {
  const campingIdentifier = createCampingIdentifier(
    listCommentItemsByCampingQuery.campingId
  );

  const commentItems = await findCommentItemsByCampingQuery(campingIdentifier);

  return commentItems;
};

export { ListCommentItemsByCampingQuery, listCommentItemsByCampingHandler };
