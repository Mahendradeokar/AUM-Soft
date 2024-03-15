'use client';

import { dashboard } from '@/requests';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/shared';
import { useSearchParams } from 'next/navigation';
import DashCart from './card';

export default function Statistics() {
  const [statisticData, setStatisticData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const searchParam = useSearchParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const flipkartBy = searchParam.has('mp') ? searchParam.get('mp')! : 'All';
      const { data, isSuccess } = await dashboard.getStatisticData({
        flipkart_by: flipkartBy,
      });
      if (isSuccess) {
        setStatisticData(data);
      }
      setLoading(false);
    })();
  }, [searchParam]);

  if (isLoading) {
    return <Loader className="h-auto col-span-full row-span-full " />;
  }

  return statisticData.map((stats: any) => (
    <DashCart
      key={stats.title}
      description={stats.percentageChange}
      title={stats.title}
      content={stats.totalValue}
      Icon={stats.icon}
    />
  ));
}
