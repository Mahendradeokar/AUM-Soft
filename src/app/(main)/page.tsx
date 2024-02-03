import { Metadata } from 'next';
import { dashboard } from '@/requests';
import { DashCart, DataTable, MarketPlaceSwitcher } from './components/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default async function Dashboard() {
  const { data: statisticData, isSuccess, statusMessage } = await dashboard.getStatisticData();

  let containOfCardComp: JSX.Element | null;
  if (!isSuccess) {
    containOfCardComp = <DashCart description={statusMessage} title="Something went wrong!" />;
  } else {
    containOfCardComp = (
      <>
        {statisticData.map((stats: any) => (
          <DashCart
            key={stats.title}
            // description={stats.percentageChange}
            title={stats.title}
            content={stats.totalValue}
            Icon={stats.icon}
          />
        ))}
      </>
    );
  }
  return (
    <>
      <div className="flex justify-between h-16 items-center">
        <h2 className="text-3xl font-bold tracking-normal">Dashboard</h2>
        <MarketPlaceSwitcher />
      </div>
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{containOfCardComp}</div>
        <div className="overflow-auto w-[100%]">
          <DataTable />
        </div>
      </div>
    </>
  );
}
