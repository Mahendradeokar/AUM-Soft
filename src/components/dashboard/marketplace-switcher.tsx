'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { CheckIcon } from 'lucide-react';
import { CaretSortIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { marketplace } from '@/requests';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AddMarketPlace from './AddMarketPlace';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface MarketPlaceSwitcherProps extends PopoverTriggerProps {
  onSelectChange?: (value: string | null) => void;
}

type Account = { label: string | null; value: string | null };
interface MarketplaceAccount {
  account_name: string;
  platform_id: string;
}

const extractMPData = (data: MarketplaceAccount[]) => {
  const mpData = [
    ...data.map((mp) => {
      return {
        label: mp.account_name,
        value: mp.platform_id,
      };
    }),
  ];

  return mpData;
};

export default function MarketPlaceSwitcher({ className, onSelectChange }: MarketPlaceSwitcherProps) {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  const [marketPlaceData, setMarketPlaceData] = React.useState<{ label: string; accounts: Account[] }[]>([
    {
      label: 'Marketplaces',
      accounts: [],
    },
  ]);

  const [selectedAccount, setSelectedAccount] = React.useState<Account>({
    label: 'All',
    value: 'all',
  });

  const [isMarketplaceOpen, setMarketplaceOpen] = React.useState(false);

  const onSelect = (account: Account) => {
    setSelectedAccount(account);
    setPopoverOpen(false);
    if (onSelectChange) {
      onSelectChange(account.value);
    }
    const searchParam = new URLSearchParams();
    searchParam.set('mp', account.value ?? 'all');
    const currentUrl = `${pathname}?${searchParam.toString()}`;
    router.push(currentUrl);
  };

  React.useEffect(() => {
    if (onSelectChange) {
      onSelectChange(selectedAccount.value);
      const searchParam = new URLSearchParams();
      searchParam.set('mp', selectedAccount.value ?? 'all');
      const currentUrl = `${pathname}?${searchParam.toString()}`;
      router.push(currentUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelectChange]);

  React.useEffect(() => {
    (async () => {
      const { isSuccess, data } = await marketplace.getMarketplace();
      if (!isSuccess) {
        return;
      }
      if (!data?.length) {
        // Open marketplace modal
        setMarketplaceOpen(true);
        return;
      }

      const accounts = extractMPData(data);
      setMarketPlaceData((prev) => {
        const updated = [...prev];
        updated[0].accounts = [...accounts];
        return updated;
      });
    })();
  }, [onSelectChange]);
  // TODO - Can combine this two use effect into one.
  React.useEffect(() => {
    if (isPopoverOpen) {
      (async () => {
        const { isSuccess, data } = await marketplace.getMarketplace();
        if (!isSuccess) {
          return;
        }
        const accounts = extractMPData(data);
        setMarketPlaceData((pre: any) => {
          const updated = [{ ...pre }];
          updated[0].accounts = accounts;
          return updated;
        });
      })();
    }
  }, [isPopoverOpen]);

  React.useEffect(() => {
    if (searchParam.has('mp')) {
      const querySelectedMp = searchParam.get('mp');
      if (querySelectedMp !== selectedAccount.value) {
        const searchParam = new URLSearchParams();
        searchParam.set('mp', selectedAccount.value ?? 'all');
        const currentUrl = `${pathname}?${searchParam.toString()}`;
        router.push(currentUrl);
      }
    }
  }, [searchParam, router, pathname, selectedAccount.value]);

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            aria-label="Select a account"
            className={cn('w-[250px] justify-between', className)}
          >
            <span title={selectedAccount.label ?? ''} className="whitespace-pre text-ellipsis overflow-hidden ">
              {selectedAccount.label}
            </span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="min-w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search account..." />
              <CommandEmpty>No account found.</CommandEmpty>
              {marketPlaceData.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  <CommandItem
                    // disabled={marketplace.disable}
                    key="ALL"
                    onSelect={() => onSelect({ label: 'All', value: 'all' })}
                    className="text-sm"
                  >
                    All
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4 text-primary',
                        selectedAccount.value === 'all' ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                  {group.accounts.map((marketplace) => (
                    <CommandItem
                      // disabled={marketplace.disable}
                      key={marketplace.value}
                      onSelect={() => onSelect(marketplace)}
                      className="text-sm"
                    >
                      {marketplace.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4 text-primary',
                          selectedAccount.value === marketplace.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <Button variant="link" asChild className="w-full" onSelect={() => setMarketplaceOpen(true)}>
                  <CommandItem>
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Add New
                  </CommandItem>
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <AddMarketPlace open={isMarketplaceOpen} setOpen={setMarketplaceOpen} />
    </>
  );
}
