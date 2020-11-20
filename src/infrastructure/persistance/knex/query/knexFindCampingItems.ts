import { container } from './../../../server/express/dependencyInjection';
import Knex from 'knex';
import CampingItem, {
  CampingItemType,
} from '../../../../domain/camping/model/read/campingItem';
import Location from '../../../../domain/camping/model/valueObject/location';
import { FindCampingItems } from '../../../../domain/camping/query/findCampingItems';

const KnexFindCampingItems: FindCampingItems = {
  async all(): Promise<CampingItemType[]> {
    var knex = container.get<Knex>('knex');
    var campings: CampingItemType[] = [];
    var results = await knex('api.camps_camping').select(
      'name',
      'address',
      'city',
      'longitude',
      'latitude'
    );

    for (const row of results) {
      const location = Location.createFromValues(
        row['longitude'],
        row['latitude']
      );
      const camping = CampingItem.createFromValues(
        row['name'],
        row['address'],
        row['city'],
        location
      );

      campings.push(camping);
    }

    return campings;
  },
};

export default KnexFindCampingItems;
