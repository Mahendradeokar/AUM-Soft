import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/Theme';
import Link from 'next/link';
import { navigationLinks } from '@/config';
import Logout from './logout';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('bg-zing-900', className)}>
      <div
        id="sidebar"
        className="group/sidebar space-y-4 flex flex-col py-6 px-2 h-[100%] hover:lg:px-3 transition-all duration-700 ease-in-out transform"
      >
        <Button
          asChild
          variant="link"
          className="text-center h-16 flex items-center text-lg font-semibold justify-start tracking-tight "
        >
          <Link href="/" className="flex gap-[0.3rem] justify-center group-hover/sidebar:justify-normal ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="hidden group-hover/sidebar:inline-block">AUM</span>
          </Link>
        </Button>
        <div className="flex flex-col flex-1">
          <div className="space-y-1 flex-1">
            {Object.values(navigationLinks).map(({ label, Icon, link }) => (
              <Button
                key={label}
                asChild
                variant="ghost"
                className="min-w-min group-hover/sidebar:w-full flex justify-start items-center group-hover/sidebar:justify-normal "
              >
                <Link href={link} className="flex gap-[0.3rem] justify-center">
                  <Icon className="h-4 w-4" />
                  <span className="hidden group-hover/sidebar:inline-block">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
          <div className="flex gap-4 flex-col justify-center items-center group-hover/sidebar:flex-row ">
            <Logout className="grow-[2]">
              <span className="hidden group-hover/sidebar:inline-block">Logout</span>
            </Logout>
            <ThemeToggle className="w-full group-hover/sidebar:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 *  TODO - Changes the transition make it more smooth in free time
 *  TODO - Issue related to toggle button, Hover is not affecting the toggle,
 */
