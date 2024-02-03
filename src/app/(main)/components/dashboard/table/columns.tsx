'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { convertUnixToDate } from '@/common/common';
import { Task } from './data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { statuses } from './data/data';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'order_item_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Id" />,
    cell: ({ row }) => <div className="main-content">{row.getValue('order_item_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => <DataTableColumnHeader className="max-w-max w-[500px]" column={column} title="SKU" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue('sku')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'flipkart_status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="marketplace Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value.toUpperCase() === row.getValue('flipkart_status'));

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'));

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'order_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Date" />,
    cell: ({ row }) => {
      const date: number = row.getValue('order_date');
      return <div>{convertUnixToDate(date)}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => {
      return <div>{row.getValue('quantity')}</div>;
    },
  },
  {
    accessorKey: 'paymentType',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Type" />,
    cell: ({ row }) => {
      return <div>{row.getValue('paymentType')}</div>;
    },
  },
  {
    accessorKey: 'commission',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Commission" />,
    cell: ({ row }) => {
      return <div>{row.getValue('commission')}</div>;
    },
  },
  {
    accessorKey: 'shippingFee',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shipping Fee" />,
    cell: ({ row }) => {
      return <div>{row.getValue('shippingFee')}</div>;
    },
  },
  {
    accessorKey: 'fixedFee',
    header: ({ column }) => <DataTableColumnHeader column={column} title="fixed Fee" />,
    cell: ({ row }) => {
      return <div>{row.getValue('fixedFee')}</div>;
    },
  },
  {
    accessorKey: 'reverseShippingFee',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reverse Shipping Fee" />,
    cell: ({ row }) => {
      return <div className="max-w-max">{row.getValue('reverseShippingFee')}</div>;
    },
  },
  {
    accessorKey: 'collectionFee',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Collection Fee" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('collectionFee')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'net_profit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Profit" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('net_profit')}</span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
  //   cell: ({ row }) => {
  //     const priority = priorities.find((priority) => priority.value === row.getValue('priority'));

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
