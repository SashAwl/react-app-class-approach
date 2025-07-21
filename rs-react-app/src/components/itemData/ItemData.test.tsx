// tests/ItemData.test.tsx
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemData } from './ItemData';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
};

describe('ItemData component', () => {
  test('Displays item name and description correctly', () => {
    render(<ItemData item={mockCharacter} />);
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();
    expect(screen.getByText(/species: human/i)).toBeInTheDocument();
  });

  test('Handles missing props gracefully', () => {
    const renderWithoutProps = () => render(<ItemData />);

    expect(renderWithoutProps).toThrowError();
  });
});
