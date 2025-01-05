interface SuccessMessageProps {
    message?: string;  // Make the message optional to handle undefined cases
  }
  
  const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
    if (!message) return null; // Don't render if there's no message
    return <p className="text-green-500 text-sm">{message}</p>;
  };
  
  export default SuccessMessage;
  