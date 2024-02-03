import dayjs from 'dayjs';

export const convertUnixToDate = (date: number) => {
  return dayjs.unix(date).format('YYYY-MM-DD hh:mm:ss A');
};
