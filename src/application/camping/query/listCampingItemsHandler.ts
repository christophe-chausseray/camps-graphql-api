import { CampingItem } from '../../../domain/camping/model/read';

async function listCampingItemsHandler(
  findCampingItemsQuery: () => Promise<CampingItem[]>
): Promise<CampingItem[]> {
  const campingItems: CampingItem[] = await findCampingItemsQuery();

  return campingItems;
}

export { listCampingItemsHandler };
