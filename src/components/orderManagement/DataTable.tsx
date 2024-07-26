'use client';

import { useState } from 'react';
import CompleteOrderTable from './CompleteOrderTable';
import PendingOrderTable from './PendingOrderTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ReturnOrderTable from './ReturnOrderTable';
import OrderIssuesTable from './OrderIssuesTable';

type TabName = 'completeOrders' | 'pendingOrders' | 'scannedOrders' | 'orderIssues';
type Props = {
  marketplaceId: string | null;
};

export default function DataTable({ marketplaceId }: Props) {
  const [activeTab, setActiveTab] = useState<TabName>('completeOrders');
  return (
    <Tabs
      defaultValue="completeOrders"
      className="w-full"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabName)}
    >
      <TabsList>
        <TabsTrigger value="completeOrders">Completed Orders</TabsTrigger>
        <TabsTrigger value="returnOrders">Returned Orders</TabsTrigger>
        <TabsTrigger value="pendingOrders">Pending Orders</TabsTrigger>
        <TabsTrigger value="orderIssues">Order Issues</TabsTrigger>
      </TabsList>
      <TabsContent value="completeOrders">
        <CompleteOrderTable marketplaceId={marketplaceId} />
      </TabsContent>
      <TabsContent value="returnOrders">
        <ReturnOrderTable marketplaceId={marketplaceId} />
      </TabsContent>
      <TabsContent value="pendingOrders">
        <PendingOrderTable marketplaceId={marketplaceId} />
      </TabsContent>
      <TabsContent value="orderIssues">
        <OrderIssuesTable marketplaceId={marketplaceId} />
      </TabsContent>
    </Tabs>
  );
}
