import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
  test('Renders loading indicator', () => {
    render(<Spinner />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('Has appropriate aria-label for screen readers', () => {
    render(<Spinner />);
    const spinner = screen.getByLabelText(/loading indicator/i);
    expect(spinner).toBeInTheDocument();
  });
});
