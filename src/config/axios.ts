import { APIError } from '@/common/ApiError';
import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response here
    return response.data;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      const statusCode = axiosError.response?.status || 500;
      const errorCode = axiosError.response?.data?.error || 'Unknown';
      const responseData = axiosError.response?.data;
      if (responseData) {
        const resData: { error?: string } = responseData as { error?: string };
        return Promise.reject(new APIError(statusCode, resData.error || 'An error occurred.', errorCode));
      }
      return Promise.reject(new APIError(statusCode, 'Unknown API error!!', errorCode));
    }
    return Promise.reject(new Error('An unexpected error occurred.'));
  },
);

export default axiosInstance;
