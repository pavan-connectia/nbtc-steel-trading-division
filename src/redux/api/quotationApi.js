import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quotationApi = createApi({
  reducerPath: "quotationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    postQuotation: builder.mutation({
      query: (formData) => ({
        url: "/quotation/",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});
export const { usePostQuotationMutation } = quotationApi;
