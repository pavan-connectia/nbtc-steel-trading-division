import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCsr: builder.query({
      query: () => ({
        url: "/news/csr",
        params: { display: true },
      }),
    }),
    getImgGalleryByDeptId: builder.query({
      query: () => ({
        url: `/news/image-gallery/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
    getLatestNewsByDeptId: builder.query({
      query: () => ({
        url: `/news/news/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
    getLatestPublicationByDeptId: builder.query({
      query: () => ({
        url: `/news/publication/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
    getLatestNewsById: builder.query({
      query: (id) => `/news/news/${id}`,
    }),
    getVideoGalleryByDeptId: builder.query({
      query: () => ({
        url: `/news/video-gallery/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
  }),
});
export const {
  useGetCsrQuery,
  useGetImgGalleryByDeptIdQuery,
  useGetLatestNewsByDeptIdQuery,
  useGetLatestNewsByIdQuery,
  useGetLatestPublicationByDeptIdQuery,
  useGetVideoGalleryByDeptIdQuery,
} = newsApi;
