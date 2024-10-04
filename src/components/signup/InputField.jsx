import React from "react";

const InputField = ({ label, id, type, value, onChange, onKeyDown }) => {
  return (
    <>
      <label className={`Signup${id}`}>{label}</label>
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
