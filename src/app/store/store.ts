// 2 chạy file này
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "../pages/authclient/authSlice";
import {LanguageReducer} from '../language/languageSlice' ;
import {authLoginReducer} from '../pages/client/login/authSlice';
export const store = configureStore({
  reducer: { auth: authReducer , languages: LanguageReducer ,login : authLoginReducer},
  // reducer: {  language: LanguageReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;