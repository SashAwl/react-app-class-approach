import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About component', () => {
  it('renders heading and paragraphs', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { name: /about me/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/Hi! My name is Sasha/i)).toBeInTheDocument();
    expect(screen.getByText(/Created as part of the/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /RS School React course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
