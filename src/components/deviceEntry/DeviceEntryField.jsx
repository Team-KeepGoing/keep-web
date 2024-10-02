import React from "react";

const DeviceEntryField = ({ label, value, onChange }) => {
  return (
    <div className="DeviceEntryField">
      <label className="DeviceEntryTitle">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        required
        className="DeviceTitleInput"
      />
    </div>
  );
};

export default DeviceEntryField;
