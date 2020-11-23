import { FindCampingItems } from './../../../../domain/camping/query/findCampingItems';
import { KnexFindCampingItems } from './../../../persistance/knex/query';
import { Container } from 'inversify';

var container: Container;

function initContainer(): Container {
  container = new Container();
  container
    .bind<FindCampingItems>('FindCampingItems')
    .toConstantValue(KnexFindCampingItems);

  return container;
}

export { container, initContainer };
