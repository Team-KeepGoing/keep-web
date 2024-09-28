import React, { useRef } from "react";

const FileInput = ({ bookImage, onImageChange }) => {
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="EntryDetailItem">
      <p className="fileLabel" onClick={handleFileInputClick}>
        파일 선택
      </p>
      <input
        id="fileInput"
        type="file"
        onChange={onImageChange}
        className="fileInput"
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileInput;
