import { describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { mockData } from '../../utilize/mockData';
import { ItemDataList } from './ItemDataList';
import { render } from '@testing-library/react';

global.fetch = vi.fn();

describe('Results/CardList Component Tests', () => {
  test('Renders correct number of items when data is provided', async () => {
    render(<ItemDataList characters={mockData.results} />);

    const items = await screen.findAllByText(/rick/i);
    expect(items).toHaveLength(2);
  });

  test('Displays "no results" message when data array is empty', async () => {
    render(<ItemDataList characters={[]} />);

    const items = await screen.findAllByText(/rick/i);
    expect(items).toHaveLength(0);
  });

  test('Shows loading state while fetching data', async () => {
    render(<ItemDataList characters={mockData.results} />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await screen.findByText('Rick');
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });
});
