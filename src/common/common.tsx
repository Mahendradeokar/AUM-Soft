import dayjs from 'dayjs';

export const convertUnixToDate = (date: number) => {
  return dayjs.unix(date).format('DD-MM-YYYY');
};
