import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemData } from './ItemData';
import { MemoryRouter } from 'react-router-dom';
import { mockItemData } from '../../utils/mockData';

describe('ItemData component', () => {
  test('Displays item name and description correctly', () => {
    render(
      <MemoryRouter>
        <ItemData item={mockItemData} />
      </MemoryRouter>
    );
    expect(screen.getByText(/rick/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();
    expect(screen.getByText(/species: human/i)).toBeInTheDocument();
  });
});
