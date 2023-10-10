import { ITokenData } from '@/common/globle-constant';
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtOption = {
  expiresIn: process.env.EXPIRED_IN || '1d',
};

const refreshTokenOption = {
  expiresIn: process.env.REFRESH_EXPIRED_IN || '1y',
};

export const createJwtToken = (data: ITokenData) => {
  return sign(data, process.env.SECRET_KEY!, jwtOption);
};
export const createRefreshToken = (data: ITokenData) => {
  return sign(data, process.env.SECRET_KEY!, refreshTokenOption);
};
export async function verifyJwt(authorization: string): Promise<ITokenData> {
  const token = await verify(authorization, process.env.SECRET_KEY!);
  return token as ITokenData;
}
