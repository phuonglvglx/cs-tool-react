import { message } from "antd";
import { ITransaction } from "../types/transaction.type";
import API from "./request";

export const apiListTransaction = async (limit: number, skip: number) => {
  const res:any = await API.get<ITransaction[]>(`/cs/api/transaction/search/?limit=${limit}&skip=${skip}`);
  return res
};

export const apiInfoUserTransaction = async(id:any)=>{
  const res:any = await API.get(`/cs/api/user/info/?user_id=${id}`);
  if(res.status === 200){
    return res.data.data;
  }else{
    message.error({content: 'error'})
  }
}

// [GET] https://api.dev.icankids.com.vn/cs/api/user/info/?user_id=36a4c966-2651-492f-b9b8-060dbc347f7c