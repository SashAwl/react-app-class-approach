import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from './Main';
import { describe, expect, test } from 'vitest';

describe('Main', () => {
  test('renders start route by default', () => {
    render(
      <MemoryRouter initialEntries={['/characters']}>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('Your results')).toBeInTheDocument();
  });

  test('renders About route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('About me')).toBeInTheDocument();
  });

  test('renders nothing for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <Main />
      </MemoryRouter>
    );

    expect(screen.queryByText('About Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Your results')).not.toBeInTheDocument();
  });
});
