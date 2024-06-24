export const ReturnOrderType = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;
export type ReturnOrderUnionType = keyof typeof ReturnOrderType;
