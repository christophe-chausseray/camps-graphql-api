import { readFileSync } from 'fs';
import color from 'colorette';
import { connectDb } from '../../persistance';
import { join } from 'path';
import { addCampingsHandler } from '../../../application/camping/command';
import {
  knexCreateCampings,
  knexNextCampingIdentifier,
} from '../../persistance/knex/repository';

const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan ut eros non mollis. Suspendisse sem risus, dignissim eu velit id, pulvinar viverra libero. Praesent vulputate risus in urna blandit, eget feugiat augue porttitor. In lobortis, neque nec fringilla efficitur, enim orci efficitur turpis, fermentum mattis purus massa sit amet nibh. Phasellus iaculis commodo neque, et bibendum augue aliquam eget. Donec eu vestibulum leo. Donec massa ligula, viverra nec tempor eu, tristique nec arcu. Suspendisse et accumsan tellus, eget facilisis ligula. Morbi gravida eleifend orci, vel sagittis metus accumsan sollicitudin. Sed luctus congue ligula, eu blandit arcu tincidunt nec. Etiam vitae molestie elit.';
const DEFAULT_IMAGE_LINK =
  'https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=';

async function importCampings(filepath: string): Promise<void> {
  try {
    const file = join(process.env.PWD, filepath);
    console.log('Import campings from', color.magenta(file));

    await connectDb();

    const rawData = JSON.parse(readFileSync(file, 'utf-8'));

    const handler = addCampingsHandler(
      knexCreateCampings,
      knexNextCampingIdentifier
    );
    const addCampingsCommand = [];

    for (const rawCamping of rawData) {
      addCampingsCommand.push({
        name: rawCamping['fields']['nom_commercial'],
        address: rawCamping['fields']['adresse'],
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE_LINK,
        zipcode: rawCamping['fields']['code_postal'],
        city: rawCamping['fields']['commune'],
        latitude: rawCamping['fields']['geo'][0],
        longitude: rawCamping['fields']['geo'][1],
        nb_spots: rawCamping['fields']['nombre_d_emplacements'],
        nb_stars: getNbStars(rawCamping['fields']['classement']),
        phone_number: rawCamping['fields']['telephone'],
        email: rawCamping['fields']['courriel'],
        website: rawCamping['fields']['site_internet'],
      });
    }

    await handler(addCampingsCommand);

    console.log(
      color.green(
        `Number of campings imported : ${String(addCampingsCommand.length)}`
      )
    );

    console.log(color.yellow('Done'));

    process.exit(0);
  } catch (error) {
    console.error(color.red(error));

    process.exit(1);
  }
}

enum Ranking {
  one = '1 étoile',
  two = '2 étoiles',
  three = '3 étoiles',
  four = '4 étoiles',
  five = '5 étoiles',
}

function getNbStars(ranking: Ranking): number {
  return Number(ranking.substr(0, 1));
}

export { importCampings };
