import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  // The tagTypes parameter is used to define the types of entities or resources that your API slice will interact with. These are essentially labels that help organize and categorize different types of data in your application.
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});
