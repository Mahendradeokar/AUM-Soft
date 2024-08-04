'use client';

import { ComponentProps, useState } from 'react';
import { objectEntities } from '@/lib/utils';
import CompleteOrderTable from './CompleteOrderTable';
import PendingOrderTable from './PendingOrderTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ReturnOrderTable from './ReturnOrderTable';
import OrderIssuesTable from './OrderIssuesTable';
import { ReturnOrderUnionType } from '../../../types';
import { Badge } from '../ui/badge';

type TabName = ReturnOrderUnionType;
type Props = {
  marketplaceId: string | null;
};

type CountDetailsState = { tab: TabName; count: number };

function DisplayCount({ children }: ComponentProps<'div'>) {
  return (
    <Badge variant="outline" className="dark:text-primary dark:border-primary bg-primary text-white dark:bg-secondary">
      {children}
    </Badge>
  );
}

const renderTabTriggers = ({ orderCountDetails }: { orderCountDetails: CountDetailsState }) => {
  const config: Partial<Record<TabName, { label: string }>> = {
    COMPLETED: {
      label: 'Completed Orders',
    },
    RETURN: {
      label: 'Returned Orders',
    },
    PENDING: {
      label: 'Pending Orders',
    },
    ISSUE_ORDERS: {
      label: 'Order Issues',
    },
  };

  return objectEntities(config).map(([key, value]) => {
    return (
      <TabsTrigger value={key}>
        <span>{value?.label}</span>
        {orderCountDetails.tab === key && <DisplayCount>{orderCountDetails.count}</DisplayCount>}
      </TabsTrigger>
    );
  });
};

export default function DataTable({ marketplaceId }: Props) {
  const [activeTab, setActiveTab] = useState<TabName>('COMPLETED');
  const [totalOrderCountDetails, setTotalOrderCountDetails] = useState<CountDetailsState>({
    tab: 'COMPLETED',
    count: 0,
  });
  return (
    <Tabs
      defaultValue="COMPLETED"
      className="w-full"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabName)}
    >
      {/* // TODO Make this dyanamic render */}
      <TabsList>{renderTabTriggers({ orderCountDetails: totalOrderCountDetails })}</TabsList>
      <TabsContent value="COMPLETED">
        <CompleteOrderTable
          marketplaceId={marketplaceId}
          setOrderCount={(count) => setTotalOrderCountDetails({ count, tab: 'COMPLETED' })}
        />
      </TabsContent>
      <TabsContent value="RETURN">
        <ReturnOrderTable
          marketplaceId={marketplaceId}
          setOrderCount={(count) => setTotalOrderCountDetails({ count, tab: 'RETURN' })}
        />
      </TabsContent>
      <TabsContent value="PENDING">
        <PendingOrderTable
          marketplaceId={marketplaceId}
          setOrderCount={(count) => setTotalOrderCountDetails({ count, tab: 'PENDING' })}
        />
      </TabsContent>
      <TabsContent value="ISSUE_ORDERS">
        <OrderIssuesTable
          marketplaceId={marketplaceId}
          setOrderCount={(count) => setTotalOrderCountDetails({ count, tab: 'ISSUE_ORDERS' })}
        />
      </TabsContent>
    </Tabs>
  );
}
