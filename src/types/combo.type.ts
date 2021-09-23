export interface ICombo {
  id: number;
  code: string;
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
  products?: string[]
;}

export interface IComboCreate {
  code: string;
  name: string;
  description: string;
  products: string[];
}

export interface IComboUpdate {
  code: string;
  created_date: string;
  description: string;
  id: string;
  name: string;
  products: string[];
  updated_date: string;
}
