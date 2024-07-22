'use client';

import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { DataTablePagination } from '../table/data-table-pagination';
import { DataTableFacetedFilter } from '../table/data-table-faceted-filter';

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
    header: 'Type of return',
    accessorKey: 'order_status',
  },
  {
    header: 'SKU Name',
    accessorKey: 'sku',
  },
  {
    header: 'Price',
    accessorKey: 'order_price',
  },
  // {
  //   header: 'Price',
  //   accessorKey: 'order_price',
  // },
];

function ReturnOrderTable({ marketplaceId }: Props) {
  // Use the useTable hook to create table instance
  const [completeOrder, setCompleteOrder] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(true);

  const table = useCustomTable({
    data: completeOrder,
    columns: orderColumns,
  });

  useEffect(() => {
    if (marketplaceId) {
      setLoading(true);
      (async () => {
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          status: 'return',
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-4">
        <DataTableFacetedFilter
          column={table.getColumn('order_status')}
          title="Type of return"
          options={[
            { label: 'Customer Return', value: 'CustomerReturn' },
            { label: 'Currier Return', value: 'currierReturn' },
          ]}
        />
      </div>
      <HeadlessTable tableInstance={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}

export default ReturnOrderTable;
