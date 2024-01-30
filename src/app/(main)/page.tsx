import { Metadata } from 'next';
import { DashCart, DataTable, MarketPlaceSwitcher } from './components/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

const cardData: {
  id: string | number;
  title: string;
  icon: any;
  totalValue: string;
  percentageChange: string;
}[] = [
  {
    id: 1,
    title: 'Profit/Loss',
    icon: 'svg-for-total-revenue',
    totalValue: '₹1,50,068',
    percentageChange: '+20.1% from last month',
  },
  {
    id: 2,
    title: 'Total Orders',
    icon: 'svg-for-subscriptions',
    totalValue: '+2350',
    percentageChange: '+180.1% from last month',
  },
  {
    id: 3,
    title: 'Customer Return',
    icon: 'svg-for-sales',
    totalValue: '+34',
    percentageChange: '+19% from last month',
  },
  {
    id: 4,
    title: 'Courier Return',
    icon: 'svg-for-active-now',
    totalValue: '+53',
    percentageChange: '+201 since last hour',
  },
];

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-between h-16 items-center">
        <h2 className="text-3xl font-bold tracking-normal">Dashboard</h2>
        <MarketPlaceSwitcher />
      </div>
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((cart) => (
            <DashCart
              key={cart.title}
              description={cart.percentageChange}
              title={cart.title}
              content={cart.totalValue}
              Icon={cart.icon}
            />
          ))}
        </div>
        <div>
          <DataTable />
        </div>
      </div>
    </>
  );
}
