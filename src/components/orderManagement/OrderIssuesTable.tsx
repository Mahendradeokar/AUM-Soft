'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import dayjs from 'dayjs';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';

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
  // const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = useCustomTable({
    data: orders,
    columns: orderColumns,
    // pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
  });

  useEffect(() => {
    if (marketplaceId) {
      setLoading(true);
      (async () => {
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'issue_orders',
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
      {/* <DataTablePagination table={table} /> */}
    </>
  );
}

export default OrderIssuesTable;

/*
  Search design
  issue tab
  message in pending.

*/
