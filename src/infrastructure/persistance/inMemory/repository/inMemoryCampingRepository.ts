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
import {
  CampingItem,
  createDetailedCampingItem,
} from '../../../../domain/camping/model/read';

const dataCampings: NormalizedCamping[] = [];

async function inMemoryCreateCampings(campings: Camping[]): Promise<void> {
  campings.map((camping: Camping) => {
    dataCampings.push(normalizeCamping(camping));
  });
}

function inMemoryGetCampingById(id: string): Promise<CampingItem> {
  const selectedCamping = dataCampings.find(
    (camping: NormalizedCamping) => id === camping.id
  );

  return new Promise((resolve) => {
    resolve(
      createDetailedCampingItem(
        selectedCamping.id,
        selectedCamping.name,
        selectedCamping.description,
        selectedCamping.image,
        selectedCamping.address,
        selectedCamping.zipcode,
        selectedCamping.city,
        selectedCamping.nb_spots,
        selectedCamping.nb_stars,
        selectedCamping.phone_number,
        selectedCamping.email,
        selectedCamping.website,
        selectedCamping.longitude,
        selectedCamping.latitude
      )
    );
  });
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
