import { IUser, LoginResult } from "../types/user.type";
import API from "./request";

export const apiLogin = async (params: IUser) =>
  await API.post<LoginResult>("/cs/api/auth/login/", params).then((res) => {
    return res.data;
  });
export const apiLogOut = async () => {
  const res = await API.post("/cs/api/auth/logout/");
  return res;
};
