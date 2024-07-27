'use client';

import * as React from 'react';
// import { CalendarIcon } from "@radix-ui/react-icons"

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  date: Date;
  onSelect: any;
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs';
}

export default function CalendarDateRangePicker({
  className,
  date,
  onSelect,
  size = 'default',
}: CalendarDateRangePickerProps) {
  let dateFormat = null;
  if (date) {
    dateFormat = format(date, 'LLL dd, y');
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={size}
            id="date"
            variant="outline"
            className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFormat || <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar initialFocus mode="single" selected={date} onSelect={onSelect} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
