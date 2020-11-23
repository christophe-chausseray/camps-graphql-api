import { FindCampingItems } from './../../../domain/camping/query/findCampingItems';
import { CampingItemType } from './../../../domain/camping/model/read/campingItem';
import { container } from './../../../infrastructure/server/express/dependencyInjection';

async function listCampingHandler(): Promise<CampingItemType[]> {
  const findCampingItemsQuery = container.get<FindCampingItems>(
    'FindCampingItems'
  );

  const campingItems: CampingItemType[] = await findCampingItemsQuery.all();

  return campingItems;
}

export { listCampingHandler };
