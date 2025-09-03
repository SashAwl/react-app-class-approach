import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App/App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary-tmp/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

export function renderApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter basename="react-app-class-approach">
          <ErrorBoundary>
            <Provider store={store}>
              <App />
            </Provider>
          </ErrorBoundary>
        </BrowserRouter>
      </StrictMode>
    );
  } else {
    throw new Error('Root element not found');
  }
}

export function shouldRenderApp(mode = import.meta.env.MODE) {
  return mode !== 'test';
}

if (shouldRenderApp()) {
  renderApp();
}
