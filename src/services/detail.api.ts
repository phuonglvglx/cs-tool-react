import { getLocalStorageValue } from "../utils/utils";
import API from "./request";

const header = {
    "Authorization": `Token ${getLocalStorageValue('token')}`
  }

export const apiDetail = async (page: string, id: string) => {
    const res = await API.get(`/promotion/api/${page}/${id}/`, {headers: header});
    return res.data;
};
