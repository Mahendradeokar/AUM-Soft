import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/Theme';
import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { KeyRoundIcon, Lock } from 'lucide-react';
import Link from 'next/link';
import Logout from './logout';

const links = [
  {
    label: 'Dashboard',
    Icon: DashboardIcon,
    link: '/',
  },
  {
    label: 'Profile',
    Icon: PersonIcon,
    link: '/profile',
  },
  {
    label: 'Change Password',
    Icon: Lock,
    link: '/change-password',
  },
  {
    label: 'Marketplace settings',
    Icon: KeyRoundIcon,
    link: '/mpsetting',
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('bg-zing-900', className)}>
      <div className="space-y-4 flex flex-col py-6 lg:px-8 h-[100%]">
        {/* <div className=""> */}
        <div className="text-center h-16 flex items-center px-4 text-lg font-semibold tracking-tight">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
          <span>AUM</span>
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <div className="space-y-1 flex-1">
            {links.map(({ label, Icon, link }) => (
              <Button key={label} asChild variant="ghost" className="w-full justify-start">
                <Link href={link} className="flex gap">
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ))}
          </div>
          <div className="flex gap-4">
            <Logout />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
