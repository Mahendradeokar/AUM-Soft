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
import { useRouter } from 'next/navigation';
import AddMarketPlace from './AddMarketPlace';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface MarketPlaceSwitcherProps extends PopoverTriggerProps {}

const extractMPData = (data: any) => {
  const mpData = [
    { label: 'All', value: 'All' },
    ...data.map((mp: any) => {
      return {
        label: mp.account_name,
        value: mp.platform_id,
      };
    }),
  ];

  return mpData;
};

export default function MarketPlaceSwitcher({ className }: MarketPlaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = React.useState<{ label: string; value: string }>({
    label: 'All',
    value: 'All',
  });
  const [marketPlaceData, setMarketPlaceData] = React.useState([
    {
      label: 'Marketplaces',
      marketplaces: [
        {
          label: 'All',
          value: 'All',
        },
      ],
    },
  ]);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { data, isSuccess } = await marketplace.getMarketplace();
      if (isSuccess) {
        if (!data.length) {
          setModalOpen(true);
          return;
        }
        setMarketPlaceData((pre: any) => {
          const updated = [{ ...pre }];
          updated[0].marketplaces = extractMPData(data);
          return updated;
        });
      }
    })();
  }, []);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a account"
            className={cn('w-[250px] justify-between', className)}
          >
            <span title={selectedAccount.label} className="whitespace-pre text-ellipsis overflow-hidden ">
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
                  {group.marketplaces.map((marketplace) => (
                    <CommandItem
                      // disabled={marketplace.disable}
                      key={marketplace.value}
                      onSelect={() => {
                        setSelectedAccount(marketplace);
                        setOpen(false);
                        router.push(`/?mp=${marketplace.value}`);
                      }}
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
                <Button variant="link" asChild className="w-full" onSelect={() => setModalOpen(true)}>
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
      <AddMarketPlace open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
