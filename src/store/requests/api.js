import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  reducerPath: 'requestsApi',
  endpoints: (builder) => ({
    getItems: builder.query({
      // query: ({ ids, page, pageSize = 10, url }) => {
      query: ({ page, pageSize }) => {
        // return { method: 'get', url: 'pokemon'}

        const params = new URLSearchParams();
        // const idsString = ids ? [ids].flat().join(",") : ids;
        if (page) {
          params.append("limit", pageSize);
          params.append("offset", pageSize * (page - 1));
        }
        // if (idsString) {
        //   params.append("id", idsString);
        // }
        const stringParams = params.toString();

        console.log('stringParams', stringParams);

        const endpoint = stringParams.length
          ? `${page ? "/pokemon" : ""}`
          : "/pokemon";
        return {
          method: "get",
          url: `${endpoint}?${stringParams}`,
        };
      },
    }),
    itemDetail: builder.query({
      query: ({ url }) => {
        return { method: 'get', url: url && url}
      }
    })
  }),
});

