interface ThrowErrorProps {
  handleThrowError: () => void;
}

export const ThrowErrorButton = ({ handleThrowError }: ThrowErrorProps) => {
  return <button onClick={handleThrowError}>Throw error</button>;
};
