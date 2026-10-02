import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";
import { FiltersState, Property } from "..";
import { cleanParams } from "@/lib/utils";
import { id } from "zod/v4/locales";
//import { Admin, FetchAdminsResponse } from "../../types/AdminTypes";

export interface User {
  _id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  role: string;
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
  tagTypes: ["Users", "Properties", "Tenants","PropertyDtails"],
  endpoints: (builder) => ({
    /*fetchUsers: builder.query<any, void>({
      query: () => "/login",
      providesTags: "Users",
    }),
*/

    signUpUser: builder.mutation<AuthResponse, SignUpCredentials>({
      query: (newAdmin) => ({
        url: "/signup",
        method: "POST",
        body: newAdmin,
      }),

      invalidatesTags: ["Users"], //التاغ التي ستتغير
    }),

    loginUser: builder.mutation<AuthResponse, LoginCredentials>({
      query: (newAdmin) => ({
        url: "/login",
        method: "POST",
        body: newAdmin,
      }),

      invalidatesTags: ["Users"], //التاغ التي ستتغير
    }),

    getUser: builder.query<any, void>({
      query: () => ({
        url: "/getMe",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    updateAuthUser: builder.mutation<Partial<User>, Partial<User>>({
      query: (updatedUser) => ({
        url: "/updateMe",
        method: "PATCH",
        body: updatedUser,
      }),

      invalidatesTags: (result) => [{ type: "Users", id: result?._id }],
    }),

    getProperties: builder.query<
      any,
      Partial<FiltersState> & { favouriteIds?: number[] }
    >({
      query: (filters) => {
        const latlngParam = filters.coordinates?.length === 2 
      ? `${filters.coordinates[1]},${filters.coordinates[0]}` 
      : undefined;
        const params = cleanParams({
          city: filters.city,
          priceMin: filters.priceRange?.[0],
          priceMax: filters.priceRange?.[1],
          beds: filters.beds,
          baths: filters.baths,
          propertyType: filters.propertyType,
          squareFeetMin: filters.squareFeet?.[0],
          squareFeetMax: filters.squareFeet?.[1],
          amenities: Array.isArray(filters.amenities)
            ? filters.amenities?.join(",")
            : filters?.amenities,
          availableFrom: filters.availableFrom,
          favouriteId: filters.favouriteIds?.join(","),
          latlng: latlngParam,
          distance: latlngParam ? 200 : undefined, 
          unit: latlngParam ? "km" : undefined,
        });
        return { url: "properties/filter", params };
      },

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map((item) => ({
                type: "Properties" as const,
                id: item._id,
              })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
    }),

    getProperty: builder.query<any, { propertyId: string }>({
      query: ( {propertyId} ) => ({
        url: `/properties/property/${propertyId}`,
        method: "GET"
      }),
      providesTags: (result , error, _id) => {
        console.log(error);
        return [{ type: "PropertyDtails", _id }];
      }
    }),

    addFavouriteProperty: builder.mutation<any, { propertyId: string }>({
      query: ({ propertyId }) => ({
        url: `/tenant/addFav/${propertyId}`,
        method: "POST",
      }),

      invalidatesTags: (result) => {
        console.log("resuuultttt 11111", result.tenant._id);
        return [
          { type: "Users", _id: result?.tenant._id },
          { type: "Properties", id: "LIST" },
        ];
      },
    }),
    removeFavouriteProperty: builder.mutation<any, { propertyId: string }>({
      query: ({ propertyId }) => ({
        url: `/tenant/deleteFav/${propertyId}`,
        method: "PATCH",
      }),

      invalidatesTags: (result) => {
        console.log("resuuultttt", result.updatedFavorites.tenant);
        return [
          { type: "Users", _id: result?.updatedFavorites.tenant._id },
          { type: "Properties", id: "LIST" },
        ];
      },
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLoginUserMutation,

  useGetUserQuery,
  useUpdateAuthUserMutation,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useAddFavouritePropertyMutation,
  useRemoveFavouritePropertyMutation,
 
} = adminsApi;
