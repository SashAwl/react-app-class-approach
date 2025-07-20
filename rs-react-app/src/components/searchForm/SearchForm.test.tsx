import { describe, expect, test, vi } from 'vitest';
import { Search } from './SearchForm';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Renders search input and search button', () => {
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();

  test('Displays search input and updates input value when user types', async () => {
    render(
      <Search
        inputValue="test"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );
    const input = screen.getByPlaceholderText(/input search/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');

    await userEvent.type(input, 'test');
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('Displays search button and triggers search callback', async () => {
    render(
      <Search
        inputValue="test"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
