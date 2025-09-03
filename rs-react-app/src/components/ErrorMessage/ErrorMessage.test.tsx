import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { ErrorMessage } from './ErrorMessage';
import { render, screen } from '@testing-library/react';

describe('Tests ErrorMessage component', () => {
  test('Displays error message', () => {
    render(
      <MemoryRouter>
        <ErrorMessage error="Test error" />
      </MemoryRouter>
    );

    const text = screen.getByText('Test error');
    expect(text).toBeInTheDocument();
  });
});
