import { axiosInstance } from '@/config';
import { PaginationState } from '@tanstack/react-table';
import successHandler from './success';
import errorHandler from './error';
import type { OrderReturnTypeUnion, ReturnOrderUnionType } from '../../types';

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

const getPayloadData = (
  status: Lowercase<ReturnOrderUnionType>,
  { returnType }: { returnType?: OrderReturnTypeUnion },
) => {
  switch (status) {
    case 'completed':
      return {
        status: 'completed',
      };
    case 'pending':
      return {
        is_return_update: false,
      };
    case 'return':
      return {
        is_return_update: true,
        status: returnType,
      };
    case 'issue_orders':
      return {
        is_order_issue: true,
      };
    default:
      return false;
  }
};

export const getReturnOrders = async ({
  accountId,
  status,
  returnType,
  pagination = { pageIndex: 0, pageSize: 10 },
}: {
  accountId: string;
  status: Lowercase<ReturnOrderUnionType>;
  returnType?: OrderReturnTypeUnion;
  pagination?: PaginationState;
}) => {
  try {
    let params: any = { account_id: accountId };
    if (pagination) {
      params.limit = pagination.pageSize;
      params.offset = pagination.pageIndex + 1;
    }

    const payload = getPayloadData(status, { returnType });

    params = {
      ...params,
      ...payload,
    };

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
} // accountId,
: {
  orderId: string;
  returnType?: OrderReturnTypeUnion | null | undefined;
  // accountId: string;
}) => {
  try {
    const { data: resData } = await axiosInstance.put(`sheet-order/update`, {
      // account_id: accountId,
      order_id: orderId,
    });
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get return order api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
