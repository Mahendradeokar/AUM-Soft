import { uuid } from 'uuidv4';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

export const generatePublicId = () => {
  return uuid();
};

export const setTimesTamp = () => {
  return dayjs().unix();
};
export const comparePassword = async (password: any, hash: any) => {
  return bcrypt.compareSync(password, hash);
};
