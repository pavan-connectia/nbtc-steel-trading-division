import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const awardsApi = createApi({
  reducerPath: "awards",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAwards: builder.query({
      query: () => ({
        url: `/awards/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
  }),
});
export const { useGetAwardsQuery } = awardsApi;
