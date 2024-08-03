'use client';

import { useState } from 'react';
import CompleteOrderTable from './CompleteOrderTable';
import PendingOrderTable from './PendingOrderTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ReturnOrderTable from './ReturnOrderTable';
import OrderIssuesTable from './OrderIssuesTable';
import { ReturnOrderUnionType } from '../../../types';

type TabName = ReturnOrderUnionType;
type Props = {
  marketplaceId: string | null;
};

export default function DataTable({ marketplaceId }: Props) {
  const [activeTab, setActiveTab] = useState<TabName>('COMPLETED');
  return (
    <Tabs
      defaultValue="COMPLETED"
      className="w-full"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabName)}
    >
      <TabsList>
        <TabsTrigger value="COMPLETED">Completed Orders</TabsTrigger>
        <TabsTrigger value="RETURNED">Returned Orders</TabsTrigger>
        <TabsTrigger value="PENDING">Pending Orders</TabsTrigger>
        <TabsTrigger value="ISSUE_ORDERS">Order Issues</TabsTrigger>
      </TabsList>
      <TabsContent value="COMPLETED">
        <CompleteOrderTable marketplaceId={marketplaceId} />
      </TabsContent>
      <TabsContent value="RETURNED">
        <ReturnOrderTable marketplaceId={marketplaceId} />
      </TabsContent>
      <TabsContent value="PENDING">
        <PendingOrderTable marketplaceId={marketplaceId} />
      </TabsContent>
      <TabsContent value="ISSUE_ORDERS">
        <OrderIssuesTable marketplaceId={marketplaceId} />
      </TabsContent>
    </Tabs>
  );
}
