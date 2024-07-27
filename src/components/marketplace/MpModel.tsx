import { Modal } from '@/components/shared';
import APIKeyForm, { Mode } from './MpForm';

interface IAPIModel {
  mode?: Mode;
  apiKey?: string;
  secret?: string;
  open: boolean;
  marketPlace?: string | null;
  setOpen: (isOpen: boolean) => void;
}

const texts = {
  add: {
    title: 'Add Marketplace account!',
    description: 'Enter new Marketplace details.',
  },
  edit: {
    title: 'Edit Marketplace account!',
    description: 'Update Marketplace details',
  },
};

export default function APIModel({
  mode = 'create',
  apiKey = '',
  secret = '',
  open,
  setOpen,
  marketPlace = null,
}: IAPIModel) {
  const content = mode === 'edit' ? texts.edit : texts.add;
  return (
    <Modal open={open} setOpen={setOpen} title={content.title} description={content.description}>
      <APIKeyForm mode={mode} close={() => setOpen(false)} apiKey={apiKey} secret={secret} marketPlace={marketPlace} />
    </Modal>
  );
}
