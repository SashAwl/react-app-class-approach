import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/BASE_URL';
import { getCharactersEndpoint } from '../utils/apiUtils';
import type { Character } from '../types/characterType';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { results: Character[]; info: { pages: number } },
      { page: number; search: string }
    >({
      query: ({ search, page }) => getCharactersEndpoint(search, page),
    }),
    getCharacterItem: builder.query<Character, { id: number }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterItemQuery } = api;
