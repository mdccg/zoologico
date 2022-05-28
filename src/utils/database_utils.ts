import sql from './../database';

import {
  cages as jsonCages,
  species as jsonSpecies, 
  specimen as jsonSpecimen,
  caretakers as jsonCaretakers,
  intercalations
} from './../data/zoo.json';

import Cage, { getCage } from './../models/Cage';
import Species, { getSpecies } from './../models/Species';
import Specimen, { getSpecimen } from './../models/Specimen';
import Caretaker, { getCaretaker } from './../models/Caretaker';

import { saveCage } from './../controllers/CageController';
import { saveSpecies } from './../controllers/SpeciesController';
import { saveSpecimen } from './../controllers/SpecimenController';
import { saveCaretaker } from './../controllers/CaretakerController';

export const populateDatabase = async () => {
  const cagesArray: Cage[] = jsonCages.map((jsonObject) => getCage(jsonObject));
  const speciesArray: Species[] = jsonSpecies.map((jsonObject) => getSpecies(jsonObject));
  const caretakersArray: Caretaker[] = jsonCaretakers.map((jsonObject) => getCaretaker(jsonObject));

  speciesArray.forEach(async (species) => await saveSpecies(species));
  caretakersArray.forEach(async (caretaker) => await saveCaretaker(caretaker));
  cagesArray.forEach(async (cage) => await saveCage(cage));

  const specimenPromisesArray: Promise<Specimen>[] = jsonSpecimen.map(async (jsonObject) => await getSpecimen(jsonObject));
  const specimenArray = await Promise.all(specimenPromisesArray);

  specimenArray.forEach(async (specimen) => await saveSpecimen(specimen));

  intercalations.forEach(async (intercalation) => {
    await sql`
      INSERT INTO zeladores_jaulas (zelador_id, jaula_id)
      VALUES (
        ${intercalation.zelador_id},
        ${intercalation.jaula_id}
      );
    `;
  });

  console.log('⚡ Eu juro solenemente não fazer nada de bom');
}