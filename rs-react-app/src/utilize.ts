const BASE_URL = 'https://rickandmortyapi.com/api/character';

export function getRequestURL(query: string) {
  let queryString = `${BASE_URL}/?page=1`;
  queryString += query ? `&name=${query}` : '';
  return queryString;
}
