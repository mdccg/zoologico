type Cage = {
  id?: number,
  code: number,
  area: number
};

export const getCage = (jsonObject: any) => {
  const { codigo, area } = jsonObject;

  const id = jsonObject.id ?? null;
  
  const cage: Cage = {
    id,
    code: codigo,
    area
  };

  return cage;
}

export default Cage;