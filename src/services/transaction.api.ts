import { message } from "antd";
import { IRefundParams, ITransaction } from "../types/transaction.type";
import API from "./request";

export const apiListTransaction = async (limit: number, skip: number, keyword: any) => {
  const res: any = await API.get<ITransaction[]>(
    `/cs/api/transaction/search/?limit=${limit}&skip=${skip}&keyword=${keyword}`
  );
  return res;
};

export const apiInfoUserTransaction = async (id: any) => {
  const res: any = await API.get(`/cs/api/user/info/?user_id=${id}`);
  if (res.status === 200) {
    return res.data.data;
  } else {
    message.error({ content: "error" });
  }
};

export const apiRefundTransaction = async (params: IRefundParams) => {
  const res: any = await API.post("/cs/api/transaction/refund/", params);
  return res.data;
};

// export const apiSearchTransaction = async (size: number, skip: number, keyword: any)=>{
//   const res:any = await API.get<ITransaction[]>(`/cs/api/transaction/search/?limit=${size}&skip=${skip}&keyword=${keyword}`);
//   return res.data;
// }

// [GET] https://api.dev.icankids.com.vn/cs/api/user/info/?user_id=36a4c966-2651-492f-b9b8-060dbc347f7c
