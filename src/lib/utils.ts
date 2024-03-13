import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TOKEN } from '@/common/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToken() {
  return getCookie(TOKEN);
}

export function setToken(token: string) {
  setCookie(TOKEN, token);
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
