import User from '@/model/user.model';
import Session from '@/model/session.model';
import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, setTimesTamp } from '@/common/common-function';
import { createJwtToken } from '@/helper/jwt.helper';
import { mongooseConnection } from '@/config/database';
import { expiredValidSession } from '@/helper/session.helper';
import { cookies } from 'next/headers';

const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const sevenDayExpirationDate = new Date(Date.now() + sevenDaysInMilliseconds);
// const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
// const fifteenDayExpirationDate = new Date(Date.now() + fifteenDaysInMilliseconds);

mongooseConnection();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email, is_deleted: false });
    if (!user) {
      return NextResponse.json(
        {
          error: 'user not found',
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }
    // login password match
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          error: 'password does not match please try again',
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    // created jwt token
    const jwtToken = createJwtToken({
      user_id: user.user_id,
      email: user.email,
      created_by: user.user_id,
    });

    // create jwt refresh token
    // const refreshToken = await createRefreshToken({
    //   user_id: user.user_id,
    //   email: user.email,
    //   created_by: user.user_id,
    // });
    expiredValidSession({ userId: user.user_id });
    // created user session
    await Session.create({
      user_id: user.user_id,
      access_token: jwtToken,
      // refresh_token: refreshToken,
      created_by: user.user_id,
      is_expired: false,
      created_at: setTimesTamp(),
    });

    const userData = {
      user_id: user.user_id,
      email: user.email,
      // token: jwtToken,
      // refreshToken,
    };

    cookies().set('token', jwtToken, {
      maxAge: sevenDaysInMilliseconds,
      expires: sevenDayExpirationDate,
      httpOnly: true,
      path: '/',
      // secure: true,
      // sameSite: true,
    });

    // cookies().set('refreshToken', refreshToken, {
    //   maxAge: fifteenDaysInMilliseconds,
    //   expires: fifteenDayExpirationDate,
    //   httpOnly: true,
    //   path: '/',
    //   // secure: true,
    //   // sameSite: true,
    // });

    return NextResponse.json(
      {
        userData,
        success: 'user successfully login',
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
