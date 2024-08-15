
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {LOCALES} from './type'
export interface IAuthState {
    languageState:string
}

const initialState: IAuthState = {
  languageState: LOCALES.ENGLISH 
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguae: (state, action: PayloadAction<string>) => {
      state.languageState = action.payload;
    },
   
  },
});

export const { setLanguae } = languageSlice.actions; // đây là action 
export const LanguageReducer = languageSlice.reducer; // đây là reducer 