import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { afterEach } from 'vitest';
import { MenuButton } from './MenuButton';

afterEach(() => {
  cleanup();
});

describe('MenuButton component', () => {
  test('Renders with correct text', () => {
    render(<MenuButton nameButton="UncontrolledForm" handleClick={() => {}} />);

    const button = screen.getAllByRole('button', {
      name: /uncontrolledform/i,
    })[0];

    expect(button).toBeDefined();
    expect(button.textContent).toBe('UncontrolledForm');
  });

  test('Calls handleClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <MenuButton nameButton="UncontrolledForm" handleClick={handleClick} />
    );

    const button = screen.getAllByRole('button', {
      name: /uncontrolledform/i,
    })[0];

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
