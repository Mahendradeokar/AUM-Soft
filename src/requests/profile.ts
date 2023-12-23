import axiosInstance from '@/config/axios';
import successHandler from './success';
import errorHandler from './error';

export const changePassword = async (data: { old_password: string; new_password: string }) => {
  try {
    const { data: resData } = await axiosInstance.put('seller/change-password', data);
    return successHandler(resData, { showNotification: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the changes password API......', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};

export const getProfile = async () => {
  try {
    const { data: resData } = await axiosInstance.get('seller');
    return successHandler(resData, { showNotification: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling get profile API....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
