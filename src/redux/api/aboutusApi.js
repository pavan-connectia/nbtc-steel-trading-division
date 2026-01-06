import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const aboutusApi = createApi({
  reducerPath: "aboutus",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAboutusByDeptId: builder.query({
      query: () => ({
        url: `/aboutus-department/${import.meta.env.VITE_DEPT_ID}`,
      }),
    }),
  }),
});
export const { useGetAboutusByDeptIdQuery } = aboutusApi;
