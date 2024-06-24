import { axiosInstance } from '@/config';
import { ReturnTypeUnion } from '@/components/orderManagement/type';
import successHandler from './success';
import errorHandler from './error';
import { ReturnOrderType, ReturnOrderUnionType } from '../../types';

export const uploadReturns = async ({ formData }: { formData: any }) => {
  try {
    const { data: resData } = await axiosInstance.post('/sheet-order/return', formData, {
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

export const getReturnOrders = async ({
  accountId,
  orderType,
}: {
  accountId: string;
  orderType: ReturnOrderUnionType;
}) => {
  try {
    const { data: resData } = await axiosInstance.get(
      `/sheet-order/return/?account_id=${accountId}&is_return_update=${orderType === ReturnOrderType.PENDING}`,
    );
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get return order api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};

export const sendScanOrder = async ({
  orderId,
  returnType,
}: {
  orderId: string;
  returnType: ReturnTypeUnion | null | undefined;
}) => {
  try {
    const { data: resData } = await axiosInstance.put(
      `sheet-order/update?order_id=${orderId}&return_type=${returnType}`,
    );
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get return order api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
