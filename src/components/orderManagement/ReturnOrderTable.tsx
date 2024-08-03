'use client';

import React, { useEffect, useState } from 'react';
// import { returns } from '@/requests';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { DataTableFacetedFilter } from '../table/data-table-faceted-filter';
// import { DataTableSearchBar } from '../table/data-table-searchbar';
import { NumberHighlighter } from '../shared';
// import type { OrderReturnTypeUnion } from '../../../types';
import { OrderReturnType } from '../../../types';

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
    cell: ({ row }) => {
      const status = row.original.order_status ?? '-:-';
      return <span>{status}</span>;
    },
  },
  {
    header: 'SKU Name',
    accessorKey: 'sku',
  },
  {
    header: 'Courier Partner',
    accessorKey: 'courier',
  },
  {
    header: 'Supplier Name',
    accessorKey: 'supplier_name',
  },
  {
    header: 'Price',
    accessorKey: 'order_price',
    cell: ({ row }) => {
      const price = Number(row.original.order_price);

      if (typeof price === null || price === undefined || Number.isNaN(price)) {
        return <span>-:-</span>;
      }
      return <NumberHighlighter number={price} content={price} />;
    },
  },
  // {
  //   header: 'Price',
  //   accessorKey: 'order_price',
  // },
];

function ReturnOrderTable({ marketplaceId }: Props) {
  // Use the useTable hook to create table instance
  const [orders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = useCustomTable({
    data: orders,
    columns: orderColumns,
    columnFilters: { state: columnFilters, onChange: setColumnFilters },
    // pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
  });

  useEffect(() => {
    if (marketplaceId) {
      // const [filterReturnType] = (table.getColumn('order_status')?.getFilterValue() as OrderReturnTypeUnion[]) ?? [];
      // setLoading(true);
      (async () => {
        // const { isSuccess, data } = await returns.getReturnOrders({
        //   accountId: marketplaceId,
        //   status: 'return',
        //   returnType: filterReturnType ?? undefined,
        // });
        // if (isSuccess) {
        //   setOrders(data);
        // }

        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [marketplaceId, columnFilters, table]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start gap-1 mt-2">
        {/* <DataTableSearchBar column={table.getColumn('sub_order_no')} placeholder="Search by suborder number" /> */}
        <DataTableFacetedFilter
          column={table.getColumn('order_status')}
          placeholder="Return type"
          options={[
            { label: 'Customer Return', value: OrderReturnType.CUSTOMER },
            { label: 'Currier Return', value: OrderReturnType.CURRIER },
          ]}
        />
      </div>
      <HeadlessTable tableInstance={table} isLoading={isLoading} noFountMessage="Work in progress." />
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}

export default ReturnOrderTable;
