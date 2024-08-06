'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import dayjs from 'dayjs';
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
    header: 'Supplier Name',
    accessorKey: 'supplier_name',
  },
  {
    header: 'Created',
    accessorKey: 'order_date',
    cell: ({ row }) => {
      const { order_date: createdAt } = row.original;
      const createdDate = dayjs.unix(Number(createdAt));
      const daysAgo = dayjs().diff(createdDate, 'day');
      if (daysAgo > 5) {
        return <span>{createdDate.format('D MMMM')}</span>;
      }
      return <span>{daysAgo} days ago</span>;
    },
  },
];

function PendingOrderTable({ marketplaceId }: Props) {
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
          status: 'pending',
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

export default PendingOrderTable;

/*
  Search design
  issue tab
  message in pending.

*/
