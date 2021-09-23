export interface IProduction {
  id: string;
  code: string;
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
}

export interface IProductionParams {
  code: string;
  name: string;
  description: string;
}

export interface IProductionUpdateParams{
  id: string;
  code: string;
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
}
