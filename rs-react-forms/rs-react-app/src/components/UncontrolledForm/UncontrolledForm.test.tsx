import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UncontrolledForm } from './UncontrolledForm';

afterEach(() => {
  cleanup();
});

describe('UncontrolledForm', () => {
  test('Renders all form fields and the submit button', () => {
    render(<UncontrolledForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    const maleRadios = screen.getAllByLabelText(/male/i);
    expect(maleRadios[0]).toBeInTheDocument();
    const femaleRadio = screen.getAllByLabelText(/female/i);
    expect(femaleRadio[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('Allows user to type in inputs, select radio and checkbox', () => {
    render(<UncontrolledForm />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const ageInput = screen.getByLabelText(/age/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const maleRadios = screen.getAllByLabelText(/male/i)[0] as HTMLInputElement;
    const acceptCheckbox = screen.getByLabelText(
      /accept terms/i
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(ageInput, { target: { value: 25 } });
    fireEvent.change(emailInput, { target: { value: 'alice@test.com' } });

    expect(nameInput.value).toBe('Alice');
    expect(ageInput.value).toBe('25');
    expect(emailInput.value).toBe('alice@test.com');

    fireEvent.click(maleRadios);
    fireEvent.click(acceptCheckbox);

    expect(maleRadios.checked).toBe(true);
    expect(acceptCheckbox.checked).toBe(true);
  });
});
