import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';

export const cancelOrder = async ({ orderId }: { orderId: string }) => {
  try {
    const { data: resData } = await axiosInstance.put(`sheet-order/cancelled-order`, {
      sub_order_id: orderId,
    });
    return successHandler(resData, { showNotification: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get return order api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
