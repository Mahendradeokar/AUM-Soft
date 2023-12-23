import { deleteToken, setToken } from '@/lib/utils';
import axiosInstance from '@/config/axios';
import successHandler from './success';
import errorHandler from './error';

export const login = async (data: { email: string; password: string }) => {
  try {
    const { data: resData } = await axiosInstance.post('auth/login', data);
    const rc = successHandler(resData, { showNotification: false });
    setToken(resData.data.token);
    return rc;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the login api....', error);
    return errorHandler(error?.response?.data ?? error ?? error, { showNotification: true });
  }
};

export const signUp = async (data: { username: string; email: string; password: string }) => {
  try {
    const { data: resData } = await axiosInstance.post('seller', data);
    return successHandler(resData, { showNotification: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the signup api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};

export const logout = async () => {
  try {
    const { data: resData } = await axiosInstance.post('auth/logout');
    deleteToken();
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the logout api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
