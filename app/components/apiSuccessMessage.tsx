interface ErrorMessageProps {
    message?: string; 
  }
  
  const ApiSuccessMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null; 
    return (
      <div className="min-w-48 h-12 p-2 bg-green-500 flex justify-center items-center rounded">
       <p className="text-white-500 text-md font-semibold">{message}</p>
    </div>
    )
  };
  
  export default ApiSuccessMessage;
  