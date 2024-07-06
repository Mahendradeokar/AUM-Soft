'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { returns } from '@/requests';
import { Button } from '../ui/button';
import CompleteOrderTable from './CompleteOrderTable';
import PendingOrderTable from './PendingOrderTable';
import ShowCounts from './ShowCount';
import { Order, ReturnType, ReturnTypeUnion } from './type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useBarcodeScanner } from './hooks';
import ScannerButton from './ScannerStatus';
import { Loader } from '../shared';

interface OrderManageProps {
  selectedReturnType: ReturnTypeUnion | undefined | null;
  setSelectedReturnType: (returnType: ReturnTypeUnion | null) => void;
  marketPlaceId: string | undefined;
}

type TabName = 'completeOrders' | 'pendingOrders' | 'scannedOrders';

// TODO:- Refactor this in create seperate component for count and button and table. And place them in root component.
export default function OrderManage({ selectedReturnType, setSelectedReturnType, marketPlaceId }: OrderManageProps) {
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const [scannedOrder, setScannedOrder] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<TabName>('completeOrders');
  const [orderCount, setOrderCont] = useState({ pendingOrders: 0, completeOrders: 0 });
  const [isLoading, setLoading] = useState(true);

  const handleOnScan = useCallback(
    async (barcode: string) => {
      const { isSuccess, data } = await returns.sendScanOrder({ orderId: barcode, returnType: selectedReturnType });
      if (isSuccess) {
        setScannedOrder((prev) => {
          return [...prev, data];
        });
        setOrderCont((prev) => {
          return {
            pendingOrders: prev.pendingOrders - 1,
            completeOrders: prev.completeOrders + 1,
          };
        });
      }
    },
    [selectedReturnType],
  );

  useEffect(() => {
    if (marketPlaceId) {
      (async () => {
        setLoading(true);
        const { isSuccess: pendingSuccess, data: pendingData } = await returns.getReturnOrders({
          accountId: marketPlaceId,
          orderType: 'PENDING',
        });
        const counts = { pendingOrders: 0, completeOrders: 0 };
        if (pendingSuccess) {
          counts.pendingOrders = pendingData.length;
        }

        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketPlaceId,
          orderType: 'COMPLETED',
        });
        if (isSuccess) {
          counts.completeOrders = data.length;
        }
        setOrderCont(counts);
        setLoading(false);
        return null;
      })();
    }
  }, [marketPlaceId]);

  const showScanner = true; // Don't need to show the order type.

  const { isScanning, startScan, isInit } = useBarcodeScanner(barcodeInputRef, handleOnScan);
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
      <input ref={barcodeInputRef} className="absolute left-[-99999999999px]" />
      {isLoading ? (
        <Loader className="h-10" />
      ) : (
        <ShowCounts currentCount={orderCount.completeOrders} totalCount={orderCount.pendingOrders} />
      )}
      <p className="text-foreground text-center">Please Select the Return type</p>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4 justify-center flex-1">
          {showScanner ? (
            <>
              {/* <Button size="lg" variant="ghost" className="grow-1 max-w-lg" onClick={() => setSelectedReturnType(null)}>
                Back
              </Button> */}
              <ScannerButton
                startScan={() => {
                  startScan();
                  setActiveTab('scannedOrders');
                }}
                isInit={isInit}
                isScanning={isScanning}
              />
            </>
          ) : (
            <>
              <Button size="lg" className="grow-1 w-auto" onClick={() => setSelectedReturnType(ReturnType.CURRIER)}>
                Currier Return
              </Button>
              <Button size="lg" className="grow-1 w-auto" onClick={() => setSelectedReturnType(ReturnType.CUSTOMER)}>
                Customer Return
              </Button>
            </>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight">Orders&apos; List!</h2>
        <p className="text-muted-foreground">Here are the orders.</p>
      </div>
      <Tabs
        defaultValue="completeOrders"
        className="w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabName)}
      >
        <TabsList>
          <TabsTrigger value="completeOrders">Complete Orders</TabsTrigger>
          <TabsTrigger value="pendingOrders">Pending Orders</TabsTrigger>
          <TabsTrigger value="scannedOrders" disabled={!isInit && !isScanning}>
            Scanned Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="completeOrders">
          <CompleteOrderTable marketplaceId={marketPlaceId} />
        </TabsContent>
        <TabsContent value="pendingOrders">
          <PendingOrderTable marketplaceId={marketPlaceId} />
        </TabsContent>
        <TabsContent value="scannedOrders">
          <PendingOrderTable marketplaceId={marketPlaceId} scannedOrder={scannedOrder} isScannedOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
