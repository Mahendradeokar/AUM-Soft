'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { dashboard } from '@/requests';
import { Loader } from '@/components/shared';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { convertDateToUnix } from '@/common/common';
import { useSearchParams } from 'next/navigation';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

const getFilterVal = (filter: ColumnFiltersState, id: string): ColumnFilter | null => {
  return filter.find((item) => id === item.id) ?? null;
};

export function DataTable<IOrdersData, TValue>({ columns }: DataTableProps<IOrdersData, TValue>) {
  const [orders, setOrders] = React.useState<IOrdersData[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [totalOrders, setTotalOrder] = React.useState(0);
  const searchParam = useSearchParams();
  // const []
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: orders,
    columns,
    manualPagination: true,
    manualSorting: false,
    manualFiltering: true,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    pageCount: totalOrders,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
  });

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const skuId = getFilterVal(columnFilters, 'skuId')?.value as string;
      const orderItemId = getFilterVal(columnFilters, 'orderItemId')?.value as string;
      const { from = null, to = null }: { from?: Date | null; to?: Date | null } =
        getFilterVal(columnFilters, 'order_date')?.value ?? {};

      const startDate = convertDateToUnix(from);
      const endDate = convertDateToUnix(to);

      const { data, isSuccess } = await dashboard.getOrdersData({
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        sku_id: skuId,
        order_id: orderItemId,
        flipkart_status: getFilterVal(columnFilters, 'return_type')?.value as string,
        start_date: startDate,
        end_date: endDate,
        flipkart_by: searchParam.has('mp') ? searchParam.get('mp')! : 'All',
      });

      if (isSuccess) {
        setOrders(data.orderDetailList);
        const pageCount = Math.round(data.dataCount / pagination.pageSize);
        setTotalOrder(pageCount);
      }
      setLoading(false);
    })();
  }, [pagination.pageIndex, pagination.pageSize, table, columnFilters, searchParam]);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border relative">
        <ScrollArea>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center" />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="absolute top-[50%] left-[50%]">
          {isLoading ? <Loader className="h-auto" /> : table.getRowModel().rows?.length > 0 || <div>No results</div>}
        </div>
      </div>
      {!isLoading && <DataTablePagination table={table} />}
    </div>
  );
}
