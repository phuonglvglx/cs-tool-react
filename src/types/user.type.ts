export interface IUser {
  username: string;
  password: string;
}

export interface LoginResult {
  key: string;
}

export interface LogoutParams {
  key?: string;
}

export interface LogoutResult {}

export type Locale = "vi_VN" | "en_US";

export interface UserState {
  key?: string;
  logged: boolean;
  collapsed: boolean;
  locale: Locale;
}

export interface IUserResult {
  pk: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  groups: string[];
}

export interface IInfoUser {
  id: string;
  phone: string;
  email: string;
  date_joined: string;
  first_name: string;
  last_name: string;
  role: number;
  gender: number;
  is_confirm_email: true;
}
