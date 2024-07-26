'use client';

import { dashboard } from '@/requests';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/shared';
import { useSearchParams } from 'next/navigation';
import { isNegative, isZero } from '@/lib/utils';
import { ClipboardCheck, IndianRupee, RotateCcw, TrendingDown } from 'lucide-react';
import DashCart from './card';

interface StatsType {
  totalOrder: number;
  totalReturn: number;
  totalProfit: number;
  totalCustomerReturnLoss: number;
  totalCustomerReturn: number;
  totalCurrieReturn: number;
  totalSales: number;
}

const convertIntoStatisticsData = ({
  totalOrder = 0,
  totalReturn = 0,
  // totalProfit = 0,
  totalCustomerReturnLoss = 0,
  totalCustomerReturn = 0,
  totalCurrieReturn = 0,
  totalSales = 0,
}: Partial<StatsType>): {
  id: string | number;
  title: string;
  icon: any;
  content: string | number;
  description: string;
  originalValue: number;
}[] => {
  return [
    {
      id: 1,
      title: 'Total Sale',
      icon: IndianRupee,
      originalValue: totalSales,
      content: `₹${totalSales.toFixed(2)}`,
      description: isNegative(totalSales.toFixed(2))
        ? `Your loss is ${totalSales.toFixed(2)} till now.`
        : `Your sale is ${totalSales.toFixed(2)} till now.`,
    },
    {
      id: 2,
      title: 'Total Orders',
      icon: ClipboardCheck,
      originalValue: totalOrder,
      content: `#${totalOrder}`,
      description: `Your total order are ${totalOrder} till now`,
    },
    {
      id: 3,
      title: 'Return Loss',
      icon: TrendingDown,
      originalValue: totalCustomerReturnLoss,
      content: isZero(totalCustomerReturnLoss) ? `₹${totalCustomerReturnLoss}` : `₹-${totalCustomerReturnLoss}`,
      description: `Your total return loss are ${totalCustomerReturnLoss} till now`,
    },
    {
      id: 4,
      title: 'Total Return',
      icon: RotateCcw,
      content: `↩ ${totalReturn}`,
      originalValue: totalReturn,
      description: `Customer Return is ${totalCustomerReturn} & Currier Return is ${totalCurrieReturn}`,
    },
    // {
    //   id: 3,
    //   title: 'Customer Return',
    //   icon: 'svg-for-sales',
    //   content: Customer_return,
    //   description: `Your total customer return are ${Customer_return} till now`,
    // },
    // {
    //   id: 4,
    //   title: 'Courier Return',
    //   icon: 'svg-for-active-now',
    //   content: Courier_return,
    //   description: `Your total courier return are ${Courier_return} till now`,
    // },
  ];
};

export default function Statistics() {
  const [statisticData, setStatisticData] = useState<Partial<StatsType>>({});
  const [isLoading, setLoading] = useState(true);
  const searchParam = useSearchParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      // const flipkartBy = searchParam.has('mp') ? searchParam.get('mp')! : 'All';
      const { data, isSuccess } = await dashboard.getStatisticData();
      if (isSuccess) {
        setStatisticData(data ?? {});
      }
      setLoading(false);
    })();
  }, [searchParam]);

  if (isLoading) {
    return <Loader className="h-auto col-span-full row-span-full " />;
  }

  return convertIntoStatisticsData(statisticData).map((stats: any) => (
    <DashCart
      key={stats.title}
      description={stats.description}
      title={stats.title}
      content={stats.content}
      Icon={stats.icon}
      originalValue={stats.originalValue}
    />
  ));
}
