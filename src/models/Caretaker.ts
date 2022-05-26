import { parseDate } from './../utils/date_utils';

type Caretaker = {
  id?: number,
  matriculation: string,
  name: string,
  birthDate: Date
};

export const getCaretaker = (jsonObject: any) => {
  const { matricula, nome, data_nascimento } = jsonObject;
  
  const id = jsonObject.id ?? null;

  const caretaker: Caretaker = {
    id,
    matriculation: matricula, 
    name: nome,
    birthDate: parseDate(data_nascimento)
  };

  return caretaker;
}

export default Caretaker;