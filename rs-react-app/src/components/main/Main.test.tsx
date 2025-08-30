import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from './Main';
import { describe, expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Main', () => {
  test('renders start route by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/characters']}>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Your results')).toBeInTheDocument();
  });

  test('renders About route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('About me')).toBeInTheDocument();
  });

  test('renders nothing for unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/not-found']}>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('About Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Your results')).not.toBeInTheDocument();
  });
});
