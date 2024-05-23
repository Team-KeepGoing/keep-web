import React, { useState } from "react";

const DragDrop = ({ onChangeFile, description = "파일 첨부" }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];
      onChangeFile(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChangeFile(file);
    e.target.value = "";
  };

  return (
    <div className="flexflex-coljustify-centeritems-centerw-full">
      <div className="w-3/4">
        <label
          className={`w-full flex-col gap-3 h-32 border-2 ${
            dragOver
              ? "border-blue-500 bg-blue-100 text-blue-500 font-semibold"
              : "border-gray-300"
          } rounded-md flex items-center justify-center cursor-pointer`}
          htmlFor="fileUpload"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {description}
          <div className="w-9 h-9 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </label>
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};

export default DragDrop;
