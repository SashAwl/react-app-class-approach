import type { Character } from '../types';

export const BASE_URL = 'https://rickandmortyapi.com/api/character';

export function getRequestURL(query: string) {
  let queryString = `${BASE_URL}/?page=1`;
  queryString += query ? `&name=${query}` : '';
  return queryString;
}

export async function fetchCharacters(
  query: string,
  onSuccess: (characters: Character[]) => void,
  onError: (message: string) => void
) {
  try {
    const response = await fetch(getRequestURL(query));
    const dataJSON = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No characters found for your query');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }

    onSuccess(dataJSON.results);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      onError(error.message);
    } else {
      onError('Unexpected error');
    }
  }
}
