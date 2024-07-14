export const ReturnType = {
  CURRIER: 'CURRIER_RETURN',
  CUSTOMER: 'CUSTOMER_RETURN',
} as const;

export type ReturnTypeUnion = (typeof ReturnType)[keyof typeof ReturnType];
