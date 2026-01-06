import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const coreBusinessApi = createApi({
  reducerPath: "coreBusiness",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCoreBusinessByDeptId: builder.query({
      query: () => ({ url: `/core-business/${import.meta.env.VITE_DEPT_ID}` }),
    }),
  }),
});
export const { useGetCoreBusinessByDeptIdQuery } = coreBusinessApi;
