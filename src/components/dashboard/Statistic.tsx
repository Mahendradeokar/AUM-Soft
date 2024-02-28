'use client';

import { dashboard } from '@/requests';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/shared';
import DashCart from './card';

export default function Statistics() {
  const [statisticData, setStatisticData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, isSuccess } = await dashboard.getStatisticData();
      if (isSuccess) {
        setStatisticData(data);
      }
      setLoading(false);
    })();
  }, []);

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
