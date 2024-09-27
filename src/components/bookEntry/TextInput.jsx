import React from "react";

const TextInput = ({
  label,
  value,
  onChange,
  required,
  inputClassName,
  labelClassName,
}) => {
  return (
    <div className="BookEntryField">
      <label className={labelClassName}>{label}:</label>{" "}
      <input
        type="text"
        value={value}
        onChange={onChange}
        required={required}
        className={inputClassName} 
      />
    </div>
  );
};

export default TextInput;
