import { getSpecimenBySpecies } from './controllers/SpecimenController';
import sql, { createTables, endConnection } from './database';

import { getSpecies } from './models/Species';

import { populateDatabase } from './utils/database_utils';

const main = async () => {
  await createTables();
  await populateDatabase();

  const rawCatSpecies = await sql`SELECT * FROM especies WHERE id = 1;`;
  const catSpecies = getSpecies(rawCatSpecies[0]);
  const allCats = await getSpecimenBySpecies(catSpecies);
  
  console.table(catSpecies);
  console.log(allCats);

  endConnection();
}

main();