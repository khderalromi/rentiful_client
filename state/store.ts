import { configureStore } from "@reduxjs/toolkit";
import { adminsApi } from "./Auth/AuthSlice"; // تأكد من صحة مسار ملف adminsApi بالنسبة لملف store

export const store = configureStore({
  reducer: {
    // ربط الـ API بالـ Store
    [adminsApi.reducerPath]: adminsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;