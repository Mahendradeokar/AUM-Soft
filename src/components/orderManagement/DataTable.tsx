'use client';

import { ComponentProps, useCallback, useState } from 'react';
import { objectEntities } from '@/lib/utils';
import CompleteOrderTable from './CompleteOrderTable';
import PendingOrderTable from './PendingOrderTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ReturnOrderTable from './ReturnOrderTable';
import OrderIssuesTable from './OrderIssuesTable';
import { ReturnOrderUnionType } from '../../../types';
import { Badge } from '../ui/badge';
import CancelOrders from './CancelOrdersTable';

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
  const config: Record<TabName, { label: string }> = {
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
    CANCEL_ORDERS: {
      label: 'Cancel Orders',
    },
  };

  return objectEntities(config).map(([key, value]) => {
    return (
      <TabsTrigger value={key} key={key} className="flex gap-2">
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

  const setCompleteOrderCount = useCallback(
    (count: number) => setTotalOrderCountDetails({ count, tab: 'COMPLETED' }),
    [setTotalOrderCountDetails],
  );
  const setReturnOrdersCount = useCallback(
    (count: number) => setTotalOrderCountDetails({ count, tab: 'RETURN' }),
    [setTotalOrderCountDetails],
  );
  const setPendingOrderCount = useCallback(
    (count: number) => setTotalOrderCountDetails({ count, tab: 'PENDING' }),
    [setTotalOrderCountDetails],
  );
  const setIssueOrderCount = useCallback(
    (count: number) => setTotalOrderCountDetails({ count, tab: 'ISSUE_ORDERS' }),
    [setTotalOrderCountDetails],
  );

  const setCancelOrderCount = useCallback(
    (count: number) => setTotalOrderCountDetails({ count, tab: 'CANCEL_ORDERS' }),
    [setTotalOrderCountDetails],
  );

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
        <CompleteOrderTable marketplaceId={marketplaceId} setOrderCount={setCompleteOrderCount} />
      </TabsContent>
      <TabsContent value="RETURN">
        <ReturnOrderTable marketplaceId={marketplaceId} setOrderCount={setReturnOrdersCount} />
      </TabsContent>
      <TabsContent value="PENDING">
        <PendingOrderTable marketplaceId={marketplaceId} setOrderCount={setPendingOrderCount} />
      </TabsContent>
      <TabsContent value="ISSUE_ORDERS">
        <OrderIssuesTable marketplaceId={marketplaceId} setOrderCount={setIssueOrderCount} />
      </TabsContent>
      <TabsContent value="CANCEL_ORDERS">
        <CancelOrders marketplaceId={marketplaceId} setOrderCount={setCancelOrderCount} />
      </TabsContent>
    </Tabs>
  );
}
