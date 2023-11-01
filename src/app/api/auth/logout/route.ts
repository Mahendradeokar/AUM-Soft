import { getToken, getTokenData } from '@/helper/jwt.helper';
import Session from '@/model/session.model';
import { StatusCodes } from 'http-status-codes';
import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token: any = getToken();
    const { user_id: userId } = await getTokenData(token);

    const sessionData = await Session.findOne({ user_id: userId, is_expired: false });
    if (!sessionData) {
      return NextResponse.json({ error: 'user session not found' }, { status: StatusCodes.NOT_FOUND });
    }
    await Session.updateOne({ user_id: userId, is_expired: false }, { $set: { is_expired: true } });
    cookies().delete('token');
    return NextResponse.json({ success: 'user successfully logout' }, { status: StatusCodes.OK });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
