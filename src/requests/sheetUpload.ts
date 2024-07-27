import { axiosInstance } from '@/config';
import successHandler from './success';
import errorHandler from './error';
/**
 *
 * No being used @notUsed
 *
 */
export const uploadSheet = async ({ formData }: any) => {
  try {
    const { data: resData } = await axiosInstance.post('sheet-order/upload', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error while calling the get market place API....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true });
  }
};
