'use client';

import { useState } from 'react';
import { UploadIcon } from '@radix-ui/react-icons';
import { UploadModal } from '../Upload';
import { Button } from '../ui/button';

export default function UploadReturnBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="cursor-pointer">
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Return
      </Button>
      {open && <UploadModal open={open} name="return" setOpen={setOpen} />}
    </>
  );
}
