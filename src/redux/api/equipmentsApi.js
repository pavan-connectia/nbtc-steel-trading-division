import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const equipmentsApi = createApi({
  reducerPath: "equipments",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getEquipmentsById: builder.query({
      query: (id) => ({ url: `/category/${id}` }),
    }),
    getEquipmentsByDeptId: builder.query({
      query: () => ({
        url: `/category/department/${import.meta.env.VITE_DEPT_ID}`,
        params: { display: true },
      }),
    }),
    getEquipmentsByFeaturedPopularDeptId: builder.query({
      query: () => ({
        url: `/category/featured-popular/department/${import.meta.env.VITE_DEPT_ID}`,
      }),
    }),
    getEquipmentsByCategory: builder.query({
      query: (category) => ({
        url: "/category/category",
        params: { category: category, display: true },
      }),
    }),
    getEquipmentsBySubCategory: builder.query({
      query: (subcategory) => ({
        url: "/category/category",
        params: { subcategory: subcategory, display: true },
      }),
    }),
  }),
});
export const {
  useGetEquipmentsByIdQuery,
  useGetEquipmentsByDeptIdQuery,
  useGetEquipmentsByFeaturedPopularDeptIdQuery,
  useGetEquipmentsByCategoryQuery,
  useGetEquipmentsBySubCategoryQuery,
} = equipmentsApi;
