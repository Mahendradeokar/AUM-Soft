import { axiosInstance, serverURL } from '@/config';
import successHandler from './success';
import errorHandler from './error';

const convertIntoStatisticsData = (stats: {
  net_profit: number;
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
      totalValue: `₹${stats.net_profit.toFixed(2)}`,
      percentageChange: '+20.1% from last month',
    },
    {
      id: 2,
      title: 'Total Orders',
      icon: 'svg-for-subscriptions',
      totalValue: stats.total_order,
      percentageChange: '+180.1% from last month',
    },
    {
      id: 3,
      title: 'Customer Return',
      icon: 'svg-for-sales',
      totalValue: stats.Courier_return,
      percentageChange: '+19% from last month',
    },
    {
      id: 4,
      title: 'Courier Return',
      icon: 'svg-for-active-now',
      totalValue: stats.Customer_return,
      percentageChange: '+201 since last hour',
    },
  ];
};

export const getStatisticData = async () => {
  try {
    const res = await fetch(`${serverURL}dashboard/get-order?is_analytics=true`, { next: { revalidate: 100 } });
    const data = await res.json();
    if (data.response_error) {
      return errorHandler(data, { showNotification: true });
    }
    const statsData = convertIntoStatisticsData(data.data.orderDetailList);
    data.data = statsData;
    return successHandler(data, { showNotification: true });
  } catch (error: any) {
    return errorHandler({ status_message: error.message }, { showNotification: true });
  }
};

export const getOrdersData = async ({
  status = null,
  order_id = null,
  sku_id = null,
  start_date = null,
  end_date = null,
  limit = null,
  // is_analytics = false,
  flipkart_status = null,
}) => {
  try {
    const { data: resData } = await axiosInstance.get('dashboard/get-order', {
      params: { status, order_id, sku_id, start_date, end_date, limit, flipkart_status },
    });
    return successHandler(resData, { showNotification: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get market place API....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
