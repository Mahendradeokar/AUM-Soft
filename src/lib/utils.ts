import { EShipmentType, EShipmentZones } from '@/common/globle-constant';
// import axiosInstance from '@/config/axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { TCommonAPICallHandler, TCommonAPIResponse } from './lib.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export async function commonAPICallHandler({ url, method, data }: TCommonAPICallHandler): Promise<TCommonAPIResponse> {
//   const response = await axiosInstance({
//     url,
//     method,
//     data,
//   });
//   return response.data as TCommonAPIResponse;
// }

function getFirstDigits(number: string | number, digits: number): number {
  const numberString = String(number);
  const firstDigitsString = numberString.slice(0, digits);
  const firstDigits = Number(firstDigitsString);

  if (Number.isNaN(firstDigits)) {
    throw new Error(`Cannot convert "${firstDigitsString}" to a valid number.`);
  }

  return firstDigits;
}

function returnZone(firstDigitOfPinCode: string | number): EShipmentZones {
  switch (Number(firstDigitOfPinCode)) {
    case 1:
    case 2:
      return EShipmentZones.NORTH;

    case 3:
    case 4:
      return EShipmentZones.WEST;

    case 5:
    case 6:
      return EShipmentZones.SOUTH;

    case 7:
    case 8:
      return EShipmentZones.EAST;
    default:
      return EShipmentZones['N/A'];
  }
}

export function returnShipmentType(
  sellerPinCode: string | number,
  buyerPinCode: string | number,
): EShipmentType | null {
  const sellerFirstTwoDigits = getFirstDigits(sellerPinCode, 2);
  const buyerFirstTwoDigits = getFirstDigits(buyerPinCode, 2);

  const sellerFirstDigit = getFirstDigits(sellerFirstTwoDigits, 1);
  const buyerFirstDigit = getFirstDigits(buyerFirstTwoDigits, 1);
  // if ()
  if (sellerFirstTwoDigits === buyerFirstTwoDigits) {
    return EShipmentType.Local;
  }

  const sellerZone = returnZone(sellerFirstDigit);
  const buyerZone = returnZone(buyerFirstDigit);
  // const digitDifference = Math.abs(sellerFirstDigit - buyerFirstDigit);

  if (sellerZone === buyerZone) {
    return EShipmentType.Zonal;
  }

  if (sellerZone !== buyerZone) {
    return EShipmentType.National;
  }

  return EShipmentType['N/A'];
}
