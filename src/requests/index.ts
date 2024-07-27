import { login, logout, signUp } from './auth';
import { addMarketplace, getMarketplace } from './marketplace';
import { changePassword, getProfile } from './profile';
import { getStatisticData, getOrdersData } from './dashboard';
import { uploadOrders } from './orders';
import { getReturnOrders, sendScanOrder, uploadReturns } from './returns';
import { uploadPaymentSheet } from './payment';
import { getOrderCounts } from './general';

export const auth = {
  login,
  signUp,
  logout,
};

export const marketplace = {
  getMarketplace,
  addMarketplace,
};

export const profile = {
  changePassword,
  getProfile,
};

export const dashboard = {
  getStatisticData,
  getOrdersData,
};
/**
 * 
 * NOT USED @notUsed
 
  export const sheets = {
  upload: uploadSheet,
  }; 

 */

export const orders = {
  upload: uploadOrders,
};

export const returns = {
  upload: uploadReturns,
  getReturnOrders,
  sendScanOrder,
};

export const payment = {
  uploadPaymentSheet,
};

export const general = {
  getOrderCounts,
};
