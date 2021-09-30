import { message } from "antd";
import { IUser } from "../types/user.type";
import { getLocalStorageValue } from "../utils/utils";
import API from "./request";

const header = {
  "Authorization": `Token ${getLocalStorageValue('token')}`
}

export const apiLogin = async (params: IUser) => {
  const res = await API.post("/cs/api/auth/login/", params);
  if (res.status === 200) {
    return res.data;
  } else {
    message.error({ content: "Error!" });
  }
};

export const apiInfoUser = async () => {
  const res = await API.get("/cs/api/auth/user/", {headers: header});
  return res;
};

export const apiLogOut = async () => {
  const res = await API.post("/cs/api/auth/logout/");
  return res;
};
