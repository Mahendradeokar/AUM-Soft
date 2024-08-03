import { Column } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface DataTableSearchBarProps<TData, TValue> {
  column?: Column<TData, TValue>;
  placeholder?: string;
}

export function DataTableSearchBar<TData, TValue>({ column, placeholder }: DataTableSearchBarProps<TData, TValue>) {
  return (
    <div className="flex items-center h-8">
      <Input
        placeholder={placeholder}
        startIcon={Search}
        value={(column?.getFilterValue() as string) ?? ''}
        onChange={(event) => column?.setFilterValue(event.target.value)}
        className="h-8 w-[150px] lg:w-[250px]"
      />
    </div>
  );
}
