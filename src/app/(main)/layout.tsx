import { Metadata } from 'next';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'Music App',
  description: 'Example music app using the components.',
};

interface IDashboardLayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
  return (
    <div className="bg-background">
      <div className="flex flex-col lg:flex-row h-screen box-border">
        <Sidebar className="sticky h-screen" />
        <ScrollArea className="px-4 grow-[1] lg:px-8 lg:border-l box-border table-overflow-fix">
          <div className="h-full py-6">
            <div className="flex-col md:flex">{children}</div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
