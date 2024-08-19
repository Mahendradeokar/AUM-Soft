export const ReturnOrderType = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  RETURN: 'RETURN',
  ISSUE_ORDERS: 'ISSUE_ORDERS',
  CANCEL_ORDERS: 'CANCEL_ORDERS',
} as const;
export type ReturnOrderUnionType = keyof typeof ReturnOrderType;

export const OrderReturnType = {
  CURRIER: 'currierReturn',
  CUSTOMER: 'customerReturn',
} as const;

export type OrderReturnTypeUnion = (typeof OrderReturnType)[keyof typeof OrderReturnType];
