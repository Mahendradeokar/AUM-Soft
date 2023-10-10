import User from '@/model/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { generatePublicId, setTimesTamp } from '@/common/common-function';
import { mongooseConnection } from '@/config/database';

mongooseConnection();
export async function Post(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // already exists user
    const userData = await User.findOne({ email, is_deleted: false });
    if (userData) {
      return NextResponse.json({
        error: 'User already exists',
        status: StatusCodes.BAD_REQUEST,
      });
    }

    // create new user
    const userId = generatePublicId();
    new User({
      user_id: userId,
      user_name: username,
      email,
      password,
      created_at: setTimesTamp(),
      created_by: userId,
    });
    return NextResponse.json({
      success: 'user created successfully',
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
