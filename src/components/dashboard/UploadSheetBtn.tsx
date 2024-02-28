'use client';

import { useState } from 'react';
import { UploadIcon } from '@radix-ui/react-icons';
import { UploadModal } from '../Sheets';
import { Button } from '../ui/button';

export default function UploadSheetBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="cursor-pointer">
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Sheet
      </Button>
      {open && <UploadModal open={open} setOpen={setOpen} />}
    </>
  );
}
