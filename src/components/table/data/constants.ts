import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const labels = [
  {
    value: 'bug',
    label: 'Cancelled',
  },
  {
    value: 'feature',
    label: 'Returned',
  },
  {
    value: 'documentation',
    label: 'Completed',
  },
];

export const statuses = [
  {
    value: 'COURIER_RETURN',
    label: 'Courier Returned',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'DELIVERED',
    label: 'Delivered',
    icon: CircleIcon,
  },
  {
    value: 'ON_GOING',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  {
    value: 'CANCELED',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
  {
    value: 'CUSTOMER_RETURN',
    label: 'Returned',
    icon: CrossCircledIcon,
  },
  {
    value: 'RETURNED',
    label: 'Returned',
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];

const orderFields: any = {
  order_item_id: { name: 'Order Item Id', id: 'order_item_id' },
  seller_sku: { name: 'Seller SKU', id: 'seller_sku' },
  sale_amount_rs: { name: 'Sale Amount', id: 'sale_amount_rs' },
  net_bank_settlement: { name: 'Profit', id: 'net_bank_settlement' },
  protection_fund_rs: { name: 'Protection Fund', id: 'protection_fund_rs' },
  refund_rs: { name: 'Refund', id: 'refund_rs' },
  commission_rs: { name: 'Commission', id: 'commission_rs' },
  fixed_fee_rs: { name: 'Fixed Fee', id: 'fixed_fee_rs' },
  collection_fee_rs: { name: 'Collection Fee', id: 'collection_fee_rs' },
  shipping_fee_rs: { name: 'Shipping Fee', id: 'shipping_fee_rs' },
  reverse_shipping_fee_rs: { name: 'Reverse Shipping', id: 'reverse_shipping_fee_rs' },
  order_date: { name: 'Order Date', id: 'order_date' },
  quantity: { name: 'Quantity', id: 'quantity' },
  return_type: { name: 'Status', id: 'return_type' },
  shopsy_order: { name: 'Shopsy Order', id: 'shopsy_order' },
};

export default orderFields;
