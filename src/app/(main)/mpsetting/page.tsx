import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { APIKeyTable } from '../components/APIkey';

export const metadata: Metadata = {
  title: 'Market place setting',
  description: 'Market place setting',
};

export default function KeyConfig() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3 space-y-6 mx-1">
        <div>
          <h3 className="text-lg font-medium mb-2">Marketplace Setting</h3>
          <p className="text-sm text-muted-foreground">You can mange your marketplace API keys and secrets</p>
        </div>
        <Separator />
        <APIKeyTable />
      </div>
    </div>
  );
}

// @TODO :- solved scroll issue
