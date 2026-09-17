import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import { Admin, FetchAdminsResponse } from "../../types/AdminTypes";

export interface User {
  _id: number;
  name: string;
  email: string;
  phoneNumber:string;
  role:string
}

export interface SignUpCredentials {
  name:string,
  email: string;
  password: string;
  passwordConfirm:string,
  phoneNumber:string,
  role:string
}


export interface LoginCredentials {
  email: string;
  password: string;
}


export interface SignUpCredentials {
  name:string,
  email: string;
  password: string;
  passwordConfirm:string,
  phoneNumber:string,
  role:string
}
  

export interface AuthResponse {
  user: User;
  token: string;
}
export const adminsApi = createApi({
  reducerPath: "adminsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    /*fetchUsers: builder.query<any, void>({
      query: () => "/login",
      providesTags: "Users",
    }),
*/

    signUpUser: builder.mutation<AuthResponse,SignUpCredentials>({
      query: (newAdmin) => ({
        url: "/signup",
        method: "POST",
        body: newAdmin,
      }),
    
      invalidatesTags: ["Users"],//التاغ التي ستتغير
    }),

      
    loginUser: builder.mutation<AuthResponse,LoginCredentials>({
      query: (newAdmin) => ({
        url: "/login",
        method: "POST",
        body: newAdmin,
      }),
    
      invalidatesTags: ["Users"],//التاغ التي ستتغير
    }),

    getAuthUser: builder.mutation<any,void>({
      query: () => ({
        url: "/getM",
        method: "GET",
        
      }),
    
      invalidatesTags: ["Users"],//التاغ التي ستتغير
    }),
    
    getUser: builder.query<any,void>({
      query: () => ({
        url: "/getMe",
        method: "GET",
        providesTags:["Users"]
        
      }),
      }),

    updateAuthUser: builder.mutation<Partial<User>,Partial<User>>({
      query: (updatedUser) => ({
        url: "/updateMe",
        method: "PATCH",
        body:updatedUser
        
      }),
    
      invalidatesTags: (result)=>[{type : "Users" , id:result?._id}]
    }),
    
    /*editAdmin: builder.mutation<Admin, { id: number; data: Partial<Admin> }>({
      query: ({ id, data }) => ({
        url: `/admins/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),

    deleteAdmin: builder.mutation<{ admin: { id: number } }, number>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),

    editPassword: builder.mutation<{ id: number; admin: Admin }, { id: number; password: string }>({
      query: ({ id, password }) => ({
        url: `/admins/${id}/password`,
        method: "PUT",
        body: { password },
      }),
      invalidatesTags: ["Admins"],
    }),

    changeStatus: builder.mutation<number, number>({
      query: (id) => ({
        url: `/admins/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Admins"],
    }),*/
  }),
});

export const {
  useSignUpUserMutation,
  useLoginUserMutation,
  useGetAuthUserMutation,
  useGetUserQuery,
  useUpdateAuthUserMutation
 /* useFetchAdminsQuery,
  ,
  useEditAdminMutation,
  useDeleteAdminMutation,
  useEditPasswordMutation,
  useChangeStatusMutation,*/
} = adminsApi;