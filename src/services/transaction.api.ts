import { message } from "antd";
import { IRefundParams, ITransaction } from "../types/transaction.type";
import { getLocalStorageValue } from "../utils/utils";
import API from "./request";

const header = {
  Authorization: `Token ${getLocalStorageValue("token")}`,
};

export const apiListTransaction = async (limit: number, skip: number) => {
  const res: any = await API.get<ITransaction[]>(
    `/cs/api/transaction/search/?limit=${limit}&skip=${skip}`,
    { headers: header }
  );
  return res;
};

export const apiInfoUserTransaction = async (id: any) => {
  const res: any = await API.get(`/cs/api/user/info/?user_id=${id}`, {
    headers: header,
  });
  if (res.status === 200) {
    return res.data.data;
  } else {
    message.error({ content: "error" });
  }
};

export const apiRefundTransaction = async (params: IRefundParams) => {
  const res: any = await API.post("/cs/api/transaction/refund/", params, {
    headers: header,
  });
  return res.data;
};

export const apiSearchTransaction = async (
  size: number,
  skip: number,
  keyword: any,
  phone: any
) => {
  const res: any = await API.get<ITransaction[]>(
    `/cs/api/transaction/search/?limit=${size}&skip=${skip}&keyword=${keyword}&phone=${phone}`,
    { headers: header }
  );
  return res.data;
};

// /cs/api/transaction/search/?limit=10&skip=0&keyword=abc&phone=

// [GET] https://api.dev.icankids.com.vn/cs/api/user/info/?user_id=36a4c966-2651-492f-b9b8-060dbc347f7c
