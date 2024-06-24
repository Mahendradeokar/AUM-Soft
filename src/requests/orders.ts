import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';

export const uploadOrders = async ({ formData }: { formData: any }) => {
  try {
    const { data: resData } = await axiosInstance.post('/sheet-order/upload', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
    return successHandler(resData, { showNotification: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the login api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
