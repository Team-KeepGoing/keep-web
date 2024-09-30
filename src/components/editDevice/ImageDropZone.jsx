import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageDropZone = ({ setImageFile, setImgUrl }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const validTypes = [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/webp",
        ];
        if (validTypes.includes(file.type)) {
          setImageFile(file);
          const previewUrl = URL.createObjectURL(file);
          setImgUrl(previewUrl);
        } else {
          alert("유효하지 않은 파일 형식입니다.");
        }
      }
    },
    [setImageFile, setImgUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    multiple: false,
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} className="fileInput" />
      <label htmlFor="fileInput" className="fileInputLabel">
        파일 선택
      </label>
    </div>
  );
};

export default ImageDropZone;
