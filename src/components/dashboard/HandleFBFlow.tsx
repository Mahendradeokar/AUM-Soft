'use client';

import { toast } from '@/components/ui/use-toast';
import { marketplace } from '@/requests';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function FbFlow() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    let state: any = searchParams.get('state');
    if (state && code) {
      try {
        state = JSON.parse(state);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return;
      }
      (async () => {
        const { isSuccess, statusMessage } = await marketplace.addMarketplace({ ...state, code });
        // TODO - Sometime this will get call twice. So watch out.
        if (!isSuccess) {
          toast({
            description: statusMessage ?? 'Could not add the marketplace please try again!',
            title: 'Marketplace Not Added!',
            variant: 'destructive',
          });
          return;
        }
        toast({
          description: 'Flipkart account is created!',
          title: 'Marketplace Added!',
          variant: 'success',
        });
        // window.location.href = window.location.pathname;
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
