'use client';

import * as React from 'react';
// import { DotsHorizontalIcon } from '@radix-ui/react-icons';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { marketplace } from '@/requests';
import { Loader } from '@/components/shared';
import { PlusCircledIcon, UploadIcon } from '@radix-ui/react-icons';
import APIModel from './MpModel';
import { UploadModal } from '../Upload';
import { ModalType } from '../types';

export type MarketPlaceCred = {
  _id: string;
  apiKey: string;
  Secret: string;
  marketPlace_name: string;
  account_name: string;
};

// const data: MarketPlaceCred[] = [
//   {
//     id: 'm5gr84i9',
//     apiKey: 'R7Bgt3E2fs9TqA1P',
//     apiSecret: 'xhFvL9qQz6jwXm58Zd0Q32Ej4YrnOAbc',
//     marketPlace: 'Flipkart',
//   },
//   {
//     id: 'm5gr84i9',
//     apiKey: 'Gn2kCp5rVl9mS3tQ',
//     apiSecret: 'Y4jHbA2uN5zKw8v9X6fR2mD7oB1lJ0x5',
//     marketPlace: 'Amazon',
//   },
//   {
//     id: 'm5gr84i9',
//     apiKey: 'yT8vN1pJ7m2qB9lA',
//     apiSecret: 'W6rF7bK1n5tH8zJ2mL3aD0qY4vE5xN9t',
//     marketPlace: 'meesho',
//   },
// ];

export const columns: ColumnDef<MarketPlaceCred>[] = [
  {
    accessorKey: 'market_place_name',
    header: 'Marketplace',
    cell: ({ row }) => (
      <div className="capitalize max-w-[200px]" title={row.getValue('market_place_name')}>
        {row.getValue('market_place_name')}
      </div>
    ),
  },
  {
    accessorKey: 'account_name',
    header: () => <div className="text-start">Account Name</div>,
    cell: ({ row }) => (
      <div className="text-start truncate max-w-[200px]" title={row.getValue('account_name')}>
        {row.getValue('account_name')}
      </div>
    ),
  },
  // {
  //   accessorKey: 'api_key',
  //   header: () => <div className="text-start">Api key</div>,
  //   cell: ({ row }) => (
  //     <div className="text-start truncate max-w-[200px]" title={row.getValue('api_key')}>
  //       {row.getValue('api_key')}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'secret',
  //   header: () => <div className="text-start">Api Secret</div>,
  //   cell: ({ row }) => (
  //     <div className="text-start truncate max-w-[200px]" title={row.getValue('secret')}>
  //       {row.getValue('secret')}
  //     </div>
  //   ),
  // },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   // { row, table }
  //   cell: () => {
  //     // const payment = row.original;
  //     // const { showModel } = table.options.meta;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           {/* <DropdownMenuItem
  //             onClick={() =>
  //               showModel({ key: payment.apiKey, secret: payment.apiSecret, marketPlace: payment.marketPlace })
  //             }
  //           >
  //             Edit
  //           </DropdownMenuItem> */}
  //           <DropdownMenuItem>Delete (Coming Soon)</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export default function MarketPlaceTable() {
  const router = useRouter();
  const [model, setModel] = React.useState({ open: false, key: '', secret: '', marketPlace: '' });
  const [isUploadModelOpen, setUploadModelOpen] = React.useState<Exclude<ModalType, 'marketplace'> | null>(null);
  const [marketPlaceData, setMarketplaceData] = React.useState<MarketPlaceCred[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (model.open) {
      return;
    }
    (async () => {
      const response = await marketplace.getMarketplace();
      if (response.isSuccess) {
        setMarketplaceData(response.data);
      }
      setLoading(false);
    })();
  }, [router, model.open]);

  const handleModelOpen = (isOpen: boolean) => {
    setModel((preState) => {
      return { ...preState, open: isOpen };
    });
  };

  const table = useReactTable({
    data: marketPlaceData,
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
    <div className="grid grid-cols-5">
      <div className="col-span-3">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-sm text-muted-foreground">Available Marketplace</h1>
          <div className="flex gap-3">
            <Button
              size="sm"
              className="ml-auto h-8"
              onClick={() => {
                setModel({ open: true, key: '', secret: '', marketPlace: '' });
              }}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add Marketplace
            </Button>
            <Button
              size="sm"
              className="ml-auto h-8"
              onClick={() => {
                setUploadModelOpen('order');
              }}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Orders
            </Button>

            <Button
              size="sm"
              className="ml-auto h-8"
              onClick={() => {
                setUploadModelOpen('returns');
              }}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Returns
            </Button>
          </div>
        </div>
        <div className="rounded-md border w-full overflow-hidden">
          <Table className="w-full overflow-hidden">
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
                    {isLoading ? <Loader className="h-auto" /> : 'No results.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {model.open && (
          <APIModel
            mode={model.key ? 'edit' : 'create'}
            apiKey={model.key}
            secret={model.secret}
            open={model.open}
            marketPlace={model.marketPlace}
            setOpen={handleModelOpen}
          />
        )}
        {isUploadModelOpen && (
          <UploadModal name={isUploadModelOpen} open={Boolean(isUploadModelOpen)} setOpen={setUploadModelOpen} />
        )}
      </div>
    </div>
  );
}
