import { Metadata } from 'next';
import DataTable from '@/components/table';
import { MarketPlaceSwitcher, Statistics } from '@/components/dashboard';
import UploadOrdersBtn from '@/components/dashboard/UploadOrdersBtn';
import UploadReturnsBtn from '@/components/dashboard/UploadReturnBtn';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function Dashboard() {
  return (
    <>
      {/* <FbFlow /> */}
      <div className="flex justify-between h-16 items-center">
        <h2 className="text-3xl font-bold tracking-normal">Dashboard</h2>
        <div className="flex gap-3">
          <UploadOrdersBtn />
          <UploadReturnsBtn />
          <MarketPlaceSwitcher />
        </div>
      </div>
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Statistics />
        </div>
        <div className="overflow-auto w-[100%]">
          <DataTable />
        </div>
      </div>
    </>
  );
}
