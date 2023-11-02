import { generatePublicId, setTimesTamp } from '@/common/common-function';
import { mongooseConnection } from '@/config/database';
import { getAuthUser } from '@/helper/jwt.helper';
import UserCredential from '@/model/user_credential.model';

import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await mongooseConnection();
    const reqBody = await request.json();
    const { user_id: userId } = await getAuthUser();
    const { api_key: apiKey, secret, market_place_name: marketPlaceName, account_name: accountName } = reqBody;
    const foundCredentials = await UserCredential.findOne({ api_key: apiKey, is_deleted: false });

    if (foundCredentials) {
      return NextResponse.json(
        {
          error: 'credentials all ready added',
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }
    const platformId = generatePublicId();
    await UserCredential.create({
      platform_id: platformId,
      market_place_name: marketPlaceName,
      account_name: accountName,
      api_key: apiKey,
      secret,
      user_id: userId,
      created_by: userId,
      created_at: setTimesTamp(),
    });

    return NextResponse.json(
      {
        success: 'credentials added successfully',
      },
      {
        status: StatusCodes.OK,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
