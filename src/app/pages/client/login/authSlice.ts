// 1 chạy file này trước  => lần đầu chạy web 
// 2 sotore 
// 3 gắn vào thẻ dispatched 
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  authState: boolean;
}

const initialState: IAuthState = {
  authState: false,
};

export const authLogin = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authLogin.actions; // đây là action 
export const authLoginReducer = authLogin.reducer; // đây là reducer 