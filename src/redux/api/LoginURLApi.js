import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const loginURLApi = createApi({
  reducerPath: "loginURLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getLoginURLByDeptId: builder.query({
      query: (departmentId) => `/loginURL/${import.meta.env.VITE_DEPT_ID}`,
    }),
  }),
});

export const { useGetLoginURLByDeptIdQuery } = loginURLApi;
