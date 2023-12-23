import { login, logout, signUp } from './auth';
import { addMarketplace, getMarketplace } from './marketplace';
import { changePassword, getProfile } from './profile';

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
