export type ModalType = 'order' | 'marketplace' | 'payment'; // Define types for data

export interface Order {
  _id: string;
  sub_order_no: string;
  type_of_return: number;
  created_at: number;
  issue: string;
  order_price: number;
  order_status: string;
  order_date: string;
}
