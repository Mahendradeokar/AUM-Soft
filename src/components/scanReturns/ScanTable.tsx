'use client';

import React, { ComponentProps } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import HeadlessTable from '../shared/HeadlessTable';
import { Order } from '../types';

// Define column interface

type HeadlessTableProps<T> = ComponentProps<typeof HeadlessTable<T>>;
interface NecessaryProp<T> extends Omit<HeadlessTableProps<T>, 'columns' | 'isLoading'> {}
interface OptionalProps<T> extends Partial<Pick<HeadlessTableProps<T>, 'isLoading'>> {}
interface Props<T> extends NecessaryProp<T>, OptionalProps<T> {}

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
    header: 'Price',
    accessorKey: 'order_price',
  },
];

function ScanOrderTable<T>({ data, isLoading = false }: Props<T>) {
  return <HeadlessTable columns={orderColumns} data={data} isLoading={isLoading} />;
}

export default ScanOrderTable;
