import { APIModel } from '../marketplace';

export default function AddMarketPlace({ open, setOpen }: { open: boolean; setOpen: (prev: any) => void }) {
  // const [open, setOpen] = useState(true);

  return <APIModel open={open} setOpen={setOpen} />;
}
