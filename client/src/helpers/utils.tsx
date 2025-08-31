import dayjs from 'dayjs';

export const convertToDayJS: (date: string) => string = (date) => {
  return dayjs(date).format('YYYY/MM/DD');
};
