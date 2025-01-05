interface ErrorMessageProps {
    message?: string;  // Make the message optional to handle undefined cases
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null; // Don't render if there's no message
    return <p className="text-red-500 text-sm">{message}</p>;
  };
  
  export default ErrorMessage;
  