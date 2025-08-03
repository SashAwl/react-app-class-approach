import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ItemDetails } from './ItemDetails';
import * as api from '../../utils/apiUtils';
import { mockItemData } from '../../utils/mockData';

const renderWithRoute = (
  ui: React.ReactElement,
  path: string = '/characters/:itemId',
  route = '/characters/1?page=1'
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

const mockNavigate = vi.fn();

describe('ItemDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Shows loading spinner while fetching', () => {
    vi.spyOn(api, 'fetchCharacterItem').mockImplementation(
      (_id, _onSuccess, onError) => {
        setTimeout(() => {
          onError('Something went wrong');
        }, 100);
        return Promise.resolve();
      }
    );

    renderWithRoute(<ItemDetails />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('Displays character data on success', async () => {
    vi.spyOn(api, 'fetchCharacterItem').mockImplementation(
      (_id, onSuccess, _onError) => {
        void _onError;
        onSuccess(mockItemData);
        return Promise.resolve();
      }
    );

    renderWithRoute(<ItemDetails />);

    expect(await screen.findByText(/rick/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockItemData.image);
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
  });

  test('Displays error message on fetch failure', async () => {
    vi.spyOn(api, 'fetchCharacterItem').mockImplementation(
      (_id, _onSuccess, onError) => {
        void _onSuccess;
        onError('Something went wrong');
        return Promise.resolve();
      }
    );

    renderWithRoute(<ItemDetails />);

    expect(await screen.findByText(/no characters found/i)).toBeInTheDocument();
  });

  test('Navigates back to characters page on close', async () => {
    vi.mock('react-router-dom', async () => {
      const actual =
        await vi.importActual<typeof import('react-router-dom')>(
          'react-router-dom'
        );
      return {
        ...actual,
        useNavigate: () => mockNavigate,
      };
    });

    vi.spyOn(api, 'fetchCharacterItem').mockImplementation(
      (_id, onSuccess, _onError) => {
        void _onError;
        onSuccess(mockItemData);
        return Promise.resolve();
      }
    );

    renderWithRoute(<ItemDetails />);

    const closeBtn = await screen.findByRole('button', { name: /x/i });
    await userEvent.click(closeBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/characters?page=1');
  });
});
