import {
  useReactTable,
  PaginationState,
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getCoreRowModel,
  OnChangeFn,
  ColumnDef,
  RowData,
} from '@tanstack/react-table';

interface PaginationConfig {
  manualPagination: boolean;
  state: { pagination: PaginationState };
  onPaginationChange: OnChangeFn<PaginationState>;
}

interface SortingConfig {
  manualSorting: boolean;
  state: { sorting: SortingState };
  onSortingChange: OnChangeFn<SortingState>;
  getSortedRowModel: ReturnType<typeof getSortedRowModel>;
}

interface FilteringConfig<T extends RowData> {
  manualFiltering: boolean;
  state: { columnFilters: ColumnFiltersState };
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  getFilteredRowModel: ReturnType<typeof getFilteredRowModel<T>>;
  getFacetedRowModel: ReturnType<typeof getFacetedRowModel<T>>;
  getFacetedUniqueValues: ReturnType<typeof getFacetedUniqueValues<T>>;
}

function getPaginationConfig(pagination?: {
  state: PaginationState;
  onChange: OnChangeFn<PaginationState>;
}): Partial<PaginationConfig> {
  if (!pagination) return {};
  return {
    manualPagination: true,
    state: { pagination: pagination.state },
    onPaginationChange: pagination.onChange,
  };
}

function getSortingConfig(sorting?: {
  state: SortingState;
  onChange: OnChangeFn<SortingState>;
}): Partial<SortingConfig> {
  if (!sorting) return {};
  return {
    manualSorting: true,
    state: { sorting: sorting.state },
    onSortingChange: sorting.onChange,
    getSortedRowModel: getSortedRowModel(),
  };
}

function getFilteringConfig<T extends RowData>(columnFilters?: {
  state: ColumnFiltersState;
  onChange: OnChangeFn<ColumnFiltersState>;
}): Partial<FilteringConfig<T>> {
  if (!columnFilters) return {};
  return {
    manualFiltering: true,
    state: { columnFilters: columnFilters.state },
    onColumnFiltersChange: columnFilters.onChange,
    getFilteredRowModel: getFilteredRowModel<T>(),
    getFacetedRowModel: getFacetedRowModel<T>(),
    getFacetedUniqueValues: getFacetedUniqueValues<T>(),
  };
}

export function useCustomTable<T extends RowData>({
  data,
  columns,
  sorting,
  columnFilters,
  pagination,
  pageCount = -1,
}: {
  data: T[];
  columns: ColumnDef<T, any>[];
  sorting?: { state: SortingState; onChange: OnChangeFn<SortingState> };
  columnFilters?: { state: ColumnFiltersState; onChange: OnChangeFn<ColumnFiltersState> };
  pagination?: { state: PaginationState; onChange: OnChangeFn<PaginationState> };
  pageCount?: number;
}) {
  const paginationConfig = getPaginationConfig(pagination);
  const sortingConfig = getSortingConfig(sorting);
  const filteringConfig = getFilteringConfig<T>(columnFilters);

  const table = useReactTable<T>({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    ...paginationConfig,
    ...sortingConfig,
    ...filteringConfig,
  });

  return table;
}
