import { setTimesTamp } from '@/common/common-function';
import { mongooseConnection } from '@/config/database';
import { getTokenData } from '@/helper/jwt.helper';
import UserCredential from '@/model/user_credential.model';

import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

mongooseConnection();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user_id: userId } = await getTokenData(request);
    const { api_key: apiKey, secret } = reqBody;
    const foundCredentials = await UserCredential.findOne({ api_key: apiKey });

    if (foundCredentials) {
      return NextResponse.json({
        error: 'credentials all ready added',
        status: StatusCodes.BAD_REQUEST,
      });
    }
    await UserCredential.create({
      api_key: apiKey,
      secret,
      user_id: userId,
      created_by: userId,
      created_at: setTimesTamp(),
    });
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
