import { ITransaction } from "../types/transaction.type";
import API from "./request";

export const apiListTransaction = async () => {
  const res = await API.get<ITransaction[]>("/cs/api/transaction/");
  return res.data;
};