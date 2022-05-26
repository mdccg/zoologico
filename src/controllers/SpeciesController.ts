import sql from './../database';

import Species, { getSpecies } from './../models/Species';

export const saveSpecies = async (species: Species): Promise<number> => {
  const response = await sql`
    INSERT INTO especies (id, nome_cientifico, nome_popular, habitat, familia, ordem)
    VALUES (
      ${`${species.id}`},
      ${species.scientificName},
      ${species.popularName},
      ${species.habitat},
      ${species.family},
      ${species.order}
    ) RETURNING id;
  `;

  const { id } = response[0];
  return Number(id);
}

export const getSpeciesById = async (id: number): Promise<Species> => {
  const response = await sql`
    SELECT * FROM especies WHERE id = ${id}
  `;

  const species = getSpecies(response[0]);

  return species;
}