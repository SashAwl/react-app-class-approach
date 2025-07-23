import { vi, describe, expect, test, beforeEach } from 'vitest';
import { fetchCharacters } from './utilizeAPI';
import { mockData } from './mockData';
import * as utilize from './utilizeAPI';

describe('API Integration Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('Calls fetch with correct URL', async () => {
    const query = 'rick';
    const mockUrl = `${utilize.BASE_URL}/?page=1&name=${query}`;

    vi.spyOn(utilize, 'getRequestURL').mockReturnValue(mockUrl);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await fetchCharacters(query, onSuccess, onError);

    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
  });

  test('Handles successful API responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await fetchCharacters('rick', onSuccess, onError);

    expect(onSuccess).toHaveBeenCalledWith(mockData.results);
  });

  test('Handles API error 404 responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'No characters found for your query',
      json: async () => {},
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await fetchCharacters('rick', onSuccess, onError);

    expect(onError).toHaveBeenCalledWith('No characters found for your query');
  });

  test('Handles any API error responses exept 404 error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {},
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await fetchCharacters('rick', onSuccess, onError);

    expect(onError).toHaveBeenCalledWith(`Server error: 500`);
  });

  test('Calls onError when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Unexpected error'));

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await fetchCharacters('rick', onSuccess, onError);

    expect(onError).toHaveBeenCalledWith(`Unexpected error`);
  });
});
