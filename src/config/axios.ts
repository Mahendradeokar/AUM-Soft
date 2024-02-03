import { getToken } from '@/lib/utils';
import axios from 'axios';
import { serverURL } from './common';

export const axiosInstance = axios.create({
  baseURL: serverURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${getToken()}`;
  return request;
});
