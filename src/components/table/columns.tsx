'use client';

import { ColumnDef } from '@tanstack/react-table';

import { convertUnixToDate } from '@/common/common';
import { cn, isNegative } from '@/lib/utils';
import { FLIPKART_STATUS } from '@/common/constants';
import { Order } from './data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
// import { statuses } from './data/data';

export const columns: ColumnDef<Order>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'order_item_id',
    id: 'orderItemId',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Order Id" />,
    cell: ({ row }) => <div className="main-content">{row.getValue('orderItemId')}</div>,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: true,
  },
  {
    id: 'skuId',
    accessorKey: 'seller_sku',
    header: ({ column }) => <DataTableColumnHeader className="min-w-max" column={column} title="SKU" />,
    cell: ({ row }) => {
      const sku: string = row.getValue('skuId');
      return (
        <div className="flex space-x-2" title={sku}>
          <span className="max-w-[25ch] truncate font-medium">{sku}</span>
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'sale_amount_rs',
    header: ({ column }) => <DataTableColumnHeader className="min-w-max" column={column} title="Selling Price" />,
    cell: ({ row }) => {
      const value: number | string = row.getValue('sale_amount_rs');
      return (
        <div className="flex space-x-2">
          <span className={cn('max-w-[500px] truncate font-medium')}>{value}</span>
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'return_type',
    header: ({ column }) => <DataTableColumnHeader className="min-w-max" column={column} title="Status" />,
    cell: ({ row }) => {
      const value: keyof typeof FLIPKART_STATUS = row.getValue('return_type');
      return (
        <div className="flex space-x-2">
          <span className={cn('max-w-[500px] truncate font-medium')}>{FLIPKART_STATUS[value].value}</span>
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'bank_settlement_value_rs_sum',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Net Profit" />,
    cell: ({ row }) => {
      const value: string = row.getValue('bank_settlement_value_rs_sum');
      return (
        <div className="flex items-center">
          <span className={cn(isNegative(value) ? 'text-red-400' : 'text-green-400')}>{value}</span>
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'protection_fund_rs',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Order Claim" />,
    cell: ({ row }) => {
      const value: string = row.getValue('protection_fund_rs');
      return (
        <div className="flex items-center">
          <span
            className={cn('max-w-[500px] truncate font-medium', isNegative(value) ? 'text-red-400' : 'text-green-400')}
          >
            {value}
          </span>
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'refund_rs',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Refund" />,
    cell: ({ row }) => {
      const value: string = row.getValue('refund_rs');
      return (
        <div className="flex items-center">
          <span
            className={cn('max-w-[500px] truncate font-medium', isNegative(value) ? 'text-red-400' : 'text-green-400')}
          >
            {value}
          </span>
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'commission_rs',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Commission Fee" />,
    cell: ({ row }) => {
      const value: string = row.getValue('commission_rs');
      return (
        <div className="flex items-center">
          <span
            className={cn('max-w-[500px] truncate font-medium', isNegative(value) ? 'text-red-400' : 'text-green-400')}
          >
            {value}
          </span>
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'fixed_fee_rs',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Fixed Fee" />,
    cell: ({ row }) => {
      const value: string = row.getValue('fixed_fee_rs');
      return <div className={cn(isNegative(value) ? 'text-red-400' : 'text-green-400')}>{value}</div>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'collection_fee_rs',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Collection Fee" />,
    cell: ({ row }) => {
      const value: string = row.getValue('collection_fee_rs');
      return <div className={cn(isNegative(value) ? 'text-red-400' : 'text-green-400')}>{value}</div>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'shipping_fee_rs',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Shipping Fee" />,
    cell: ({ row }) => {
      const value: string = row.getValue('shipping_fee_rs');
      return <div className={cn(isNegative(value) ? 'text-red-400' : 'text-green-400')}>{value}</div>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'reverse_shipping_fee_rs',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="min-w-max" title="Reverse Shipping Fee" />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue('reverse_shipping_fee_rs');
      return <div className={cn(isNegative(value) ? 'text-red-400' : 'text-green-400')}>{value}</div>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'order_date',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Order Date" />,
    cell: ({ row }) => {
      const unixDate: number = row.getValue('order_date');
      const date = convertUnixToDate(unixDate);
      return (
        <div title={date} className="min-w-max">
          {date}
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Quantity" />,
    cell: ({ row }) => {
      return <div className="max-w-max">{row.getValue('quantity')}</div>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'return_type',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Return Type" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('return_type')}</span>
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'shopsy_order',
    header: ({ column }) => <DataTableColumnHeader column={column} className="min-w-max" title="Shopsy Order" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('shopsy_order')}</span>
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
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
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
