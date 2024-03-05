import { login, logout, signUp } from './auth';
import { addMarketplace, getMarketplace } from './marketplace';
import { changePassword, getProfile } from './profile';
import { getStatisticData, getOrdersData } from './dashboard';
import { uploadSheet } from './sheetUpload';

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

export const sheets = {
  upload: uploadSheet,
};
