import React from "react";

const ErrorMessage = ({ message }) => {
  return message ? <p className="Signuperror-message">{message}</p> : null;
};

export default ErrorMessage;
