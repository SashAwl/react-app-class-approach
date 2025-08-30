import { describe, expect, test } from 'vitest';
import { Flyout } from './Flyout';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/testUtils';

describe('Tests Flyout component', () => {
  test('Displays element, when at least 1 item has been selected', () => {
    const testCount = 3;
    renderWithProviders(<Flyout itemsCount={testCount} />);

    expect(screen.getByText(/selected items/i)).toBeInTheDocument();
  });
});
