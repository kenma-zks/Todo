import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginData } from "../types/types";

const BASE_URL = "http://localhost:5001/api/users/";

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    verifyLogin: builder.mutation({
      query: (loginData: ILoginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useVerifyLoginMutation } = authApiSlice;
