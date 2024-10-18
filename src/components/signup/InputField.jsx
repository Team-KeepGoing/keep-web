import React from "react";

const InputField = ({ label, id, type, value, onChange, onKeyDown }) => {
  return (
    <>
      <input
        className={`Signup${id}InputBox`}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default InputField;
