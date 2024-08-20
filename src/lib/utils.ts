import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TOKEN } from '@/common/constants';
import { forwardRef } from 'react';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToken() {
  return getCookie(TOKEN);
}

export function setToken(token: string, { maxAge }: { maxAge: number }) {
  setCookie(TOKEN, token, { maxAge });
}

export function deleteToken() {
  deleteCookie(TOKEN);
}

type LocalStoredData = Record<string, unknown> | Array<unknown>;

export const getLocalStoredData = (id: string): LocalStoredData | null => {
  const preVal: string | null = localStorage.getItem(id);
  if (preVal) {
    return JSON.parse(preVal);
  }
  return null;
};

export const storeDataLocally = (id: string, value: LocalStoredData) => {
  const preVal = getLocalStoredData(id);
  const dataToBeStore = {
    ...(preVal ?? {}),
    ...value,
  };
  localStorage.setItem(id, JSON.stringify(dataToBeStore));
  return dataToBeStore;
};

export const getFileFromUrl = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], 'image', { type: blob.type });
};

export const isNegative = (value: string | number) => {
  const type = typeof value;
  if (type === 'string') {
    return (value as string).includes('-');
  }

  if (type === 'number') {
    return (value as number) < 0;
  }

  return value;
};

export const isZero = (value: string | number) => {
  const type = typeof value;
  if (type === 'string') {
    return Number(value) === 0;
  }

  if (type === 'number') {
    return (value as number) === 0;
  }

  return false;
};

export function fixedForwardRef<T, P = Record<any, any>>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return forwardRef(render) as any;
}

export function reloadSite() {
  if (window) {
    window.location.reload();
  }
}

export function sortArrayOfObjectsByKey(arr: any[], key: string) {
  return arr.sort((a, b) => {
    if (a[key] && b[key]) {
      return a[key][0].localeCompare(b[key]);
    }
    return 0;
  });
}

export const objectEntities = <TData extends Record<any, any>>(obj: {
  [K in keyof TData]: TData[K];
}): [keyof TData, TData[keyof TData]][] => Object.entries(obj) as [keyof TData, TData[keyof TData]][];

type CalculateDaysAgoParams = {
  date: number;
  threshold?: number;
};

type FormatDateParams = {
  date: number;
  daysAgo: number;
  threshold: number;
};

// Function to calculate the difference in days
export const calculateDaysDifference = (date: number): number => {
  const createdDate = dayjs.unix(date).startOf('day');
  const today = dayjs().startOf('day');
  return today.diff(createdDate, 'day');
};

export const formatUnixDate = (date: number, format: string = 'D MMMM YY'): string => {
  return dayjs.unix(date).format(format);
};

// Function to format the date based on the difference in days and threshold
export const formatDaysAgo = ({ date, daysAgo, threshold }: FormatDateParams): string => {
  if (daysAgo > threshold) {
    return formatUnixDate(date, 'D MMMM YY');
  }
  if (daysAgo === 0) {
    return 'Today';
  }
  return `${daysAgo} day ago`;
};

// Main function that combines the above responsibilities
export const calculateDaysAgo = ({ date, threshold = 3 }: CalculateDaysAgoParams): string => {
  const daysAgo = calculateDaysDifference(date);
  return formatDaysAgo({ date, daysAgo, threshold });
};
