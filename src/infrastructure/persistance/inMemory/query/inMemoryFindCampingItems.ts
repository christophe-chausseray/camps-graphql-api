import {
  CampingItem,
  createCampingFromValues,
} from './../../../../domain/camping/model/read/campingItem';

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

async function inMemoryFindCampingItems(): Promise<CampingItem[]> {
  const campingItems = [];

  for (const row of dataRows) {
    const campingItem = createCampingFromValues(
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
