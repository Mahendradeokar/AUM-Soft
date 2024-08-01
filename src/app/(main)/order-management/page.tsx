'use client';

import { MarketPlaceSwitcher, Statistics } from '@/components/dashboard';
import UploadOrdersBtn from '@/components/dashboard/UploadOrdersBtn';
import UploadPaymentBtn from '@/components/dashboard/UploadReturnBtn';
import { DashboardTable } from '@/components/orderManagement';
import { useState } from 'react';

export default function OrderManagement() {
  const [marketplaceId, setMarketplaceId] = useState<string | null>('all');
  return (
    <>
      <div className="flex justify-between h-16 items-center">
        <h2 className="text-3xl font-bold tracking-normal">Dashboard</h2>
        {/* <ScannerStatus isScanning={isScannerConnected} /> */}
        <div className="flex gap-3">
          <UploadOrdersBtn />
          <UploadPaymentBtn />
          <MarketPlaceSwitcher onSelectChange={setMarketplaceId} />
        </div>
      </div>
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Statistics />
        </div>
        <div className="overflow-auto w-[100%]">
          <DashboardTable marketplaceId={marketplaceId} />
        </div>
      </div>
    </>
  );
}
