import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { setToken } from "../services/request";
import { apiLogin, apiLogOut } from "../services/user.api";
import { UserState, Locale, IUser } from "../types/user.type";
import { getLocalStorageValue } from "../utils/utils";

const initialState: UserState = {
  locale: (localStorage.getItem("locale")! || "en_US") as Locale,
  logged: localStorage.getItem("token") ? true : false,
  key: getLocalStorageValue('token') || "",
  collapsed: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      const { key } = action.payload;
      if (key) {
        localStorage.setItem("auth", action.payload.key || "");
      }

      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;

export const loginAsync = async (payload: IUser) => {
  return async (dispatch: Dispatch) => {
    const res = await apiLogin(payload);
    console.log(res)
    if (res) {
      localStorage.setItem('token', res.key);
      setToken(res.key);
      dispatch(
        setUserItem({
          logged: true,
        })
      );
      return res;
    }
    return false;
  };
};

export const logoutAsync = async () => {
  return async (dispatch: Dispatch) => {
    const res:any = await apiLogOut();
    if (res.status === 200) {
      localStorage.clear();
      // dispatch(
      //   setUserItem({
      //     logged: false
      //   })
      // );
      return true;
    }
    return false;
  };
};
