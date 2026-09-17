"use client";

import { useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

// 1. استيراد جميع الـ Reducers والـ APIs بالشكل الصحيح
import globalReducer from "../state/index";
//import authReducer from "../state/Auth/AuthSlice"; // 👈 تم فك التعليق
import { api } from "../state/api";
import { adminsApi } from "../state/Auth/AuthSlice"; // 👈 إضافتها إذا كانت منفصلة عن api

/* REDUX STORE */
const rootReducer = combineReducers({
  global: globalReducer,
  //auth: authReducer,
  [api.reducerPath]: api.reducer,
  [adminsApi.reducerPath]: adminsApi.reducer, // 👈 ربط adminsApi
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(adminsApi.middleware), // 👈 ربط الميدلوير لـ adminsApi
  });
};

/* REDUX TYPES & HOOKS */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}