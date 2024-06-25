'use client';

import { useCallback, useRef, useState } from 'react';
import { returns } from '@/requests';
import { Button } from '../ui/button';
import CompleteOrderTable from './CompleteOrderTable';
import PendingOrderTable from './PendingOrderTable';
import ShowCounts from './ShowCount';
import { Order, ReturnType, ReturnTypeUnion } from './type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useBarcodeScanner } from './hooks';
import ScannerButton from './ScannerStatus';

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
  const handleOnScan = useCallback(
    async (barcode: string) => {
      const { isSuccess, data } = await returns.sendScanOrder({ orderId: barcode, returnType: selectedReturnType });
      if (isSuccess) {
        setScannedOrder((prev) => {
          return [...prev, data];
        });
      }
    },
    [selectedReturnType],
  );
  const { isScanning, startScan, isInit } = useBarcodeScanner(barcodeInputRef, handleOnScan);
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
      <input ref={barcodeInputRef} className="absolute left-[-99999999999px]" />
      <ShowCounts />
      <p className="text-foreground text-center">Please Select the Return type</p>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4 justify-center flex-1">
          {selectedReturnType ? (
            <>
              <Button size="lg" variant="ghost" className="grow-1 max-w-lg" onClick={() => setSelectedReturnType(null)}>
                Back
              </Button>
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
