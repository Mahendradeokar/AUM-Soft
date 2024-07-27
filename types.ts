export const ReturnOrderType = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  RETURN: 'RETURN',
  ISSUE_ORDERS: 'ISSUE_ORDERS',
} as const;
export type ReturnOrderUnionType = keyof typeof ReturnOrderType;
