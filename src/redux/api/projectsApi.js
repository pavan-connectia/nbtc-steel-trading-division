import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  reducerPath: "projects",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProjectsById: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
      }),
    }),
    getProjectsByDeptId: builder.query({
      query: () => ({
        url: `/projects/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
  }),
});
export const { useGetProjectsByIdQuery, useGetProjectsByDeptIdQuery } =
  projectsApi;
