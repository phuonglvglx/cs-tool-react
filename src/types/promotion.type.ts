export interface IPromotion {
  id: string;
  code: string;
  name: string;
  description: string;
  expected_date: string;
  code_generates_date: string;
  amount_of_codes: number;
  code_duration: number;
  redemption_type: string;
  redemption_value: string;
  discount_type: string;
  discount_value: number;
  max_flat_discount_value: number;
  flat_discount_value?: number;
  gift_type: string;
  promotion_product: string;
  promotion_combo: string;
  starts_date: string;
  expires_date: string;
  expected_hour: string;
  expires_hour: string;
  status: string;
  state: string;
  kind: string;
  created_date: string;
  updated_date: string;
  updated_reason: string;
  eligible_rules: [
    {
      name: string;
      type: string;
      value: string[];
    },
    {
      name: string;
      value: number;
    }
  ];
  target_audiences: [];
  code_generation_formula: {
    code_prefix: string;
    code_pattern: string;
    code_postfix: string;
    character_set: string;
  };
  internal: boolean;
}

export interface IPromotionParams {
  code: string;
  name: string;
  redemption_type?: string;
  redemption_value?: string;
  gift_type?: string;
  promotion_product?: string;
  promotion_combo?: string;
  discount_type?: string;
  max_flat_discount_value?: number;
  flat_discount_value?: number;
  code_duration: number;
  amount_of_codes: number;
  expected_date: string;
  expires_date: string;
  expected_hour: string;
  expires_hour: string
}
