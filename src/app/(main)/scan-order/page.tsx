import { ScanReturns } from '@/components/scanReturns';

export default function ScanOrderPage() {
  return (
    <>
      <div className="flex justify-between h-16 items-center">
        <h2 className="text-3xl font-bold tracking-normal">Scan Order</h2>
        {/* <ScannerStatus isScanning={isScannerConnected} /> */}
      </div>
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="overflow-auto w-[100%]">
          <ScanReturns />
        </div>
      </div>
    </>
  );
}
