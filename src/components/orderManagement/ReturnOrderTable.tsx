'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef, ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { DataTablePagination } from '../table/data-table-pagination';
import { DataTableFacetedFilter } from '../table/data-table-faceted-filter';
import { DataTableSearchBar } from '../table/data-table-searchbar';
import { NumberHighlighter } from '../shared';

type Props = {
  marketplaceId: string | null;
};

export const orderColumns: ColumnDef<Order>[] = [
  {
    header: 'Sr No.',
    accessorFn: (_, index) => index + 1,
  },
  {
    header: 'Suborder Number',
    accessorKey: 'sub_order_no',
    enableColumnFilter: true,
  },
  {
    header: 'Type of return',
    accessorKey: 'order_status',
  },
  {
    header: 'SKU Name',
    accessorKey: 'sku',
  },
  {
    header: 'Price',
    accessorKey: 'order_price',
    cell: ({ row }) => <NumberHighlighter number={row.original.order_price} content={row.original.order_price} />,
  },
  // {
  //   header: 'Price',
  //   accessorKey: 'order_price',
  // },
];

function ReturnOrderTable({ marketplaceId }: Props) {
  // Use the useTable hook to create table instance
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = useCustomTable({
    data: orders,
    columns: orderColumns,
    columnFilters: { state: columnFilters, onChange: setColumnFilters },
    pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
  });

  useEffect(() => {
    if (marketplaceId) {
      setLoading(true);
      (async () => {
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'return',
        });
        if (isSuccess) {
          setOrders(data);
        }

        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [marketplaceId]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start gap-1 mt-2">
        <DataTableSearchBar column={table.getColumn('sub_order_no')} placeholder="Search by suborder number" />
        <DataTableFacetedFilter
          column={table.getColumn('order_status')}
          placeholder="Return type"
          options={[
            { label: 'Customer Return', value: 'CustomerReturn' },
            { label: 'Currier Return', value: 'currierReturn' },
          ]}
        />
      </div>
      <HeadlessTable tableInstance={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}

export default ReturnOrderTable;
