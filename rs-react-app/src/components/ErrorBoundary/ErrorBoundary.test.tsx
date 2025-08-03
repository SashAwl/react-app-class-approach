import { describe, expect, test } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import { render, screen } from '@testing-library/react';

describe('Test ErrorBoundary component', () => {
  test('Displays error message', () => {
    const Bomb = () => {
      throw new Error('Boom');
    };
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    const text = screen.getByText(/Something went wrong.../i);
    expect(text).toBeInTheDocument();
  });
});
