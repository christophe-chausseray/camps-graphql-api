import { v4 as uuidv4 } from 'uuid';
import {
  CampingIdentifier,
  createCampingIdentifierFromString,
} from './../../../../domain/camping/valueObject';
import {
  Camping,
  NormalizedCamping,
  normalizeCamping,
} from './../../../../domain/camping/model/write';

const dataCampings: NormalizedCamping[] = [];

async function inMemoryCreateCampings(campings: Camping[]): Promise<void> {
  campings.map((camping: Camping) => {
    dataCampings.push(normalizeCamping(camping));
  });
}

function inMemoryGetCampingById(id: string): NormalizedCamping {
  return dataCampings.find((camping: NormalizedCamping) => id === camping.id);
}

function inMemoryNextCampingIdentifier(): CampingIdentifier {
  const campingIdentifier = createCampingIdentifierFromString(uuidv4());

  return campingIdentifier;
}

export {
  dataCampings,
  inMemoryCreateCampings,
  inMemoryGetCampingById,
  inMemoryNextCampingIdentifier,
};
