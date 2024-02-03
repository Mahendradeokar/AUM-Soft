import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  order_item_id: z.string(),
  flipkart_status: z.string(),
  status: z.string(),
  order_date: z.string(),
  sku: z.string(),
  quantity: z.number(),
  paymentType: z.string(),
  commission: z.number(),
  shippingFee: z.number(),
  fixedFee: z.number(),
  reverseShippingFee: z.number(),
  collectionFee: z.number(),
  net_profit: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
