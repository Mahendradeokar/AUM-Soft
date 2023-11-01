import { APIError } from '@/common/ApiError';
import axiosInstance from '@/config/axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TCommonAPICallHandler = {
  url: string;
  method: string;
  data?: object;
};

// @TODO :- BAD CODDING (MAHENDRA) NEED TO REFACTOR THIS LATTER.
export async function commonAPICallHandler({ url, method, data }: TCommonAPICallHandler): Promise<object | any[]> {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
    });
    return response;
  } catch (error: any) {
    if (error instanceof APIError) {
      if (error.error === 'ERR_JWT_EXPIRED') {
        throw new Error(error.error);
      }
      throw new Error(error.message);
    }

    throw new Error('Something went wrong, Please try again later!');
  }
}
