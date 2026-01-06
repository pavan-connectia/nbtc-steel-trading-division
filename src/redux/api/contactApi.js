import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    postContactForm: builder.mutation({
      query: (formData) => ({
        url: "/contact/contact-form",
        method: "POST",
        body: formData,
      }),
    }),
    getContactInfo: builder.query({
      query: () => ({
        url: "/contact/contact-info",
        params: {
          display: true,
        },
      }),
    }),
  }),
});
export const {
  useGetContactInfoQuery,
  useGetContactMapQuery,
  usePostContactFormMutation,
} = contactApi;
