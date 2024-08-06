'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import dayjs from 'dayjs';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { DataTablePagination } from '../table/data-table-pagination';

type Props = {
  marketplaceId: string | null;
};

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
      const { created_at: createdAt } = row.original;
      const daysAgo = dayjs().diff(dayjs.unix(createdAt), 'day');
      return <div>{daysAgo} days ago</div>;
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

function OrderIssuesTable({ marketplaceId }: Props) {
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
        }

        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [marketplaceId, pagination]);

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
