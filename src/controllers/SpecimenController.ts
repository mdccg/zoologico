import sql from './../database';

import Cage from './../models/Cage';
import Species from './../models/Species';
import Specimen, { getSpecimen } from './../models/Specimen';
import Caretaker from './../models/Caretaker';

export const saveSpecimen = async (specimen: Specimen) => {
  const response = await sql`
    INSERT INTO especimes (numero_serie, apelido, especie_id, jaula_id)
    VALUES (
      ${`${specimen.serialNumber}`},
      ${`${specimen.surname}`},
      ${`${specimen.species.id}`},
      ${`${specimen.cage.id}`}
    ) RETURNING id;
  `;

  const { id } = response[0];
  return Number(id);
}

export const getSpecimenBySpecies = async (species: Species) /* FIXME retorno não deu certo */ => {
  const response = await sql`
    SELECT * FROM especimes
      INNER JOIN especies ON especimes.especie_id = especies.id
      WHERE especies.id = ${`${species.id}`};
  `;

  const specimen = response.map((jsonObject) => getSpecimen(jsonObject));

  return specimen;
}

export const getSpecimenByCage = async (cage: Cage) /* FIXME retorno não deu certo */ => {
  const response = await sql`
    SELECT * FROM especimes
      INNER JOIN jaulas ON especimes.jaula_id = jaulas.id
      WHERE jaulas.id = ${`${cage.id}`};
  `;

  const specimen = response.map((jsonObject) => getSpecimen(jsonObject));

  return specimen;
}

export const getSpecimenByCaretaker = async (caretaker: Caretaker) /* FIXME retorno não deu certo */ => {
  const response = await sql`
    SELECT * FROM especimes
      INNER JOIN jaulas ON especimes.jaula_id = jaulas.id
      INNER JOIN zeladores_jaulas ON jaulas.id = zeladores_jaulas.jaula_id
      WHERE zeladores_jaulas.zelador_id = ${`${caretaker.id}`};
  `;

  const specimen = response.map((jsonObject) => getSpecimen(jsonObject));

  return specimen;
}