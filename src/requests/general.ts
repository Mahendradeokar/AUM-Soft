import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';

export const getOrderCounts = async () => {
  try {
    const { data: resData } = await axiosInstance.get('/sheet-order/order-report');
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the login api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
