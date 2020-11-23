import CampingItem, {
  CampingItemType,
} from './../../../../domain/camping/model/read/campingItem';
import Location from '../../../../domain/camping/model/valueObject/location';
import { FindCampingItems } from './../../../../domain/camping/query/findCampingItems';

const InMemoryFindCampingItems: FindCampingItems = {
  async all(): Promise<CampingItemType[]> {
    const dataRows = [
      {
        name: 'CAMPING HUTTOPIA RAMBOUILLET',
        address: "Route du Château d'eau",
        zipcode: 78120,
        city: 'RAMBOUILLET',
        longitude: 48.630059,
        latitude: 1.835694,
      },
      {
        name: 'CARAVANING LE VAUVERT',
        address: '26 Route de Vauvert',
        zipcode: 91150,
        city: 'ORMOY-LA-RIVIÈRE',
        longitude: 48.411278,
        latitude: 2.143939,
      },
    ];
    const campingItems = [];

    for (const row of dataRows) {
      const location = Location.createFromValues(
        row['longitude'],
        row['latitude']
      );
      const campingItem = CampingItem.createFromValues(
        row['name'],
        row['address'],
        row['city'],
        location
      );

      campingItems.push(campingItem);
    }

    return campingItems;
  },
};

export default InMemoryFindCampingItems;
