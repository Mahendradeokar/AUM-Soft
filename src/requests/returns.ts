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
    case 'issue_orders':
      return null;
    default:
      return false;
  }
};

export const getReturnOrders = async ({
  accountId,
  status,
  isOrderIssue,
}: {
  accountId: string;
  status: Lowercase<ReturnOrderUnionType>;
  isOrderIssue?: boolean;
}) => {
  try {
    const params: {
      account_id: string;
      is_return_update?: string;
      status?: string;
      is_order_issue?: string;
    } = { account_id: accountId };
    const isReturnType = getReturnType(status)?.toString();

    if (isReturnType) params.is_return_update = isReturnType;
    if (status) params.status = status;
    if (isOrderIssue) params.is_order_issue = isOrderIssue.toString();

    const { data: resData } = await axiosInstance.get(`/sheet-order/return/`, { params });
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
