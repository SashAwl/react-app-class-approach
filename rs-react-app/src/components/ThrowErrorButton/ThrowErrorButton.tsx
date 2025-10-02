interface ThrowErrorProps {
  handleThrowError: () => void;
  menuStyle: string;
}

export const ThrowErrorButton = ({
  handleThrowError,
  menuStyle,
}: ThrowErrorProps) => {
  return (
    <button className={`${menuStyle} self-end`} onClick={handleThrowError}>
      Throw error
    </button>
  );
};
