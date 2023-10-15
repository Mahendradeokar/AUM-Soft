'use client';

import * as React from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import APIModel from './APIModel';

export type MarketPlaceCred = {
  id: string;
  apiKey: string;
  apiSecret: string;
  marketPlace: string;
  showModel?: () => void;
};

const data: MarketPlaceCred[] = [
  {
    id: 'm5gr84i9',
    apiKey: 'R7Bgt3E2fs9TqA1P',
    apiSecret: 'xhFvL9qQz6jwXm58Zd0Q32Ej4YrnOAbc',
    marketPlace: 'Flipkart',
  },
  {
    id: 'm5gr84i9',
    apiKey: 'Gn2kCp5rVl9mS3tQ',
    apiSecret: 'Y4jHbA2uN5zKw8v9X6fR2mD7oB1lJ0x5',
    marketPlace: 'Amazon',
  },
  {
    id: 'm5gr84i9',
    apiKey: 'yT8vN1pJ7m2qB9lA',
    apiSecret: 'W6rF7bK1n5tH8zJ2mL3aD0qY4vE5xN9t',
    marketPlace: 'meesho',
  },
];

export const columns: ColumnDef<MarketPlaceCred>[] = [
  {
    accessorKey: 'marketPlace',
    header: 'Marketplace',
    cell: ({ row }) => <div className="capitalize">{row.getValue('marketPlace')}</div>,
  },
  {
    accessorKey: 'apiKey',
    header: () => <div className="text-center">Api key</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('apiKey')}</div>,
  },
  {
    accessorKey: 'apiSecret',
    header: () => <div className="text-center">Api Secret</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('apiSecret')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const payment = row.original;
      const { showModel } = table.options.meta;
      console.log(table.options.meta);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                showModel({ key: payment.apiKey, secret: payment.apiSecret, marketPlace: payment.marketPlace })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Disable</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableDemo() {
  const [model, setModel] = React.useState({ open: false, key: '', secret: '', marketPlace: '' });

  const handleModelOpen = (isOpen: boolean) => {
    setModel((preState) => {
      return { ...preState, open: isOpen };
    });
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      showModel: ({ key, secret, marketPlace }: { key: string; secret: string; marketPlace: string }) => {
        setModel({
          open: true,
          key,
          secret,
          marketPlace,
        });
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-sm text-muted-foreground">Available Marketplace</h1>
        <Button
          onClick={() => {
            setModel({ open: true, key: '', secret: '', marketPlace: '' });
          }}
        >
          Add Marketplace
        </Button>
      </div>
      <div className="rounded-md border">
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
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <APIModel
        mode={model.key ? 'edit' : 'create'}
        apiKey={model.key}
        secret={model.secret}
        open={model.open}
        marketPlace={model.marketPlace}
        setOpen={handleModelOpen}
      />
    </div>
  );
}
