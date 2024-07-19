export const ReturnOrderType = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  RETURN: 'RETURN',
} as const;
export type ReturnOrderUnionType = keyof typeof ReturnOrderType;
