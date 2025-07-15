import type { Character } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

function getRequestURL(query: string) {
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
    onError('No characters found for your query');
  }
}

/** LocalStorage operation */

export function initialLocalStorage(): void {
  if (!localStorage.getItem('quueryTerm')) {
    localStorage.setItem('quueryTerm', '');
  }
}

export function setTermToLocalStorage(term: string): void {
  localStorage.setItem('queryTerm', term);
}

export function getTermFromLocalStorage(): string {
  return localStorage.getItem('queryTerm') ?? '';
}
