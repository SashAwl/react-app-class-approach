interface ThrowErrorProps {
  handleThrowError: () => void;
}

export const ThrowErrorButton = ({ handleThrowError }: ThrowErrorProps) => {
  return (
    <button className="self-end" onClick={handleThrowError}>
      Throw error
    </button>
  );
};
