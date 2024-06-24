import { ColumnDef } from '@tanstack/react-table';
import { Order } from './type';

export const orderColumns: ColumnDef<Order>[] = [
  {
    header: 'Order ID',
    accessorKey: '_id',
  },
  {
    header: 'Suborder Number',
    accessorKey: 'suborder_number',
  },
  {
    header: 'Type of return',
    accessorKey: 'type_of_return',
  },
];
