export const ReturnType = {
  CURRIER: 'CURRIER_RETURN',
  CUSTOMER: 'CUSTOMER_RETURN',
} as const;

export type ReturnTypeUnion = (typeof ReturnType)[keyof typeof ReturnType];

// Define types for data
export interface Order {
  _id: string;
  suborder_number: string;
  type_of_return: number;
}
