import React from "react";

const CheckboxField = ({ id, label, checked, onChange }) => {
  return (
    <>
      <label htmlFor={id} className="Signupchecktext">
        {label}
      </label>
      <input
        id={id}
        className="SignupcheckBox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export default CheckboxField;
