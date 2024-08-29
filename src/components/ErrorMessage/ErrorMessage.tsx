import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
      {message}
    </div>
  );
};
export default ErrorMessage;
