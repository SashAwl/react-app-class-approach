import { describe, test, beforeEach, expect } from 'vitest';

import {
  initialLocalStorage,
  getTermFromLocalStorage,
  setTermToLocalStorage,
} from './utilizeLocalStorage';

describe('Tests localStorage operations', () => {
  describe('Initializes local storage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('Sets "queryTerm" to empty string if not present', () => {
      expect(localStorage.getItem('queryTerm')).toBeNull();

      initialLocalStorage();

      expect(localStorage.getItem('queryTerm')).toBe('');
    });

    test('Does nothing if "queryTerm" is already set', () => {
      localStorage.setItem('queryTerm', 'test');

      initialLocalStorage();

      expect(localStorage.getItem('queryTerm')).toBe('test');
    });
  });

  test('Overwrites existing localStorage value', () => {
    expect(localStorage.getItem('queryTerm')).not.toBeNull();

    setTermToLocalStorage('test');

    expect(localStorage.getItem('queryTerm')).toBe('test');
  });

  test('Returns saved search term from localStorage', () => {
    localStorage.setItem('queryTerm', 'test value');
    const result = getTermFromLocalStorage();
    expect(result).toBe('test value');
  });
});
