import Species from './Species';
import Cage from './Cage';

import { getSpeciesById } from './../controllers/SpeciesController';
import { getCageById } from './../controllers/CageController';

type Specimen = {
  id?: number,
  serialNumber: number,
  surname?: string,
  species: Species,
  cage: Cage
};

export const getSpecimen = async (jsonObject: any): Promise<Specimen> => {
  const { numero_serie, apelido, especie_id, jaula_id } = jsonObject;
  
  const id = jsonObject.id ?? null;

  const species = await getSpeciesById(especie_id);
  const cage = await getCageById(jaula_id);

  const specimen: Specimen = {
    id,
    serialNumber: numero_serie,
    surname: apelido,
    species,
    cage
  };

  return specimen;
}

export default Specimen;