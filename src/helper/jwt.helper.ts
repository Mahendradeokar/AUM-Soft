import { ITokenData } from '@/common/globle-constant';
import { sign } from 'jsonwebtoken';
import { jwtVerify } from 'jose';
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
export async function verifyJwt(authorization: any): Promise<ITokenData> {
  const token = await jwtVerify(authorization, new TextEncoder().encode(process.env.SECRET_KEY));
  return token.payload as unknown as ITokenData;
}

export const getTokenData = async (request: any) => {
  const token = request.headers.get('authorization');
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
  return payload;
};
