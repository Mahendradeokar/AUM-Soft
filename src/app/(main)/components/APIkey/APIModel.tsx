import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import APIKeyForm, { Mode } from './APIKeyForm';

interface IAPIModel {
  mode?: Mode;
  apiKey?: string;
  secret?: string;
  open: boolean;
  marketPlace: string;
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

export default function APIModel({ mode = 'create', apiKey = '', secret = '', open, setOpen, marketPlace }: IAPIModel) {
  const content = mode === 'edit' ? texts.edit : texts.add;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>
        <APIKeyForm mode={mode} apiKey={apiKey} secret={secret} marketPlace={marketPlace} />
      </DialogContent>
    </Dialog>
  );
}
