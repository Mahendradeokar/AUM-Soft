import { mongooseConnection } from '@/config/database';
import {
  extractCollectionFees,
  extractCommissionFees,
  extractFixedFees,
  extractReverseShippingFees,
  extractShippingFees,
} from '@/helper/internal.helper';
import RateCard from '@/model/rate_card.model';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  try {
    await mongooseConnection();
    const { fsnCode, rateCard } = await request.json();
    const mergeRate = rateCard;
    const commission = extractCommissionFees(mergeRate.platformFee);
    const collectionFess = extractCollectionFees(mergeRate.collectionFee);
    const fixedFess = extractFixedFees(mergeRate.closingFee);
    const shippingFees = extractShippingFees(mergeRate.shippingFee);
    const reverseShippingFees = extractReverseShippingFees(mergeRate.reverseShippingFee);
    const rateCardFinalData = {
      fsn_code: fsnCode,
      commission,
      fixedFee: fixedFess,
      collection_fees: collectionFess,
      shippingFee: shippingFees,
      reverseShippingFee: reverseShippingFees,
    };

    const doc = await RateCard.create(rateCardFinalData);
    return NextResponse.json(
      { message: 'data get successfully', data: doc, rateCardFinalData },
      { status: StatusCodes.OK },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
