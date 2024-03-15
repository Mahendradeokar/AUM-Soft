import { axiosInstance } from '@/config';
import { isNegative } from '@/lib/utils';
import successHandler from './success';
import errorHandler from './error';

const convertIntoStatisticsData = (stats: {
  profit_loss: number;
  total_order: number;
  Customer_return: number;
  Courier_return: number;
}): {
  id: string | number;
  title: string;
  icon: any;
  totalValue: string | number;
  percentageChange: string;
}[] => {
  return [
    {
      id: 1,
      title: 'Profit/Loss',
      icon: 'svg-for-total-revenue',
      totalValue: `₹${stats.profit_loss.toFixed(2)}`,
      percentageChange: isNegative(stats.profit_loss.toFixed(2))
        ? `You loss is ${stats.profit_loss.toFixed(2)} till now.`
        : `You Profit is ${stats.profit_loss.toFixed(2)} till now.`,
    },
    {
      id: 2,
      title: 'Total Orders',
      icon: 'svg-for-subscriptions',
      totalValue: stats.total_order,
      percentageChange: `Your total order are ${stats.total_order} till now`,
    },
    {
      id: 3,
      title: 'Customer Return',
      icon: 'svg-for-sales',
      totalValue: stats.Customer_return,
      percentageChange: `Your total customer return are ${stats.Customer_return} till now`,
    },
    {
      id: 4,
      title: 'Courier Return',
      icon: 'svg-for-active-now',
      totalValue: stats.Courier_return,
      percentageChange: `Your total courier return are ${stats.Courier_return} till now`,
    },
  ];
};

export const getStatisticData = async () => {
  try {
    const { data: resData } = await axiosInstance.get('/sheet-order?is_analytics=true');
    const statsData = convertIntoStatisticsData(resData.data[0]);
    resData.data = statsData;
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
