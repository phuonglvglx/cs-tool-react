import axios from "axios";
import { navigate } from "@reach/router";
import { message } from "antd";

axios.defaults.baseURL = process.env.API || "https://api.dev.icankids.com.vn";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        localStorage.removeItem("token");
        navigate("/login");
        break;
      case 404:
      case 403:
        navigate("/");
        break;
      case 500:
        message.error({content: "500 Internal Server Error"})
        console.log(500);
    }
    return Promise.reject(error.response);
  }
);

export function setToken(token: string | null) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default axios;
