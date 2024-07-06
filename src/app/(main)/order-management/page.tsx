'use client';

import AddMarketPlaceBtn from '@/components/dashboard/AddMarketPlaceBtn';
import UploadOrdersBtn from '@/components/dashboard/UploadOrdersBtn';
import UploadReturnsBtn from '@/components/dashboard/UploadReturnBtn';
import { OrderManage } from '@/components/orderManagement';
import { ScanForm } from '@/components/orderManagement/ScanForm';
import { ReturnTypeUnion } from '@/components/orderManagement/type';
import { Modal } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

interface ScanFormState {
  marketplaceName: string;
  returnType: ReturnTypeUnion | null;
}

export default function OrderManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ScanFormState>>({});

  const scanEleRef = useRef(null);

  // const handleSymbol: HandleSymbolArg = (symbol, matchedSymbologies) => {
  //   alert('done');
  //   alert(`Scanned ${symbol}, ${matchedSymbologies}`);
  // };

  // useSymbologyScanner(handleSymbol, {
  //   target: scanEleRef,
  //   scannerOptions: {
  //     maxDelay: 200,
  //   },
  // });

  const handleMarketplaceSelect = (state: { marketplaceName: string }) => {
    setFormData(state);
    setIsModalOpen(false);
  };

  useEffect(() => {
    let ignore = false;
    if (!formData.marketplaceName && !ignore) {
      setIsModalOpen(true);
    }

    return () => {
      ignore = true;
    };
  }, [formData]);

  return (
    <>
      <div className="flex justify-between h-16 items-center">
        <h2 className="text-3xl font-bold tracking-normal">Return Orders Type</h2>
        {/* <ScannerStatus isScanning={isScannerConnected} /> */}
        <div className="flex gap-3">
          <UploadOrdersBtn />
          <UploadReturnsBtn />
          <AddMarketPlaceBtn />
          {/* <MarketPlaceSwitcher /> */}
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Change Marketplace
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="overflow-auto w-[100%]" ref={scanEleRef}>
          <OrderManage
            selectedReturnType={formData.returnType}
            setSelectedReturnType={(returnType) => setFormData({ ...formData, returnType })}
            marketPlaceId={formData.marketplaceName}
          />
        </div>
      </div>
      <Modal
        open={isModalOpen}
        setOpen={(v: boolean) => {
          if (formData.marketplaceName) {
            setIsModalOpen(v);
          }
        }}
        title="Scan Options"
        description="Please select the appropriate options from below."
      >
        <ScanForm openMp={() => {}} setFormData={handleMarketplaceSelect} />
      </Modal>
    </>
  );
}
