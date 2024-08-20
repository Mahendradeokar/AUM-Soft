'use client';

import React, { useEffect, useState } from 'react';
// import { returns } from '@/requests';
import { ColumnDef, ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { returns } from '@/requests';

import { calculateDaysAgo } from '@/lib/utils';
import { Order } from '../types';
import HeadlessTable, { HighlighterNumberCell } from '../shared/HeadlessTable';
import { DataTableFacetedFilter } from '../table/data-table-faceted-filter';
// import { DataTableSearchBar } from '../table/data-table-searchbar';
// import type { OrderReturnTypeUnion } from '../../../types';
import { OrderReturnType, OrderReturnTypeUnion } from '../../../types';
import { DataTablePagination } from '../table/data-table-pagination';

import { OrderTableProps } from './type';

interface Props extends OrderTableProps {}

const returnTypeMapping = {
  currierReturn: 'Courier Return',
  customerReturn: 'Customer Return',
} as any;

export const orderColumns: ColumnDef<Order>[] = [
  {
    header: 'Suborder Number',
    accessorKey: 'sub_order_no',
    enableColumnFilter: true,
  },
  {
    header: 'Type of return',
    accessorKey: 'order_status',
    cell: ({ row }) => {
      const { order_status: status = null } = row.original;
      if (status) {
        return <span>{returnTypeMapping[status]}</span>;
      }
      return '-:-';
    },
  },
  {
    header: 'SKU Name',
    accessorKey: 'sku',
  },
  {
    header: 'Courier Partner',
    accessorKey: 'return_currier_partner',
    cell: ({ row }) => {
      const { return_currier_partner: courier = null } = row.original;

      return courier ?? '-:-';
    },
  },
  {
    header: 'Supplier Name',
    accessorKey: 'supplier_name',
  },
  {
    header: 'Price',
    accessorKey: 'order_price',
    cell: HighlighterNumberCell('order_price', <>₹</>),
  },
  {
    header: 'Created',
    accessorKey: 'order_date',
    cell: ({ row }) => {
      const { order_date: createdAt } = row.original;
      const dateOrDaysAgo = calculateDaysAgo({ date: Number(createdAt), threshold: 3 });
      return <span>{dateOrDaysAgo}</span>;
    },
  },
  // {
  //   header: 'Price',
  //   accessorKey: 'order_price',
  // },
];

function ReturnOrderTable({ marketplaceId, setOrderCount }: Props) {
  // Use the useTable hook to create table instance
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [totalPage, setTotalPage] = useState<number>(-1);

  const table = useCustomTable({
    data: orders,
    columns: orderColumns,
    columnFilters: { state: columnFilters, onChange: setColumnFilters },
    pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
    pageCount: totalPage,
  });

  useEffect(() => {
    if (marketplaceId) {
      const [filterReturnType] = (table.getColumn('order_status')?.getFilterValue() as OrderReturnTypeUnion[]) ?? [];
      setLoading(true);
      (async () => {
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'return',
          returnType: filterReturnType ?? undefined,
        });
        if (isSuccess) {
          setOrders(data.data);
          setTotalPage(Math.ceil(data.count / pagination.pageSize));
          setOrderCount(data.count);
        }

        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [marketplaceId, columnFilters, table, pagination, setOrderCount]);

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
      <div className="space-y-2">
        <HeadlessTable tableInstance={table} isLoading={isLoading} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default ReturnOrderTable;
