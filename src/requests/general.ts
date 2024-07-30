import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';

interface CountArg {
  accountId: string;
}

export const getOrderCounts = async ({ accountId = 'all' }: CountArg) => {
  try {
    const { data: resData } = await axiosInstance.get('/sheet-order/order-report', {
      params: {
        account_id: accountId,
      },
    });
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the login api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
