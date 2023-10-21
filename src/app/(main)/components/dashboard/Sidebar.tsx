import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/Theme';
import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { KeyRoundIcon, Lock } from 'lucide-react';
import Link from 'next/link';

// import { Playlist } from "../data/playlists";
export const playlist = [
  'Recently Added',
  'Recently Played',
  'Top Songs',
  'Top Albums',
  'Top Artists',
  'Logic Discography',
  'Bedtime Beats',
  'Feeling Happy',
  'I miss Y2K Pop',
  'Runtober',
  'Mellow Days',
  'Eminem Essentials',
];

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
          <span>Ecom Soft</span>
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
            {/* <UserNav /> */}
            <Button variant="outline" className="w-full justify-start flex-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(-90)"
                className="mr-2 h-4 w-4"
              >
                <path
                  d="M3.5 5.00006C3.22386 5.00006 3 5.22392 3 5.50006L3 11.5001C3 11.7762 3.22386 12.0001 3.5 12.0001L11.5 12.0001C11.7761 12.0001 12 11.7762 12 11.5001L12 5.50006C12 5.22392 11.7761 5.00006 11.5 5.00006L10.25 5.00006C9.97386 5.00006 9.75 4.7762 9.75 4.50006C9.75 4.22392 9.97386 4.00006 10.25 4.00006L11.5 4.00006C12.3284 4.00006 13 4.67163 13 5.50006L13 11.5001C13 12.3285 12.3284 13.0001 11.5 13.0001L3.5 13.0001C2.67157 13.0001 2 12.3285 2 11.5001L2 5.50006C2 4.67163 2.67157 4.00006 3.5 4.00006L4.75 4.00006C5.02614 4.00006 5.25 4.22392 5.25 4.50006C5.25 4.7762 5.02614 5.00006 4.75 5.00006L3.5 5.00006ZM7 1.6364L5.5682 3.0682C5.39246 3.24393 5.10754 3.24393 4.9318 3.0682C4.75607 2.89246 4.75607 2.60754 4.9318 2.4318L7.1818 0.181802C7.26619 0.09741 7.38065 0.049999 7.5 0.049999C7.61935 0.049999 7.73381 0.09741 7.8182 0.181802L10.0682 2.4318C10.2439 2.60754 10.2439 2.89246 10.0682 3.0682C9.89246 3.24393 9.60754 3.24393 9.4318 3.0682L8 1.6364L8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5L7 1.6364Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              Log Out
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
