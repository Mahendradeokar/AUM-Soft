'use client';

import { useState } from 'react';
import { StoreIcon } from 'lucide-react';
import { UploadModal } from '../Upload';
import { Button } from '../ui/button';

export default function AddMarketPlaceBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="cursor-pointer">
        <StoreIcon className="mr-2 h-4 w-4" />
        Add Marketplace
      </Button>
      {open && <UploadModal open={open} name="marketplace" setOpen={setOpen} />}
    </>
  );
}
