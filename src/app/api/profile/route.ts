import { mongooseConnection } from '@/config/database';
import { getAuthUser } from '@/helper/jwt.helper';
import User from '@/model/user.model';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

mongooseConnection();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const { user_id: userId } = await getAuthUser();
    const response: any = await User.findOne({ user_id: userId, is_deleted: false }).lean();
    delete response.password;
    return NextResponse.json({ message: 'data get successfully', data: response }, { status: StatusCodes.OK });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
