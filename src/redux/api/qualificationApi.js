import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const qualificationApi = createApi({
  reducerPath: "qualification",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getQualification: builder.query({
      query: () => ({ url: "/qualification" }),
    }),
    getQualificationLoc: builder.query({
      query: () => ({
        url: "/qualification-loc",
      }),
    }),
  }),
});
export const { useGetQualificationQuery, useGetQualificationLocQuery } =
  qualificationApi;
