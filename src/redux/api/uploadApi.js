import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "upload",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),

  endpoints: (builder) => ({
    postUpload: builder.mutation({
      query: ({ image, folder }) => ({
        url: `/upload-file`,
        method: "POST",
        params: { folder },
        body: image,
      }),
    }),
  }),
});

export const { usePostUploadMutation } = uploadApi;
