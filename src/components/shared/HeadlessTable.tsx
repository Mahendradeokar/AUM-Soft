import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Loader } from '.';

interface HeadlessTableProps<T> {
  columns: any;
  data: T[];
  isLoading: boolean;
}

function HeadlessTable<T>({ columns, data, isLoading }: HeadlessTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: false,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Loader className="h-16" />;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border relative">
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data available
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
