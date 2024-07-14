import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { KeyRoundIcon, Lock, ScanLineIcon } from 'lucide-react';

export const navigationLinks = {
  dashboard: {
    label: 'Dashboard',
    Icon: DashboardIcon,
    link: '/order-management',
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
  scanOrder: {
    label: 'Scan Returns',
    Icon: ScanLineIcon,
    link: '/scan-returns',
  },
};
