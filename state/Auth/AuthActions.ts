import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002", // رابط سيرفر Express الخاص بك
  }),
  endpoints: (builder) => ({
    // Action تسجيل الدخول
    login: builder.mutation({
      query: (credentials) => ({
        url: "http://localhost:3002/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Action إنشاء حساب جديد
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

// RTK Query تُنشئ لك هذه الـ Hooks تلقائياً لاستخدامها في الـ Components
export const { useLoginMutation, useSignUpMutation } = api;