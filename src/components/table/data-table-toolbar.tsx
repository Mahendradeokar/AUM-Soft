'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { FLIPKART_STATUS } from '@/common/constants';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { CalendarDateRangePicker } from '../shared';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const dateColumn = table.getColumn('order_date');

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <CalendarDateRangePicker
          className="min-w-[15rem]"
          size="sm"
          date={dateColumn?.getFilterValue() as Date}
          onSelect={dateColumn?.setFilterValue}
        />

        {table.getColumn('return_type') && (
          <DataTableFacetedFilter
            column={table.getColumn('return_type')}
            placeholder="Status"
            options={Object.values(FLIPKART_STATUS)}
          />
        )}

        {/* {table.getColumn('priority') && (
          <DataTableFacetedFilter column={table.getColumn('priority')} title="Priority" options={priorities} />
        )} */}
        {isFiltered && (
          <Button variant="destructive" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
