import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const qhseApi = createApi({
  reducerPath: "qhse",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getQhse: builder.query({
      query: () => "/qhse",
    }),
  }),
});
export const { useGetQhseQuery } = qhseApi;
