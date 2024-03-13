import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

type TFilter = { column: any; className?: string } & React.HTMLAttributes<HTMLInputElement>;
function Filter({ column, className, ...props }: TFilter) {
  return (
    <Input
      className={cn('h-8 min-w-[8rem]', className)}
      {...props}
      value={(column?.getFilterValue() as string) ?? ''}
      onChange={(event) => column?.setFilterValue(event.target.value)}
    />
  );
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  let icon = <CaretSortIcon className="ml-2 h-4 w-4" />;
  if (column.getIsSorted() === 'desc') {
    icon = <ArrowDownIcon className="ml-2 h-4 w-4" />;
  } else if (column.getIsSorted() === 'asc') {
    icon = <ArrowUpIcon className="ml-2 h-4 w-4" />;
  }

  if (column.getCanSort()) {
    return (
      <div className={cn('flex items-center space-x-2 my-2', className)}>
        <DropdownMenu>
          <div>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent flex justify-between">
                <span className="capitalize">{title}</span>
                {icon}
              </Button>
            </DropdownMenuTrigger>
            {column.getCanFilter() && <Filter column={column} placeholder={`Filter ${title}`} />}
          </div>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="grid gap-1">
      <div className={cn(className)}>{title}</div>
      {column.getCanFilter() && <Filter column={column} placeholder={`Filter ${title}`} />}
    </div>
  );
}
