export const parseDate = (stringDate: string) => {
  const [year, month, day] = stringDate.split('-').map((string) => Number(string));
  const date = new Date(year, month - 1, day);
  return date;
}

const getMonth = (utcMonth: number) => {
  return ('0' + `${utcMonth + 1}`).slice(-2);
}

export const parseDateToString = (date: Date) => {
  const utcMonth = date.getUTCMonth();

  const stringDate = [
    date.getFullYear(),
    getMonth(utcMonth),
    date.getDate()
  ].join('-');
  
  return stringDate;
}