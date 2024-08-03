import React from 'react';
import { CellContext, flexRender, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Loader, NumberHighlighter } from '.';
import { Order } from '../types';

interface HeadlessTableProps<T> {
  tableInstance: ReturnType<typeof useReactTable<T>>;
  noFountMessage?: string;
  isLoading: boolean;
}

function HeadlessTable<T>({ tableInstance, isLoading, noFountMessage }: HeadlessTableProps<T>) {
  if (isLoading) {
    return <Loader className="h-16" />;
  }

  const { pageIndex, pageSize } = tableInstance.getState().pagination ?? { pageIndex: 0, pageSize: 0 };
  const serialNumberStartFrom = pageIndex * pageSize + 1;
  return (
    <div className="space-y-4">
      <div className="rounded-md border relative">
        <Table>
          <TableHeader>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>Sr No</TableHead>
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
            {tableInstance.getRowModel().rows?.length ? (
              tableInstance.getRowModel().rows.map((row, index) => {
                return (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    <TableCell>{serialNumberStartFrom + index}</TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={tableInstance.getAllColumns().length} className="h-24 text-center">
                  {noFountMessage ?? 'No data available'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default HeadlessTable;

export const HighlighterNumberCell = (fieldName: keyof Order) => {
  return function ({ row }: CellContext<Order, unknown>) {
    const price = Number(row.original[fieldName]);

    if (typeof price === null || price === undefined || Number.isNaN(price)) {
      return <span>-:-</span>;
    }
    return <NumberHighlighter number={price} content={price} />;
  };
};
