import axios from "axios";
import { navigate } from '@reach/router';

axios.defaults.baseURL = process.env.API || "https://api.dev.icankids.com.vn";
// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers["Access-Control-Allow-Headers"] = "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        navigate('/login');
        break;
      case 404:
      case 403:
        navigate('/');
        break;
    }
    return Promise.reject(error.response);
  },
);

export function setToken(token: string | null) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default axios;
