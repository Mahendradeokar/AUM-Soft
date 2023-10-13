import { Separator } from '@/components/ui/separator';
import { APIKeyForm, APIKeyTable } from '../components/APIkey';

export default function KeyConfig() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3 space-y-6 mx-1">
        <div>
          <h3 className="text-lg font-medium">MarketPlace Setting</h3>
          <p className="text-sm text-muted-foreground">You can mange your marketplace API key's and secret's</p>
        </div>
        <Separator />
        <APIKeyTable />
      </div>
    </div>
  );
}

// @TODO :- solved scroll issue
