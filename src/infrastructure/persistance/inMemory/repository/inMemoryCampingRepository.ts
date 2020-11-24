import { Camping } from './../../../../domain/camping/model/write';

var dataCampings: Camping[] = [];

function createInMemoryCampings(campings: Camping[]): void {
  campings.map((camping: Camping) => {
    dataCampings.push(camping);
  });
}

export { dataCampings, createInMemoryCampings };
