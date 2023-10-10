import User from '@/model/user.model';
import session from '@/model/session.model';
import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, setTimesTamp } from '@/common/common-function';
import { createJwtToken, createRefreshToken } from '@/helper/jwt.helper';
import { mongooseConnection } from '@/config/database';

mongooseConnection();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email, is_deleted: false });
    if (!user) {
      return NextResponse.json({
        error: 'user not found',
        status: StatusCodes.NOT_FOUND,
      });
    }
    // login password match
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        error: 'password does not match please try again',
        status: StatusCodes.BAD_REQUEST,
      });
    }

    // created jwt token
    const jwtToken = createJwtToken({
      user_id: user.user_id,
      email: user.email,
      created_by: user.user_id,
    });

    // create jwt refresh token
    const refreshToken = await createRefreshToken({
      user_id: user.user_id,
      email: user.email,
      created_by: user.user_id,
    });

    // created user session
    await session.create({
      user_id: user.user_id,
      access_token: jwtToken,
      refresh_token: refreshToken,
      created_by: user.user_id,
      is_expired: false,
      created_at: setTimesTamp(),
    });

    const userData = {
      user_id: user.user_id,
      email: user.email,
      token: jwtToken,
      refreshToken,
    };
    return NextResponse.json({
      userData,
      success: 'user successfully login',
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
