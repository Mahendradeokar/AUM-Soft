'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Order } from './type';
import { orderColumns } from './tableColumn';
import { Loader } from '../shared';

// Define column interface

type Props = {
  marketplaceId: string | undefined;
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
          orderType: 'COMPLETED',
        });
        if (isSuccess) {
          setCompleteOrder(data);
        }

        setLoading(false);
      })();
    }
  }, [marketplaceId]);

  const table = useReactTable({
    data: completeOrder,
    columns: orderColumns,
    manualPagination: true,
    manualSorting: false,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Loader className="h-16" />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={orderColumns.length} className="h-24 text-center" />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompleteOrderTable;
