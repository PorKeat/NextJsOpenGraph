import { ProductDetailType, ProductType } from "@/types/productType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_PLATZI_URL }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => `products`, // fetch all without params
      providesTags: ["Product"],
    }),

    getProductById: builder.query<ProductDetailType, number>({
      query: (id) => `products/${id}`, // fetch by id
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation<ProductType, Partial<ProductType>>({
      query: (newProduct) => ({
        url: `products`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      ProductType,
      { id: number; data: Partial<ProductType> }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation<{success:boolean}, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

  }),
});

export const { 
    useGetProductsQuery, 
    useGetProductByIdQuery, 
    useCreateProductMutation, 
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApi;
