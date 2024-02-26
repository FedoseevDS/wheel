import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  reducerPath: 'requestsApi',
  endpoints: (builder) => ({
    getItems: builder.query({
      // providesTags: cacheHandler(REQUESTS_API_TAGS.RECORDS),
      query: ({ ids , page, pageSize = 10 }) => {
        const params = new URLSearchParams();
        const idsString = ids ? [ids].flat().join(",") : ids;
        if (page) {
          params.append("limit", pageSize);
          params.append("offset", pageSize * (page - 1));
        }
        if (idsString) {
          params.append("id", idsString);
        }
        const stringParams = params.toString();
        const endpoint = stringParams.length
          ? `${page ? "/pokemon" : ""}`
          : "/pokemon";
        return {
          method: "get",
          url: `${endpoint}?${stringParams}`,
          // url: baseURL
        };
      },
    }),
  }),
});

