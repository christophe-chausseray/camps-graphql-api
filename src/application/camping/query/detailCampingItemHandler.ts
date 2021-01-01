import { CampingItem } from '../../../domain/camping/model/read';

type DetailCampingItemQuery = {
  campingItemId: string;
};

const detailCampingItemHandler = (
  getCampingById: (id: string) => Promise<CampingItem>
) => async (
  detailCampingItemQuery: DetailCampingItemQuery
): Promise<CampingItem> => {
  const campingItem = await getCampingById(
    detailCampingItemQuery.campingItemId
  );

  return campingItem;
};

export { detailCampingItemHandler };
