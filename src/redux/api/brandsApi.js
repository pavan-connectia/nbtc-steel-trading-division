import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brands",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getBrandsByDeptId: builder.query({
      query: () => ({
        url: `/brands/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
    getBrandsById: builder.query({
      query: (id) => ({ url: `/brands/${id}` }),
    }),
  }),
});
export const { useGetBrandsByDeptIdQuery, useGetBrandsByIdQuery } = brandsApi;
