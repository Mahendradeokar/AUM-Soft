import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { APIKeyTable } from '@/components/marketplace';

export const metadata: Metadata = {
  title: 'Market place setting',
  description: 'Market place setting',
};

export default function KeyConfig() {
  return (
    <div className="space-y-6 mx-1">
      <div>
        <h3 className="text-lg font-medium mb-2 capitalize">Marketplace Setting</h3>
        <p className="text-sm text-muted-foreground capitalize">You can mange your marketplaces here!</p>
      </div>
      <Separator />
      <APIKeyTable />
    </div>
  );
}
