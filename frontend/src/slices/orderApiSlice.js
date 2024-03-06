import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => {
        console.log('Creating order:', order);
        return {
          url: ORDERS_URL,
          method: 'POST',
          body: { ...order },
        };
      },
    }),

    getOrderDetails: builder.query({
      query: (id) => {
        console.log('Getting order details for ID:', id);
        return {
          url: `${ORDERS_URL}/${id}`,
        };
      },
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => {
        console.log('Paying order:', orderId, details);
        return {
          url: `${ORDERS_URL}/${orderId}/pay`,
          method: 'PUT',
          body: details,
        };
      },
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: () => {
        console.log('Getting my orders');
        return {
          url: `${ORDERS_URL}/mine`,
        };
      },
    }),

    getOrders: builder.query({
      query: () => {
        console.log('Getting all orders');
        return {
          url: ORDERS_URL,
        };
      },
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => {
        console.log('Delivering order:', orderId);
        return {
          url: `${ORDERS_URL}/${orderId}/deliver`,
          method: 'PUT',
        };
      },
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => {
        console.log('Deleting order:', orderId);
        return {
          url: `${ORDERS_URL}/${orderId}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
  useDeleteOrderMutation,
} = orderApiSlice;
