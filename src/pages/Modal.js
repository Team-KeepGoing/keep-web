import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="ModalOverlay" onClick={onClose}>
      <div
        className="ModalContent"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ModalCloseButton" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
