import { IInfoUser } from "./user.type";

interface IProduct {
  id: number;
  name: string;
  selling_price: number;
}

interface IDiscount {
  value: number;
  promo_code: null;
  type: string;
}

export interface ITransaction {
  id: number;
  status: string;
  product: IProduct;
  invoice_no: string;
  client: {
    type: string;
  };
  payment_type: string;
  payment_method: string;
  discount: IDiscount;
  gateway: {
    type: string;
    payment_id: string;
  };
  user: IInfoUser;
  created_at: string;
  last_modified_at: string;
  total_amount: number;
  expiry_date: null;
  description: string;
  refund: {
    id: number;
    description: null;
  };
  type: string;
}

export interface ISubs {
  auto_renew: boolean;
  auto_renew_gateway: string;
  created_at: string;
  end_at: string;
  is_active: boolean;
  last_transaction_id: 3123;
  plan: { id: number; name: string };
  product: { id: number; name: string };
  start_at: string;
}
