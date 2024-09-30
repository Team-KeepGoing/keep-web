import React from "react";

const ViewBookButtons = ({ onEdit, onClose }) => {
  return (
    <div>
      <button onClick={onEdit} className="SaveButton">
        수정
      </button>
      <button onClick={onClose} className="CancelButton">
        취소
      </button>
    </div>
  );
};

export default ViewBookButtons;
