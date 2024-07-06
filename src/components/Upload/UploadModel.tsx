'use client';

import { Modal } from '@/components/shared';
import { useState } from 'react';
import { UploadOrders, UploadReturns } from './Upload';
import APIKeyForm from '../marketplace/MpForm';
import type { ModalType } from '../types';

interface IUploadModal {
  open: boolean;
  setOpen: (prev: any) => void;
  name: ModalType;
}

const content: Record<ModalType, Record<string, string>> = {
  marketplace: {
    heading: 'Add Marketplace',
    description: 'add new marketplace here!',
  },
  order: {
    heading: 'Upload Orders',
    description: 'Upload your Orders here!',
  },
  returns: {
    heading: 'Upload Returns',
    description: 'Upload return orders here!',
  },
};

const renderModal = (name: ModalType, restProps: any) => {
  switch (name.toUpperCase() as Uppercase<ModalType>) {
    case 'ORDER':
      return <UploadOrders {...restProps} />;
    case 'RETURNS':
      return <UploadReturns {...restProps} />;
    case 'MARKETPLACE':
      return null;
    default:
      throw new Error('Name not matched');
  }
};

export default function UploadModal({ open, setOpen, name = 'marketplace' }: IUploadModal) {
  const [isAddMpOpen, setAddMpOpen] = useState(false);
  const { heading, description } = content[name];
  return (
    <Modal open={open} setOpen={setOpen} title={heading} description={description}>
      {isAddMpOpen || name === 'marketplace' ? (
        <APIKeyForm
          close={() => {
            setAddMpOpen(false);
          }}
        />
      ) : (
        renderModal(name, {
          openMp: () => setAddMpOpen(true),
          closeModal: () => setOpen(false),
        })
      )}
    </Modal>
  );
}
