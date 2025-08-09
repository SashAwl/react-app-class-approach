import type { Character } from '../types/characterTypes';

export const BASE_URL = 'https://rickandmortyapi.com/api/character';

export function getRequestURL(query: string, page: number) {
  let queryString = `${BASE_URL}/?page=${page}`;
  queryString += query ? `&name=${query}` : '';
  return queryString;
}

export async function fetchCharacters(
  query: string,
  page: number,
  onSuccess: (characters: Character[], totalPages: number) => void,
  onError: (message: string) => void
) {
  try {
    const requestUrl = getRequestURL(query, page);
    const response = await fetch(requestUrl);
    const dataJSON = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No characters found for your query');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }

    onSuccess(dataJSON.results, dataJSON.info.pages);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      onError(error.message);
    } else {
      onError('Unexpected error');
    }
  }
}

export async function fetchCharacterItem(
  id: number,
  onSuccess: (characters: Character) => void,
  onError: (message: string) => void
) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const dataJSON = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No character data found for your query');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }

    onSuccess(dataJSON);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      onError(error.message);
    } else {
      onError('Unexpected error');
    }
  }
}
