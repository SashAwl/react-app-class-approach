import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, test, vi, expect, type Mock } from 'vitest';
import * as storage from '../../utils/localStorageUtils';
import { mockData } from '../../constants/mockData';

vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <div>icon</div>,
}));

vi.mock('../../store/apiSlice', async () => {
  const actual = await vi.importActual<typeof import('../../store/apiSlice')>(
    '../../store/apiSlice'
  );

  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
    useGetCharacterItemQuery: vi.fn(),
  };
});

import { App } from '../../App/App';
import { renderWithProviders } from '../../__tests__/testUtils';
import { useGetCharactersQuery } from '../../store/apiSlice';

describe('Tests ItemDataLayout component - success cases', () => {
  describe('Implements localStorage operations', () => {
    vi.mock('@/components/ThrowErrorButton', () => ({
      default: () => <button data-testid="mock-throw-error-button" />,
    }));

    beforeEach(() => {
      vi.restoreAllMocks();
      (useGetCharactersQuery as Mock).mockImplementation(() => ({
        data: mockData,
        error: null,
        isLoading: false,
        refetch: vi.fn(),
      }));
    });

    test('Calls initialLocalStorage on mount', () => {
      const mockInitial = vi
        .spyOn(storage, 'initialLocalStorage')
        .mockImplementation(() => {});
      renderWithProviders(<App />);
      expect(mockInitial).toHaveBeenCalled();
    });

    test('Displays previously saved search term from localStorage on mount', () => {
      vi.spyOn(storage, 'getTermFromLocalStorage').mockReturnValue('test term');

      renderWithProviders(<App />);
      const input = screen.getByPlaceholderText(/input search/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('test term');
    });

    test('Shows empty input when no saved term exists', () => {
      vi.spyOn(storage, 'getTermFromLocalStorage').mockReturnValue('');

      renderWithProviders(<App />);
      const input = screen.getByPlaceholderText(/input search/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    test('Trims whitespace from search input before saving', async () => {
      vi.spyOn(storage, 'setTermToLocalStorage').mockImplementation(() => {});

      renderWithProviders(<App />);

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
});

describe('Tests ItemDataLayout component - loading case', () => {
  test('Shows loading state while fetching data', async () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      refetch: vi.fn(),
    });

    renderWithProviders(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
