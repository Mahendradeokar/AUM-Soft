import { APIError } from '@/common/ApiError';
import { TCommonAPIResponse } from '@/lib/lib.types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';

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
  request.headers.Authorization = `Bearer ${getCookie('token')}`;
  return request;
});

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    // Handle successful response here
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<TCommonAPIResponse>;
      const statusCode = axiosError.response?.status || 500;
      const errorCode = axiosError.response?.data?.status_message || 'UNKNOWN';
      return Promise.reject(new APIError(statusCode, errorCode || 'An error occurred.'));
    }
    return Promise.reject(new Error('An unexpected error occurred.'));
  },
);

export default axiosInstance;
