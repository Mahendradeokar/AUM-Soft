import axiosInstance from '@/config/axios';

// AUTH
const login = (data: { email: string; password: string }) => axiosInstance.post('auth/login', data);
const signup = (data: { username: string; email: string; password: string }) => axiosInstance.post('seller', data);
const logout = () => axiosInstance.post('auth/logout');

export const auth = {
  login,
  signup,
  logout,
};

// MARKETPLACE
const addMarketplace = (marketplaceData: {
  api_key: string;
  market_place_name: string;
  secret: string;
  account_name: string;
}) => axiosInstance.post('marketplace/add', marketplaceData);
const getMarketplace = () => axiosInstance.get('marketplace/get');
export const marketplace = {
  addMarketplace,
  getMarketplace,
};

// PROFILE
const changePassword = (data: { old_password: string; new_password: string }) =>
  axiosInstance.put('seller/change-password', data);
const getProfile = () => axiosInstance.get('seller');
export const user = {
  changePassword,
  getProfile,
};
