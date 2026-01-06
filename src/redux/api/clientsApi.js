import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const clientsApi = createApi({
  reducerPath: "clients",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({ url: "/clients", params: { display: true } }),
    }),
  }),
});
export const { useGetClientsQuery } = clientsApi;
