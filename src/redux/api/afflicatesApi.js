import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const afflicatesApi = createApi({
  reducerPath: "afflicates",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAfflicates: builder.query({
      query: () => ({ url: "/afflicates", params: { display: true } }),
    }),
  }),
});
export const { useGetAfflicatesQuery } = afflicatesApi;
