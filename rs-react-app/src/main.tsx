import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App/App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
