import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authState } from "../types/types";

const initialSlice: authState = {
  authTokens: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")!)
    : null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialSlice,
  reducers: {
    login(state, action: PayloadAction<{ accessToken: string }>) {
      const { accessToken } = action.payload;
      state.authTokens = { accessToken };
    },
    logout(state) {
      state.authTokens = null;
      state.user = null;
      localStorage.removeItem("authTokens");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
