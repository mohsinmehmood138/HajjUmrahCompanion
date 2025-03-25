import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const translationApi = createApi({
  reducerPath: 'translationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://google-translate113.p.rapidapi.com/api/v1/translator',
    prepareHeaders: headers => {
      headers.set(
        'X-RapidAPI-Key',
        'cecb72dae7msh4af98ca24ac02cfp160c6ejsn5c9567c702ee',
      );
      headers.set('X-RapidAPI-Host', 'google-translate113.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: builder => ({
    translateText: builder.mutation({
      query: payload => ({
        url: '/text',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {useTranslateTextMutation} = translationApi;
