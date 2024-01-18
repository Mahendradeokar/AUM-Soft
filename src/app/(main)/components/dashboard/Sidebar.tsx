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
      <div className="group/sidebar space-y-4 flex flex-col py-6 px-3 hover:lg:px-8 h-[100%] transition-all duration-700 ease-in-out transform">
        {/* <div className=""> */}
        <Button
          asChild
          variant="link"
          className="text-center h-16 flex items-center text-lg font-semibold justify-start tracking-tight "
        >
          <Link href="/" className="flex gap">
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
            <span className="hidden group-hover/sidebar:inline-block">AUM</span>
          </Link>
        </Button>
        <div className="flex flex-col flex-1 justify-center">
          <div className="space-y-1 flex-1">
            {links.map(({ label, Icon, link }) => (
              <Button
                key={label}
                asChild
                variant="ghost"
                className="min-w-min group-hover/sidebar:w-full flex justify-start"
              >
                <Link href={link} className="flex gap justify-center group-hover/sidebar:justify-normal">
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="hidden group-hover/sidebar:inline-block">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
          <div className="flex gap-4 flex-col justify-center items-center group-hover/sidebar:flex-row">
            <Logout className="grow-[1]">
              <span className="hidden group-hover/sidebar:inline-block">Logout</span>
            </Logout>
            <ThemeToggle className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
