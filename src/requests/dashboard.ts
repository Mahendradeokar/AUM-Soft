import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';

export const getStatisticData = async ({ accountId }: { accountId: string }) => {
  try {
    let params: { account_id: string } = { account_id: accountId };
    const { data: resData } = await axiosInstance.get('/sheet-order/order-analytics', {
      params,
    });
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    return errorHandler({ status_message: error.message }, { showNotification: true });
  }
};

interface IGetOrder {
  status?: string;
  order_id?: string;
  sku_id?: string;
  start_date?: number | null;
  end_date?: number | null;
  is_analytics?: boolean;
  flipkart_status?: string;
  sort_column?: string;
  sort_order?: string;
  flipkart_by?: string;
  limit?: number;
  offset?: number;
}

export const getOrdersData = async ({
  status,
  order_id,
  sku_id,
  start_date,
  end_date,
  // is_analytics = false,
  flipkart_status,
  // sort_column = 'created_at',
  // sort_order = 'asc',
  flipkart_by = 'All',
  limit,
  offset,
}: IGetOrder) => {
  try {
    const { data: resData } = await axiosInstance.get('/sheet-order', {
      params: {
        status,
        order_id,
        sku_id,
        start_date,
        end_date,
        flipkart_status,
        // sort_column,
        // sort_order,
        limit,
        offset,
        flipkart_by,
      },
    });
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get market place API....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
