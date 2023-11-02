'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import APIKeyForm from '../APIkey/APIKeyForm';

function getInitials(label: string) {
  let lb = label.toUpperCase();
  let initials = 'ES';
  const arrayOfLabel = lb.split(' ');
  if (arrayOfLabel.length >= 2) {
    initials = `${arrayOfLabel[0][0] ?? 'E'}${arrayOfLabel[1][0] ?? 'S'}`;
  } else {
    const secondInitialIndex = lb.length / 2;
    initials = `${lb[0]}${lb[secondInitialIndex]}`;
  }

  return initials;
}

const groups = [
  {
    label: 'Marketplaces',
    teams: [
      {
        label: 'Flipkart',
        value: 'flpkrt',
      },
      {
        label: 'Amazon - Coming Soon',
        value: 'amzn',
      },
      {
        label: 'Meesho - Coming Soon',
        value: 'meesho',
      },
    ],
  },
];

type Team = (typeof groups)[number]['teams'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface MarketPlaceSwitcherProps extends PopoverTriggerProps {}

export default function MarketPlaceSwitcher({ className }: MarketPlaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(groups[0].teams[0]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn('w-[200px] justify-between', className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={`https://avatar.vercel.sh/${selectedTeam.value}.png`} alt={selectedTeam.label} />
              <AvatarFallback>{getInitials(selectedTeam.label)}</AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                          className="grayscale"
                        />
                        <AvatarFallback>{getInitials(team.label)}</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedTeam.value === team.value ? 'opacity-100' : 'opacity-0',
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
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Add New
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Marketplace</DialogTitle>
          <DialogDescription>Add a new Marketplace Account.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <APIKeyForm />
          </div>
        </div>
        {/* <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
