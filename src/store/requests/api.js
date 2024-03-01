import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  reducerPath: 'requestsApi',
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ limit }) => ({
        method: 'get',
        url: '/pokemon',
        params: { limit },
      }),
    }),
    addItem: builder.query({
      query: ({ limit, page }) => ({
        method: 'get',
        url: '/pokemon',
        params: { limit, offset: 20 + page,  },
      }),
    })
  }),
});
