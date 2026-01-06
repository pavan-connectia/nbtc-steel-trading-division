import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
  reducerPath: "home",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getHomeByDeptId: builder.query({
      query: () => `/home-department/${import.meta.env.VITE_DEPT_ID}`,
    }),
  }),
});
export const { useGetHomeByDeptIdQuery } = homeApi;
