import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { KeyRoundIcon, Lock, ScanLineIcon } from 'lucide-react';

export const navigationLinks = {
  dashboard: {
    label: 'Dashboard',
    Icon: DashboardIcon,
    link: '/order-management',
  },
  scanOrder: {
    label: 'Scan Returns',
    Icon: ScanLineIcon,
    link: '/scan-returns',
  },
  settings: {
    label: 'Settings',
    Icon: KeyRoundIcon,
    link: '/settings',
  },
  changePassword: {
    label: 'Change Password',
    Icon: Lock,
    link: '/change-password',
  },
  profile: {
    label: 'Profile',
    Icon: PersonIcon,
    link: '/profile',
  },
};
