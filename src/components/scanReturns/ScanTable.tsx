'use client';

import React, { ComponentProps } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomTable } from '@/hooks/useCustomTable';
import HeadlessTable from '../shared/HeadlessTable';
import { Order } from '../types';

// Define column interface

type HeadlessTableProps<T extends Order> = ComponentProps<typeof HeadlessTable<T>>;
interface NecessaryProp<T extends Order>
  extends Omit<HeadlessTableProps<T>, 'columns' | 'isLoading' | 'tableInstance'> {}
interface OptionalProps<T extends Order> extends Partial<Pick<HeadlessTableProps<T>, 'isLoading'>> {}
interface Props<T extends Order> extends NecessaryProp<T>, OptionalProps<T> {
  data: T[];
}

export const orderColumns: ColumnDef<Order>[] = [
  {
    header: 'Sr No.',
    accessorFn: (_, index) => index + 1,
  },
  {
    header: 'Suborder Number',
    accessorKey: 'sub_order_no',
  },
  {
    header: 'SKU Name',
    accessorKey: 'sku',
  },
  {
    header: 'Courier Partner',
    accessorKey: 'courier',
  },
  {
    header: 'Supplier Name',
    accessorKey: 'supplier_name',
  },
];

function ScanOrderTable<T extends Order>({ data, isLoading = false }: Props<T>) {
  const table = useCustomTable({
    data,
    columns: orderColumns,
  });
  return <HeadlessTable tableInstance={table} isLoading={isLoading} />;
}

export default ScanOrderTable;
