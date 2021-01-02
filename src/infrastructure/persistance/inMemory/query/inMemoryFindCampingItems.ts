import { dataCampings } from './../repository';
import {
  CampingItem,
  createCampingItem,
} from './../../../../domain/camping/model/read/campingItem';

async function inMemoryFindCampingItems(): Promise<CampingItem[]> {
  const campingItems = [];

  for (const row of dataCampings) {
    const campingItem = createCampingItem(
      row['id'],
      row['name'],
      row['longitude'],
      row['latitude']
    );

    campingItems.push(campingItem);
  }

  return campingItems;
}

export { inMemoryFindCampingItems };
