import sql from './../database';

import Caretaker from './../models/Caretaker';
import Cage, { getCage } from './../models/Cage';

export const saveCage = async (cage: Cage): Promise<number> => {
  const response = await sql`
    INSERT INTO jaulas (id, codigo, area)
    VALUES (
      ${`${cage.id}`},
      ${cage.code},
      ${cage.area}
    ) RETURNING id;
  `;

  const { id } = response[0];
  return Number(id);
}

export const getCagesByCaretaker = async (caretaker: Caretaker): Promise<Cage[]> => {
  const response = await sql`
    SELECT * FROM jaulas
      INNER JOIN zeladores_jaulas ON jaulas.id = zeladores_jaulas.jaula_id
      WHERE zeladores_jaulas.zelador_id = ${`${caretaker.id}`};
  `;

  const cages = response.map((jsonObject) => getCage(jsonObject));

  return cages;
}

export const getCageById = async (id: number): Promise<Cage> => {
  const response = await sql`
    SELECT * FROM jaulas WHERE id = ${id}
  `;

  const cage = getCage(response[0]);

  return cage;
}