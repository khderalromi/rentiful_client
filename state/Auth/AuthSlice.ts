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
    baseUrl: "https://rentiful-server-6.onrender.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Properties",
    "Tenants",
    "PropertyDtails",
    "Leases",
    "Payments",
    "Applications"
  ],
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

    //Proerty related endpoints
    

    getProperties: builder.query<
      any,
      Partial<FiltersState> & { favouriteIds?: number[] }
    >({
      query: (filters) => {
        const latlngParam =
          filters.coordinates?.length === 2
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
      query: ({ propertyId }) => ({
        url: `/properties/property/${propertyId}`,
        method: "GET",
      }),
      providesTags: (result, error, _id) => {
        console.log(error);
        return [{ type: "PropertyDtails", _id }];
      },
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

    //Manager related Endpoints
    
    createProperty: builder.mutation<Partial<Property> ,FormData >({
      
      query: (NewProperty) => ({
        url: "/properties/create",
        method: "POST",
        body: NewProperty,
      }),

      invalidatesTags: (result) => { console.log("gggggggg"+ FormData)
        return [{ type: "Properties", id: result?._id }]
      }
    }),

    getManagerProperties: builder.query<any, void>({
      query: () => ({
        url: `/properties/manager_properties`,
        method: "GET",
      }),

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map((item) => ({
                type: "Properties" as const,
                _id: item._id,
              })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
    }),

     //lease related endpoints 
    getLeasesProperty: builder.query<any, { propertyId: string }>({
      query: ({ propertyId }) => ({
        url: `/properties/${propertyId}/leases`,
        method: "GET",
        providesTags: ["Leases"],
      }),
    }),
  
    getTenantLeases: builder.query<any, void>({
      query: () => ({
        url: `/leases/tenantLeases`,
        method: "GET",
      }),

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({id}) => ({
                type: "Properties" as const,
                id,
              })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
    }),

    getLeasesPropertyByUser: builder.query<any, { propertyId: string }>({
      query: ({ propertyId }) => ({
        url: `/properties/${propertyId}/leasesPropertyByUser`,
        method: "GET",
        providesTags: ["Leases"],
      }),
    }),

    getPayments: builder.query<any, { leaseId: string }>({
      query: ({ leaseId }) => ({
        url: `/payments/${leaseId}/payments/all`,
        method: "GET",
        providesTags: ["Payments"],
      }),
    }),
    
    getPaymentsProperty: builder.query<any, { propertyId: string }>({
      query: ({ propertyId }) => ({
        url: `/payments/${propertyId}/payments-property`,
        method: "GET",
        providesTags: ["Payments"],
      }),
    }),

    // applications related endpoints

    createApplication: builder.mutation<any , {status:string,propertyId:string}>({
      
      query: (body) => ({
        url: "/applications/create",
        method: "POST",
        body: body,
      }),

      invalidatesTags: ["Applications"]
    }),

    getApplications: builder.query<any , void >({
      query: () => ({
        url: `/applications/all-Applications`,
        providesTags: ["Applications"],
        
      }),
      
    }),
    
    updateApplicationStatus: builder.mutation<any ,{applicationId:string , status:string} >({
      query: ({applicationId , status}) => ({
        url: `/applications/:${applicationId}/status`,
        method: "PATCH",
        body: {status},
      }),

      invalidatesTags: (result) => ["Applications" , "Leases"]
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
  useGetManagerPropertiesQuery,
  useCreatePropertyMutation,
  useGetLeasesPropertyQuery,
  useGetTenantLeasesQuery,
  useGetLeasesPropertyByUserQuery,
  useGetPaymentsQuery,
  useGetPaymentsPropertyQuery,
  useCreateApplicationMutation ,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation
  
} = adminsApi;
