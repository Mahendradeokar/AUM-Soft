'use client';

import React, { useCallback, useEffect, useState } from 'react';
// import { returns } from '@/requests';
import { ColumnDef, ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import { cancel, returns } from '@/requests';

import { Order } from '../types';
import HeadlessTable from '../shared/HeadlessTable';
import { DataTablePagination } from '../table/data-table-pagination';

import { OrderTableProps } from './type';
import ScanInput from '../shared/ScanInput';
import { Button } from '../ui/button';

interface Props extends OrderTableProps {}

export const orderColumns: ColumnDef<Order>[] = [
  {
    header: 'Suborder Number',
    accessorKey: 'sub_order_no',
    enableColumnFilter: true,
  },
  // {
  //   header: 'Type of return',
  //   accessorKey: 'order_status',
  //   cell: ({ row }) => {
  //     const { order_status: status = null } = row.original;
  //     if (status) {
  //       return <span>{returnTypeMapping[status]}</span>;
  //     }
  //     return '-:-';
  //   },
  // },
  {
    header: 'SKU Name',
    accessorKey: 'sku',
  },
  // {
  //   header: 'Courier Partner',
  //   accessorKey: 'courier',
  //   cell: ({ row }) => {
  //     const { courier = null } = row.original;

  //     return courier ?? '-:-';
  //   },
  // },
  {
    header: 'Supplier Name',
    accessorKey: 'supplier_name',
  },
  // {
  //   header: 'Price',
  //   accessorKey: 'order_price',
  //   cell: HighlighterNumberCell('order_price'),
  // },
  // {
  //   header: 'Price',
  //   accessorKey: 'order_price',
  // },
];

function CancelOrders({ marketplaceId, setOrderCount }: Props) {
  // Use the useTable hook to create table instance
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [totalPage, setTotalPage] = useState<number>(-1);
  const [cancelOrderId, setCancelOrderId] = useState<null | string>(null);

  const table = useCustomTable({
    data: orders,
    columns: orderColumns,
    columnFilters: { state: columnFilters, onChange: setColumnFilters },
    pagination: { state: pagination, onChange: (pagination) => setPagination(pagination) },
    pageCount: totalPage,
  });

  const fetchCancelOrders = useCallback(
    async (marketplaceId: string) => {
      const { isSuccess, data } = await returns.getReturnOrders({
        accountId: marketplaceId,
        status: 'cancel_orders',
        pagination,
      });
      if (isSuccess) {
        setOrders(data.data);
        setTotalPage(Math.ceil(data.count / pagination.pageSize));
        setOrderCount(data.count);
      }
    },
    [pagination, setOrderCount],
  );

  const cancelOrder = async (orderId: string | null) => {
    if (!orderId) {
      return;
    }
    await cancel.cancelOrder({ orderId: orderId.trim() });
  };

  const handleInputKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await cancelOrder(cancelOrderId);
      if (marketplaceId) {
        fetchCancelOrders(marketplaceId);
      }
    }
  };

  const handleOnCancelBtnClick = async () => {
    await cancelOrder(cancelOrderId);
    if (marketplaceId) {
      fetchCancelOrders(marketplaceId);
    }
  };

  useEffect(() => {
    if (marketplaceId) {
      setLoading(true);
      (async () => {
        fetchCancelOrders(marketplaceId);

        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [marketplaceId, columnFilters, table, pagination, setOrderCount, fetchCancelOrders]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start gap-1 mt-2">
        {/* <DataTableSearchBar column={table.getColumn('sub_order_no')} placeholder="Search by suborder number" /> */}
        {/* <DataTableFacetedFilter
          column={table.getColumn('order_status')}
          placeholder="Return type"
          options={[
            { label: 'Customer Return', value: OrderReturnType.CUSTOMER },
            { label: 'Currier Return', value: OrderReturnType.CURRIER },
          ]}
        /> */}
        <ScanInput
          placeholder="Enter Sub Order id..."
          className="mx-2"
          value={String(cancelOrderId ?? '')}
          onChange={(e) => setCancelOrderId(e.target.value ?? null)}
          onKeyDown={handleInputKeydown}
        />
        <Button variant="destructive" type="button" onClick={handleOnCancelBtnClick}>
          Cancel Order
        </Button>
      </div>
      <div className="space-y-2">
        <HeadlessTable tableInstance={table} isLoading={isLoading} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default CancelOrders;
