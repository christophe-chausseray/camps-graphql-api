import { dataCampings } from './../repository';
import {
  CampingItem,
  createCampingItemFromValues,
} from './../../../../domain/camping/model/read/campingItem';

async function inMemoryFindCampingItems(): Promise<CampingItem[]> {
  const campingItems = [];

  for (const row of dataCampings) {
    const campingItem = createCampingItemFromValues(
      row['name'],
      row['address'],
      row['city'],
      row['longitude'],
      row['latitude']
    );

    campingItems.push(campingItem);
  }

  return campingItems;
}

export { inMemoryFindCampingItems };
