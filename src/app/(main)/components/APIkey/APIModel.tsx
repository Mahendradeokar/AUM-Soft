import { Modal } from '@/components/common';
import APIKeyForm, { Mode } from './APIKeyForm';

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
    title: 'Add API Credentials',
    description: 'Enter new API key and secret.',
  },
  edit: {
    title: 'Edit API Credentials',
    description: 'Update API key and secret',
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
      <APIKeyForm mode={mode} apiKey={apiKey} secret={secret} marketPlace={marketPlace} />
    </Modal>
  );
}
