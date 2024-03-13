import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const orderSchema = z.object({
  order_item_id: z.string(),
  seller_sku: z.string(),
  sale_amount_rs: z.number(),
  net_bank_settlement: z.number(),
  protection_fund_rs: z.number(),
  refund_rs: z.number(),
  commission_rs: z.number(),
  fixed_fee_rs: z.number(),
  collection_fee_rs: z.number(),
  shipping_fee_rs: z.number(),
  reverse_shipping_fee_rs: z.number(),
  order_date: z.number(),
  quantity: z.number(),
  return_type: z.number(),
  shopsy_order: z.number(),
});

export type Order = z.infer<typeof orderSchema>;
