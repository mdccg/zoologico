type Species = {
  id?: number,
  scientificName: string,
  popularName: string,
  habitat: string,
  family: string,
  order: string
};

export const getSpecies = (jsonObject: any) => {
  const { nome_cientifico, nome_popular, habitat, familia, ordem } = jsonObject;
  
  const id = jsonObject.id ?? null;

  const species: Species = {
    id,
    scientificName: nome_cientifico,
    popularName: nome_popular,
    habitat,
    family: familia,
    order: ordem
  };

  return species;
}

export default Species;