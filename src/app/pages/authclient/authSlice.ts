// 1 chạy file này trước  => lần đầu chạy web 
// 2 sotore 
// 3 gắn vào thẻ dispatched 
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  authState: boolean;
  count : number
}

const initialState: IAuthState = {
  authState: false,
  count : 0 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    countang: (state, action: PayloadAction<number>) => {
      // Thực hiện logic đăng nhập ở đây và cập nhật trạng thái nếu cần
      state.count +=1
    },
  },
});

export const { setAuthState , countang} = authSlice.actions; // đây là action 
export const authReducer = authSlice.reducer; // đây là reducer 