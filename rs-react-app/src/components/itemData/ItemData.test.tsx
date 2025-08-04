import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ItemData } from './ItemData';
import { mockItemData } from '../../constants/mockData';
import { renderWithProviders } from '../../__tests__/testUtils';

describe('ItemData component', () => {
  test('Displays item name and description correctly', () => {
    renderWithProviders(<ItemData item={mockItemData} />);
    expect(screen.getByText(/rick/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();
    expect(screen.getByText(/species: human/i)).toBeInTheDocument();
  });
});
