import { Metadata } from 'next';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'AUM',
  description: 'AUM',
};

interface IDashboardLayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
  return (
    <div className="bg-background">
      <div className="flex flex-col lg:flex-row h-screen box-border">
        <Sidebar className="sticky h-screen hidden lg:block" />
        <ScrollArea className="px-4 grow-[1] lg:px-8 box-border table-overflow-fix">
          <div className="h-full py-6">
            <div className="flex-col md:flex">{children}</div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
