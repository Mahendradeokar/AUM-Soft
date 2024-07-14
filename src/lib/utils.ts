import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TOKEN } from '@/common/constants';
import { forwardRef } from 'react';

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

export function fixedForwardRef<T, P = Record<any, any>>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return forwardRef(render) as any;
}
