type ErrorMessageProps = {
  error: string | null;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <p className="error-message">{error}</p>;
};
