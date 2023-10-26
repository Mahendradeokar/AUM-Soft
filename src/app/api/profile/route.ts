import { mongooseConnection } from '@/config/database';
import { getTokenData } from '@/helper/jwt.helper';
import User from '@/model/user.model';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

mongooseConnection();

export async function GET(request: NextRequest) {
  try {
    const { user_id: userId } = await getTokenData(request);
    const response = await User.findOne({ user_id: userId, is_deleted: false });
    return NextResponse.json({ message: 'data get successfully', data: response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
