import React from "react";

const Input = ({
  id,
  label,
  type,
  value,
  handleChange,
  handleKeyPress,
  error,
}) => {
  return (
    <>
      <label className={`Signin${id}`}>{label}</label>
      {id === "email" && (
        <div className="SigninemailFormat">@dgsw.hs.kr 형식</div>
      )}
      <input
        id={id}
        className={`Signin${id}InputBox`}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      {error && <p className="Signinerror-message">{error}</p>}
    </>
  );
};

export default Input;
