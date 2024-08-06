'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { NumberHighlighter } from '../shared';
import { DataTablePagination } from '../table/data-table-pagination';
import { OrderTableProps } from './type';

// Define column interface
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
    header: 'Price',
    accessorKey: 'order_price',
    cell: ({ row }) => <NumberHighlighter number={row.original.order_price} content={row.original.order_price} />,
  },
];

interface Props extends OrderTableProps {}

function CompleteOrderTable({ marketplaceId }: Props) {
  // Use the useTable hook to create table instance
  const [completeOrder, setCompleteOrder] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [totalPage, setTotalPage] = useState<number>(-1);

  const table = useCustomTable({
    data: completeOrder,
    columns: orderColumns,
    pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
    pageCount: totalPage,
  });

  useEffect(() => {
    if (marketplaceId) {
      (async () => {
        setLoading(true);
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'completed',
          pagination,
        });
        if (isSuccess) {
          setCompleteOrder(data.data);
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

export default CompleteOrderTable;
