import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Renders default state with Select form', () => {
    render(<App />);
    expect(screen.getByText(/select form/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Uncontrolled form' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Controlled form' })
    ).toBeInTheDocument();
  });

  test('Renders UncontrolledForm when clicking Uncontrolled form button', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Uncontrolled form' }));
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
  });

  test('Renders ControlledForm when clicking Controlled form button', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Controlled form' }));
    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
  });

  test('Switches forms correctly', () => {
    render(<App />);
    const uncontrolledBtn = screen.getAllByRole('button', {
      name: 'Uncontrolled form',
    })[0];
    const controlledBtn = screen.getByRole('button', {
      name: 'Controlled form',
    });

    fireEvent.click(uncontrolledBtn);
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();

    fireEvent.click(controlledBtn);
    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
  });
});
