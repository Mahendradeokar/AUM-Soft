import { columns } from './columns';
import { DataTable as Table } from './data-table';

export default async function DataTable() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order&apos;s list!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of your orders for this month!</p>
        </div>
        <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
      </div>
      <Table columns={columns} />
    </div>
  );
}
