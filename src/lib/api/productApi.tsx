import { ProductDetailType, ProductType } from "@/types/productType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_URL }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getProducts: builder.query<{ products: ProductType[] }, void>({
      query: () => `products`,
      providesTags: ["Product"],
    }),

    getProductById: builder.query<ProductDetailType, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<ProductType, Partial<ProductType>>({
      query: (product) => {
        return {
          url: "products",
          method: "POST",
          body: {
            title: product.title,
            price: product.price,
            description: product.description,
            images: product.images || ["https://placeimg.com/640/480/any"],
            categoryId: product.category?.id || 35,
          },
        };
      },
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

    deleteProduct: builder.mutation<{ success: boolean }, number>({
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
  useDeleteProductMutation,
} = productsApi;
