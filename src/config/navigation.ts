import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { KeyRoundIcon, Lock } from 'lucide-react';

export const navigationLinks = {
  dashboard: {
    label: 'Dashboard',
    Icon: DashboardIcon,
    link: '/',
  },
  profile: {
    label: 'Profile',
    Icon: PersonIcon,
    link: '/profile',
  },
  changePassword: {
    label: 'Change Password',
    Icon: Lock,
    link: '/change-password',
  },
  marketplaceSettings: {
    label: 'Marketplace Settings',
    Icon: KeyRoundIcon,
    link: '/mpsetting',
  },
};
