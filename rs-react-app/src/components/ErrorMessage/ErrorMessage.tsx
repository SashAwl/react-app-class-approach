type ErrorMessageProps = {
  error: string | null;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <p className="mt-8">{error}</p>;
};
