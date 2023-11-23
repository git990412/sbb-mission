import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";

type LoginState = {
  status: boolean;
};

const initialState: LoginState = {
  status: false,
};

export const LoginSlice = createSlice({
  name: "Login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { setLogin } = LoginSlice.actions;

export const selectStatus = (state: RootState) => state.LoginStatus.status;

export default LoginSlice.reducer;
