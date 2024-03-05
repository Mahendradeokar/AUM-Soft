'use client';

import { Modal } from '@/components/shared';
import { useState } from 'react';
import UploadSheet from './Upload';
import APIKeyForm from '../marketplace/MpForm';

interface IUploadModal {
  open: boolean;
  setOpen: (prev: any) => void;
}

const content = {
  marketplace: {
    heading: 'Add Marketplace',
    description: 'add new marketplace here!',
  },
  sheetUpload: {
    heading: 'Upload Sheet',
    description: 'Upload your payment sheet here!',
  },
};

export default function UploadModal({ open, setOpen }: IUploadModal) {
  const [isAddMpOpen, setAddMpOpen] = useState(false);
  const { heading, description } = content[isAddMpOpen ? 'marketplace' : 'sheetUpload'];
  return (
    <Modal open={open} setOpen={setOpen} title={heading} description={description}>
      {isAddMpOpen ? (
        <APIKeyForm
          close={() => {
            setAddMpOpen(false);
          }}
        />
      ) : (
        <UploadSheet openMp={() => setAddMpOpen(true)} closeModal={() => setOpen(false)} />
      )}
    </Modal>
  );
}
