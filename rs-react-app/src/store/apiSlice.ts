import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/BASE_URL';
import { getCharactersEndpoint } from '../utils/apiUtils';
import type { Character } from '../types/characterTypes';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { results: Character[]; info: { pages: number } },
      { page: number; queryTerm: string }
    >({
      query: ({ queryTerm, page }) => getCharactersEndpoint(queryTerm, page),
    }),
  }),
});

export const { useGetCharactersQuery } = api;
