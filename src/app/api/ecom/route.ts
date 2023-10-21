import { ITokenData } from '@/common/globle-constant';
import { mongooseConnection } from '@/config/database';
import User from '@/model/user.model';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

mongooseConnection();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const tokenData = (request.headers as any).tokenData as ITokenData;
    const { api_key: apiKey, secret } = reqBody;
    const userData = await User.findOneAndUpdate(
      { user_id: tokenData.user_id, is_deleted: false },
      {
        $set: { 'user_credentials.api_key': apiKey, ' user_credentials.secret': secret },
      },
      {
        returnOriginal: true,
      },
    );
    if (!userData) {
      return NextResponse.json({
        error: 'credentials not added',
        status: StatusCodes.BAD_REQUEST,
      });
    }
    return NextResponse.json({
      success: 'credentials added successfully',
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
