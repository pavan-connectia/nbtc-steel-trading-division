import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const milestonesApi = createApi({
  reducerPath: "milestones",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getMilestones: builder.query({
      query: () => ({ url: `/milestones-department/department/${import.meta.env.VITE_DEPT_ID}`, params: { display: true } }),
    }),
  }),
});
export const { useGetMilestonesQuery } = milestonesApi;
