'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { returns } from '@/requests';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Order } from './type';
import { orderColumns } from './tableColumn';

type Props = {
  marketplaceId: string | undefined;
  scannedOrder?: Order[];
  isScannedOrder?: boolean;
};

function PendingOrderTable({ marketplaceId, scannedOrder, isScannedOrder = false }: Props) {
  // Use the useTable hook to create table instance
  const [completeOrder, setCompleteOrder] = useState<Order[]>([]);

  useEffect(() => {
    if (marketplaceId) {
      (async () => {
        // debugger;
        const { isSuccess, data } = await returns.getReturnOrders({
          accountId: marketplaceId,
          orderType: 'PENDING',
        });
        if (isSuccess) {
          setCompleteOrder(data);
        }
      })();
    }
  }, [marketplaceId]);

  const tableData = isScannedOrder ? scannedOrder ?? [] : completeOrder;
  const table = useReactTable({
    data: tableData,
    columns: orderColumns,
    manualPagination: true,
    manualSorting: false,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });

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

export default PendingOrderTable;
