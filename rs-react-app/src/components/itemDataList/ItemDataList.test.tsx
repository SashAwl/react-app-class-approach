import { describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { mockData } from '../../constants/mockData';
import { ItemDataList } from './ItemDataList';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

global.fetch = vi.fn();

describe('Results/CardList Component Tests', () => {
  test('Renders correct number of items when data is provided', async () => {
    render(
      <MemoryRouter>
        <ItemDataList characters={mockData.results} />
      </MemoryRouter>
    );

    const items = await screen.findAllByText(/rick/i);
    expect(items).toHaveLength(2);
  });

  test('Displays "no results" message when data array is empty', async () => {
    render(
      <MemoryRouter>
        <ItemDataList characters={[]} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/rick/i)).not.toBeInTheDocument();
  });
});
