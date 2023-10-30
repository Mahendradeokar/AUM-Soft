import { comparePassword, hashPassword } from '@/common/common-function';
import { mongooseConnection } from '@/config/database';
import { getAuthUser } from '@/helper/jwt.helper';
import User from '@/model/user.model';
import { StatusCodes } from 'http-status-codes';

import { NextRequest, NextResponse } from 'next/server';

mongooseConnection();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user_id: userId } = await getAuthUser();
    const { old_password: oldPassword, new_password: newPassword } = reqBody;
    const userData = await User.findOne({ user_id: userId, is_deleted: false });
    if (!userData) {
      return NextResponse.json({ message: 'User not found' });
    }
    const isMatch = await comparePassword(oldPassword, userData.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: 'old password is incorrect please try again',
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }
    const bcryptPassword = await hashPassword(newPassword);
    await User.updateOne({ user_id: userId, is_deleted: false }, { password: bcryptPassword });
    return NextResponse.json({ message: 'password change successfully' }, { status: StatusCodes.OK });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
