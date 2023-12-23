import { getToken } from '@/lib/utils';
import axios from 'axios';

const configs: any = {
  development: {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_DEV,
  },

  test: {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_PROD,
  },

  staging: {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_STAGING,
  },
};

const axiosInstance = axios.create({
  baseURL: configs[process.env.NODE_ENV || 'development'].baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${getToken()}`;
  return request;
});

export default axiosInstance;
