export function getCharactersEndpoint(query: string, page: number) {
  let queryString = `/?page=${page}`;
  queryString += query ? `&name=${query}` : '';
  return queryString;
}
