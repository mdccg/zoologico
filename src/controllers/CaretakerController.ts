import sql from './../database';

import Species from './../models/Species';
import Caretaker, { getCaretaker } from './../models/Caretaker';

import { parseDateToString } from '../utils/date_utils';

export const saveCaretaker = async (caretaker: Caretaker): Promise<number> => {
  const response = await sql`
    INSERT INTO zeladores (id, matricula, nome, data_nascimento)
    VALUES (
      ${`${caretaker.id}`},
      ${caretaker.matriculation},
      ${caretaker.name},
      ${parseDateToString(caretaker.birthDate)}
    ) RETURNING id;
  `;

  const { id } = response[0];
  return Number(id);
}

export const getCaretakersBySpecies = async (species: Species): Promise<Caretaker[]> => {
  const response = await sql`
    SELECT * FROM zeladores
      INNER JOIN zeladores_jaulas ON zeladores.id = zeladores_jaulas.zelador_id
      INNER JOIN jaulas ON zeladores_jaulas.jaula_id = jaulas.id
      INNER JOIN especimes ON jaulas.id = especimes.jaula_id
      INNER JOIN especies oN especimes.especie_id = especies.id
      WHERE especies.id = ${`${species.id}`};
  `;

  const caretakers = response.map((jsonObject) => getCaretaker(jsonObject));

  return caretakers;
}