import { ITokenData } from '@/common/globle-constant';
import { sign } from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

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

export const getTokenData = async (token: string) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
  return payload;
};

export const getToken = () => {
  return cookies().get('token')?.value ?? null;
};

export const getAuthUser = async () => {
  const token = getToken()!; // (!) To inform TypeScript that token will always be present
  const userData = await getTokenData(token);
  return userData;
};
