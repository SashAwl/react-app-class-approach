import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, test, vi, expect } from 'vitest';
import * as storage from './utilize/utilizeLocalStorage';
import { mockData } from './utilize/mockData';

vi.mock('@/utils/fetchCharacters', () => ({
  fetchCharacters: vi.fn((_query, onSuccess) => {
    onSuccess(mockData.results);
    return Promise.resolve();
  }),
}));

import App from './App';

describe('Tests App component', () => {
  describe('Implements localStorage operations', () => {
    vi.mock('@/components/ErrorMessage', () => ({
      default: () => <div data-testid="mock-error-message" />,
    }));

    vi.mock('@/components/ThrowErrorButton', () => ({
      default: () => <button data-testid="mock-throw-error-button" />,
    }));

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    test('Calls initialLocalStorage on mount', () => {
      const mockInitial = vi
        .spyOn(storage, 'initialLocalStorage')
        .mockImplementation(() => {});
      render(<App />);
      expect(mockInitial).toHaveBeenCalled();
    });

    test('Displays previously saved search term from localStorage on mount', () => {
      vi.spyOn(storage, 'getTermFromLocalStorage').mockReturnValue('test term');

      render(<App />);
      const input = screen.getByPlaceholderText(/input search/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('test term');
    });

    test('Shows empty input when no saved term exists', () => {
      vi.spyOn(storage, 'getTermFromLocalStorage').mockReturnValue('');

      render(<App />);
      const input = screen.getByPlaceholderText(/input search/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    test('Trims whitespace from search input before saving', async () => {
      vi.spyOn(storage, 'setTermToLocalStorage').mockImplementation(() => {});

      render(<App />);

      const input = screen.getByPlaceholderText(/input search/i);
      const button = screen.getByRole('button', { name: /search/i });

      await userEvent.clear(input);
      await userEvent.type(input, '   term with spaces   ');
      await userEvent.click(button);

      expect(storage.setTermToLocalStorage).toHaveBeenCalledWith(
        'term with spaces'
      );
    });
  });

  test('Shows loading state while fetching data', async () => {
    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const items = await screen.findAllByText(/rick/i);
    expect(items.length).toBeGreaterThan(0);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  }, 7000);
});
