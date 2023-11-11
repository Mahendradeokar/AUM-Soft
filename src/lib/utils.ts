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

export async function commonAPICallHandler({ url, method, data }: TCommonAPICallHandler): Promise<object | any[]> {
  const response = await axiosInstance({
    url,
    method,
    data,
  });
  return response;
}
