import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';

export const addMarketplace = async (marketplaceData: {
  api_key: string;
  market_place_name: string;
  secret: string;
  account_name: string;
}) => {
  try {
    const { data: resData } = await axiosInstance.post('marketplace/add', marketplaceData);
    return successHandler(resData, { showNotification: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the login api....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};

export const getMarketplace = async () => {
  try {
    const { data: resData } = await axiosInstance.get('marketplace');
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get market place API....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
