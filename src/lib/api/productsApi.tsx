import { ProductDetailType, ProductType } from "@/types/productType"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
    })
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productsApi