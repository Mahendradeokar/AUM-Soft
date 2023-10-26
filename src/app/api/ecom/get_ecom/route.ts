import { getTokenData } from '@/helper/jwt.helper';
import UserCredential from '@/model/user_credential.model';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { user_id: userId } = await getTokenData(request);
    const credentialDetails = await UserCredential.find({ user_id: userId, is_deleted: false });
    if (!credentialDetails) {
      return NextResponse.json({
        success: 'Credential not found',
        status: StatusCodes.NOT_FOUND,
      });
    }
    return NextResponse.json({ message: 'Credential details successfully retrieved', data: credentialDetails });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
