'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/Theme';
import Link from 'next/link';
import { navigationLinks } from '@/config';
import { useState } from 'react';
import Logout from './logout';

function ArrowRightWide() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z" />
    </svg>
  );
}

function ArrowLeftWide() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M8.36853 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.36853 12Z" />
    </svg>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className={cn('bg-zing-900 relative', className)}>
      <div
        id="sidebar"
        className="space-y-4 flex flex-col py-6 px-2 h-[100%] transition-all duration-700 ease-in-out transform border-r"
      >
        <Button
          asChild
          variant="link"
          className="text-center h-16 flex items-center text-lg font-semibold justify-start tracking-tight "
        >
          <Link href="/" className={cn('flex gap-[0.3rem]', isSidebarOpen ? 'justify-normal' : 'justify-center')}>
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
            <span className={cn('hidden', isSidebarOpen && 'inline-block')}>AUM</span>
          </Link>
        </Button>
        <div className="flex flex-col flex-1">
          <div className="space-y-1 flex-1">
            {Object.values(navigationLinks).map(({ label, Icon, link }) => (
              <Button
                key={label}
                asChild
                variant="ghost"
                className={cn('min-w-min flex justify-start items-center', isSidebarOpen && 'w-full justify-normal')}
              >
                <Link
                  href={link}
                  className={cn('flex gap-[0.3rem]', isSidebarOpen ? 'justify-start' : 'justify-center')}
                >
                  <Icon className="h-4 w-4" />
                  <span className={cn('hidden', isSidebarOpen && 'inline-block')}>{label}</span>
                </Link>
              </Button>
            ))}
          </div>
          <div className={cn('flex gap-4 flex-col justify-center items-center', isSidebarOpen && 'flex-row')}>
            <Logout className="grow-[2]">
              <span className={cn('hidden', isSidebarOpen && 'inline-block')}>Logout</span>
            </Logout>
            <ThemeToggle className="w-full group-hover/sidebar:w-auto" />
          </div>
        </div>
      </div>
      <Button
        className="flex items-center text-lg justify-center absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 right-0 rounded-full border bg-zing-100"
        variant="outline"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ArrowLeftWide /> : <ArrowRightWide />}
      </Button>
    </div>
  );
}

/**
 *  TODO - Changes the transition make it more smooth in free time
 *  TODO - Issue related to toggle button, Hover is not affecting the toggle,
 */
