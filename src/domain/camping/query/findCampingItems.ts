import { CampingItemType } from './../model/read/campingItem';

interface FindCampingItems {
  all: () => Promise<CampingItemType[]>;
}

export { FindCampingItems };
