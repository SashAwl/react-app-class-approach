const BASE_URL = 'https://rickandmortyapi.com/api/character';

export function getRequestURL(query: string) {
  let queryString = `${BASE_URL}/?page=1`;
  queryString += query ? `&name=${query}` : '';
  return queryString;
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
