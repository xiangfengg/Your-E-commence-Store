
import { apiSlice } from './apiSlice';
import { PRODUCTS_URL} from '../constants';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // getProducts: This endpoint is created using the builder.query() method. It fetches the list of products by sending a GET request to the PRODUCTS_URL. The URL is provided as the url property in the query object.  
    //making a query , the fetch data is stored in the cache, we can remove this after a set amount of time 
    //provide tag is like label that is attached to the data It tells RTK Query which cache tags to associate with the response data from a specific query.

    getProducts: builder.query({
      query: () => ({
        url: '/api/products',
      }),
   
      keepUnusedDataFor: 5,
      providesTags:['Product']
    }),

    // getProductDetails: This endpoint is also created using the builder.query() method. It fetches the details of a specific product by sending a GET request to the PRODUCTS_URL with the productId appended to the URL. The productId is passed as a parameter to the query function, and the URL is constructed dynamically.
    //result of the query is typically stored in the Redux store's cache.

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }
    ),

    // invalidatesTags: ['Product'], to stop it from cashing , so we have fresh data 
    // Improved Performance: By intelligently invalidating cache, you avoid serving stale data and ensure components always have the latest information.
    // Reduced Network Requests: If the data hasn't changed, RTK Query uses the cached data instead of making unnecessary network requests.
    // Better Data Consistency: By associating tags with related data, you can ensure that all components relying on the same data are updated when it changes.


    createProduct: builder.mutation({
    query: () => ({
      url: `${PRODUCTS_URL}`,
      method: 'POST',
    }),
    invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),

  createReview: builder.mutation({
    query: (data) => ({
      url: `${PRODUCTS_URL}/${data.productId}/reviews`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['Product'],
  }),
}),
});
//always going to have use + (the function name) + query at the end 
export const { 
  useGetProductsQuery,
   useGetProductDetailsQuery,
   useCreateProductMutation,
   useUpdateProductMutation,
   useDeleteProductMutation,
   useCreateReviewMutation,

   } =
  productsApiSlice;
