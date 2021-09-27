import { navigate } from "@reach/router";
import { message } from "antd";
import AppURL from "../routes/AppURL";
import { IUser, LoginResult } from "../types/user.type";
import API from "./request";

export const apiLogin = async (params: IUser) => {
  const res = await API.post("/cs/api/auth/login/", params);
  if (res.status === 200) {
    return res.data;
  } else {
    message.error({ content: "Error!" });
  }
};

export const apiInfoUser = async () => {
  const res = await API.get("/cs/api/auth/user/");
  if (res.status === 200) {
    return res.data;
  } else {
    localStorage.removeItem('token');
    navigate(AppURL.login());
  }
};

export const apiLogOut = async () => {
  const res = await API.post("/cs/api/auth/logout/");
  return res;
};
