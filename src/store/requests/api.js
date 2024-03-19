import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  reducerPath: 'requestsApi',
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ page }) => ({
        method: 'get',
        url: `pokemon`,
        params: {
          limit: page !== 0 ? 20 + page : 20,
        },
      }),
    }),
    getItem: builder.query({
      query: ({ id }) => ({
        method: 'get',
        url: `/pokemon/${id}`,
      }),
    }),
  }),
});
