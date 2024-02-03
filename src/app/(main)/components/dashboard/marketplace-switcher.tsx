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
import Link from 'next/link';
import { navigationLinks } from '@/config';

const groups = [
  {
    label: 'Marketplaces',
    marketplaces: [
      {
        label: 'Flipkart',
        value: 'flpkrt',
        disable: false,
      },
      {
        label: 'Amazon - Coming Soon',
        value: 'amzn',
        disable: true,
      },
      {
        label: 'Meesho - Coming',
        value: 'meesho',
        disable: true,
      },
    ],
  },
];

type Team = (typeof groups)[number]['marketplaces'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface MarketPlaceSwitcherProps extends PopoverTriggerProps {}

export default function MarketPlaceSwitcher({ className }: MarketPlaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<Team>(groups[0].marketplaces[0]);

  return (
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
          <CaretSortIcon className="text-primary ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="min-w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search account..." />
            <CommandEmpty>No account found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.marketplaces.map((marketplace) => (
                  <CommandItem
                    // disabled={marketplace.disable}
                    key={marketplace.value}
                    onSelect={() => {
                      setSelectedAccount(marketplace);
                      setOpen(false);
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
              <Button variant="link" asChild className="w-full hover:none">
                <Link href={navigationLinks.marketplaceSettings.link} className="w-full">
                  <CommandItem>
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Add New
                  </CommandItem>
                </Link>
              </Button>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
