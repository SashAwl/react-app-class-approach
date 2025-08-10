import { describe, expect, test } from 'vitest';
import { Flyout } from './Flyout';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/testUtils';

describe('Tests Flyout component', () => {
  test('Displays element, when at least 1 item has been selected', () => {
    const testCount = 3;
    renderWithProviders(<Flyout itemsCount={testCount} />);

    expect(
      screen.getByText(`Selected items: ${testCount}`)
    ).toBeInTheDocument();
  });

  test('Displays unselect button', () => {
    const testCount = 3;
    renderWithProviders(<Flyout itemsCount={testCount} />);

    expect(screen.getByText(/unselect all/i)).toBeInTheDocument();
  });

  test('Displays download button', () => {
    const testCount = 3;
    renderWithProviders(<Flyout itemsCount={testCount} />);

    expect(screen.getByText(/download/i)).toBeInTheDocument();
  });
});
