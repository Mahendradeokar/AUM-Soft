import { ITokenData } from '@/common/globle-constant';
import { mongooseConnection } from '@/config/database';
import User from '@/model/user.model';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

mongooseConnection();

export async function GET(request: NextRequest) {
  try {
    const tokenData = (request.headers as any).tokenData as ITokenData;
    const response = await User.findOne({ user_id: tokenData.user_id });
    return NextResponse.json({ message: 'data get successfully', data: response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
