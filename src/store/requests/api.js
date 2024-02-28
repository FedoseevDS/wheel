import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  reducerPath: 'requestsApi',
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ page = 1, pageSize }) => {

        const params = new URLSearchParams();

        if (page) {
          params.append("limit", pageSize);
          // params.append("offset", pageSize * (page - 1));
        }

        const stringParams = params.toString();

        const endpoint = stringParams.length
          ? `${page ? "/pokemon" : ""}`
          : "/pokemon";
        // const endpoint = stringParams.length ? "/pokemon" : '';
        return {
          method: "get",
          url: `${endpoint}?${stringParams}`,
        };
      },
    }),
    addData: builder.query({
      query: ({ page, pageSize }) => {
        if (page) {
          const params = new URLSearchParams()
            
          params.append('limit', pageSize);
          params.append('offset', pageSize * (page - 1))
          
          const stringParams = params.toString()
          const endpoint = stringParams.length
          ? `${page ? "/pokemon" : ""}`
          : "/pokemon";
          return {
          method: "get",
          url: `${endpoint}?${stringParams}`,
        }
      }
    }
  }),
    itemDetail: builder.query({
      query: ({ url }) => {
        return { method: 'get', url: url && url}
      }
    })
  }),
});
