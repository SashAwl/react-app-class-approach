import { afterEach, describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderApp } from './main';
import { shouldRenderApp } from './main';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App/App';

describe('Tests main.tsx', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Renders without crashing when #root exists', async () => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv);

    const root = createRoot(rootDiv);

    root.render(
      <StrictMode>
        <BrowserRouter basename="react-app-class-approach">
          <App />
        </BrowserRouter>
      </StrictMode>
    );

    await screen.findByText(/your results/i);

    root.unmount();
  });

  test('Throws error when #root does not exist', () => {
    expect(() => renderApp()).toThrow('Root element not found');
  });

  test('Should render app when not in test mode', () => {
    expect(shouldRenderApp('production')).toBe(true);
  });

  test('Should not render app in test mode', () => {
    expect(shouldRenderApp('test')).toBe(false);
  });
});
