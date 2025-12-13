import './ErrorMessage.css';

const ErrorMessage = ({ isError, children }: { isError: boolean; children: string }) => {
  return isError && <p className="error-message">{children}</p>;
};

export default ErrorMessage;
