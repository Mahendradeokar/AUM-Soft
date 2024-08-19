'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { general, returns } from '@/requests';
import ShowCounts from './ShowCount';
import { Order } from '../types';
import { useBarcodeScanner } from './hooks';
import { Loader } from '../shared';
import ScannerButton from './ScannerStatus';
import ScanOrderTable from './ScanTable';
import ScanInput from '../shared/ScanInput';
// import { ScanForm } from './ScanForm';

// interface OrderManageProps {
//   // selectedReturnType: ReturnTypeUnion | undefined | null;
//   // formData.marketplaceName: string | null;
// }

// function ScanFormModal({
//   isOpen,
//   setOpen,
//   onDataChange,
// }: {
//   isOpen: boolean;
//   setOpen: (a: any) => void;
//   onDataChange: (a: any) => void;
// }) {
//   return (
//     <Modal open={isOpen} setOpen={setOpen} title="Scan Options" description="Select the account here.">
//       <ScanForm
//         setFormData={(value) => {
//           onDataChange(value);
//           setOpen(false);
//         }}
//       />
//     </Modal>
//   );
// }

// TODO:- Refactor this in create seperate component for count and button and table. And place them in root component.
export default function ScanReturns() {
  const [scannedOrder, setScannedOrder] = useState<Order[]>([]);
  const [orderCount, setOrderCont] = useState({ totalReturnOrders: 0, totalOrders: 0 });
  const [isLoading, setLoading] = useState(true);
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [formData, setFormData] = useState<{ marketplaceId: string | null }>({ marketplaceId: null });

  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const addOrderInReverse = useCallback(
    (order: Order) => {
      const data = structuredClone(scannedOrder);
      data.unshift(order);
      setScannedOrder(data);
    },
    [scannedOrder],
  );

  const handleOnScan = useCallback(
    async (barcode: string) => {
      // if (!formData?.marketplaceId) {
      //   toast({
      //     title: 'Please click on start scanning and select the page.',
      //     variant: 'destructive',
      //   });
      //   return;
      // }
      const { isSuccess, data } = await returns.sendScanOrder({ orderId: barcode });
      if (isSuccess) {
        addOrderInReverse(data);
        setOrderCont((prev) => {
          return {
            totalReturnOrders: prev.totalReturnOrders + 1,
            totalOrders: prev.totalOrders - 1,
          };
        });
      }
    },
    [addOrderInReverse],
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { isSuccess, data } = await general.getOrderCounts({ accountId: 'all' });
      const [countData] = data;
      const { totalOrder, totalReturn } = countData ?? {};
      const counts = { totalReturnOrders: totalReturn ?? 0, totalOrders: totalOrder ?? 0 };
      if (isSuccess) {
        setOrderCont(counts);
      }

      setLoading(false);
      return null;
    })();
  }, []);

  const { isScanning, startScan, isInit } = useBarcodeScanner(barcodeInputRef, handleOnScan);

  // const onFormDataUpdate = (value: { [key: string]: string }) => {
  //   if (value.marketplaceId) {
  //     // setFormData(value as any);
  //     startScan();
  //   }
  // };

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
      {isLoading ? (
        // count
        <Loader className="h-10" />
      ) : (
        <ShowCounts currentCount={orderCount.totalReturnOrders} totalCount={orderCount.totalOrders} />
      )}

      <ScanInput ref={barcodeInputRef} placeholder="Scan or enter AWB Id..." />

      <ScannerButton className="m-auto" isInit={isInit} isScanning={isScanning} startScan={startScan} />

      {/* <p className="text-foreground text-center">Please Select the Return type</p> */}
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4 justify-center flex-1" />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight">Orders&apos; List!</h2>
        <p className="text-muted-foreground">Here are the orders.</p>
      </div>

      <ScanOrderTable data={scannedOrder} />
      {/* <ScanFormModal isOpen={isModalOpen} setOpen={setModalOpen} onDataChange={onFormDataUpdate} /> */}
    </div>
  );
}
