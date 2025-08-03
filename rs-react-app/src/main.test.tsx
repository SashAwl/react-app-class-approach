import { afterEach, describe, expect, test } from 'vitest';
import { renderApp } from './main';
import { shouldRenderApp } from './main';

describe('Tests main.tsx', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Renders without crashing when #root exists', () => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv);

    expect(() => renderApp()).not.toThrow();
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
