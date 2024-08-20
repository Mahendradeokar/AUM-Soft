'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { calculateDaysAgo, formatUnixDate } from '@/lib/utils';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { DataTablePagination } from '../table/data-table-pagination';
import { OrderTableProps } from './type';

interface Props extends OrderTableProps {}

export const orderColumns: ColumnDef<Order>[] = [
  {
    header: 'Suborder Number',
    accessorKey: 'sub_order_no',
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
    header: 'Created',
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const { order_date: createdAt } = row.original;
      const dateOrDaysAgo = calculateDaysAgo({ date: Number(createdAt), threshold: 3 });
      const date = formatUnixDate(Number(createdAt), 'D MMMM YY');
      return (
        <span title={date} className="cursor-help w-full h-full">
          {dateOrDaysAgo}
        </span>
      );
    },
  },
  {
    header: 'Issue',
    accessorKey: 'issue',
    cell: ({ row }) => {
      const { issue } = row.original;
      return <div>{issue}</div>;
    },
  },
];

function OrderIssuesTable({ marketplaceId, setOrderCount }: Props) {
  // Use the useTable hook to create table instance
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [totalPage, setTotalPage] = useState<number>(-1);

  const table = useCustomTable({
    data: orders,
    columns: orderColumns,
    pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
    pageCount: totalPage,
  });

  useEffect(() => {
    if (marketplaceId) {
      setLoading(true);
      (async () => {
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'issue_orders',
          pagination,
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
  }, [marketplaceId, pagination, setOrderCount]);

  return (
    <div className="space-y-2">
      <HeadlessTable tableInstance={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}

export default OrderIssuesTable;

/*
  Search design
  issue tab
  message in pending.

*/
