import { CheckCircledIcon, CrossCircledIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export const TOKEN = 'ST'; // session token

export const MARKETPLACE_TYPE = {
  flipkart: 'Flipkart',
  amazon: 'Amazon',
  meesho: 'Meesho',
};

export const FLIPKART_STATUS = {
  courier_return: {
    value: 'COURIER_RETURN',
    label: 'Courier Returned',
    icon: QuestionMarkCircledIcon,
  },
  completed: {
    value: 'COMPLETED',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  customer_return: {
    value: 'CUSTOMER_RETURN',
    label: 'Returned',
    icon: CrossCircledIcon,
  },
  replacement: {
    value: 'Replacement',
    label: 'Replacement',
    icon: CrossCircledIcon,
  },
};

export const MONTH_LIST = [
  { name: 'January', number: 1 },
  { name: 'February', number: 2 },
  { name: 'March', number: 3 },
  { name: 'April', number: 4 },
  { name: 'May', number: 5 },
  { name: 'June', number: 6 },
  { name: 'July', number: 7 },
  { name: 'August', number: 8 },
  { name: 'September', number: 9 },
  { name: 'October', number: 10 },
  { name: 'November', number: 11 },
  { name: 'December', number: 12 },
];

export const orderFields: any = {
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
