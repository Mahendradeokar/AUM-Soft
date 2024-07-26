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
    header: 'Sr No.',
    accessorFn: (_, index) => index + 1,
  },
  {
    header: 'Suborder Number',
    accessorKey: 'sub_order_no',
  },
  {
    header: 'SKU Name',
    accessorKey: 'sku',
  },
  {
    header: 'Created',
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const { created_at: createdAt } = row.original;
      const daysAgo = dayjs().diff(dayjs.unix(createdAt), 'day');
      return <span>{daysAgo} days ago</span>;
    },
  },
];

function PendingOrderTable({ marketplaceId }: Props) {
  // Use the useTable hook to create table instance
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = useCustomTable({
    data: orders,
    columns: orderColumns,
    pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
  });

  useEffect(() => {
    if (marketplaceId) {
      setLoading(true);
      (async () => {
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'pending',
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
    <>
      <HeadlessTable tableInstance={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </>
  );
}

export default PendingOrderTable;

/*
  Search design
  issue tab
  message in pending.

*/
