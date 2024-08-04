'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { NumberHighlighter } from '../shared';
import { OrderTableProps } from './type';

// Define column interface
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

  const table = useCustomTable({
    data: completeOrder,
    columns: orderColumns,
  });

  useEffect(() => {
    if (marketplaceId) {
      (async () => {
        setLoading(true);
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'completed',
        });
        if (isSuccess) {
          setCompleteOrder(data);
        }

        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [marketplaceId]);

  return <HeadlessTable tableInstance={table} isLoading={isLoading} />;
}

export default CompleteOrderTable;
