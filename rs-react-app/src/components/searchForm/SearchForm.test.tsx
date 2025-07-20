import { describe, expect, test, vi } from 'vitest';
import { Search } from './SearchForm';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('display search form', () => {
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();

  test('display search input', async () => {
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

  test('display search button', async () => {
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
