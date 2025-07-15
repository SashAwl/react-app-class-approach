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
