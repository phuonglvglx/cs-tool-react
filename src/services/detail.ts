import API from "./request";

export const apiDetail = async (page: string, id: string) => {
    const res = await API.get(`/promotion/api/${page}/${id}/`);
    return res.data;
};
