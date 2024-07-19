'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';

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
  },
];

type Props = {
  marketplaceId: string | null;
};

function CompleteOrderTable({ marketplaceId }: Props) {
  // Use the useTable hook to create table instance
  const [completeOrder, setCompleteOrder] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(true);

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

  return <HeadlessTable columns={orderColumns} data={completeOrder} isLoading={isLoading} />;
}

export default CompleteOrderTable;
