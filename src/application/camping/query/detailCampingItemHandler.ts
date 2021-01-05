import { CampingItem } from '../../../domain/camping/model/read';

type DetailCampingItemQuery = {
  campingId: string;
};

const detailCampingItemHandler = (
  getCampingById: (id: string) => Promise<CampingItem>
) => async (
  detailCampingItemQuery: DetailCampingItemQuery
): Promise<CampingItem> => {
  const campingItem = await getCampingById(detailCampingItemQuery.campingId);

  return campingItem;
};

export { detailCampingItemHandler };
