import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';
import { ReturnOrderUnionType } from '../../types';

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

const getReturnType = (status: Lowercase<ReturnOrderUnionType>) => {
  switch (status) {
    case 'completed':
      return null;
    case 'pending':
      return false;
    case 'return':
      return true;
    default:
      return false;
  }
};

export const getReturnOrders = async ({
  accountId,
  status,
}: {
  accountId: string;
  status: Lowercase<ReturnOrderUnionType>;
}) => {
  try {
    const params = new URLSearchParams();
    params.set('account_id', accountId);
    const isReturnType = getReturnType(status)?.toString();

    if (isReturnType) params.set('is_return_update', isReturnType);

    if (status) params.set('status', status);

    const { data: resData } = await axiosInstance.get(`/sheet-order/return/?${params.toString()}`);
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get return order api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};

export const sendScanOrder = async ({
  orderId, // returnType,
}: {
  orderId: string;
  // returnType: ReturnTypeUnion | null | undefined;
}) => {
  try {
    const { data: resData } = await axiosInstance.put(
      `sheet-order/update?order_id=${orderId}`, // &return_type=${returnType}
    );
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get return order api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
