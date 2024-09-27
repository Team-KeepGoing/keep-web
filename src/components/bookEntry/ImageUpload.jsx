import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Uproad from "../../assets/img/Upload.svg";

const ImageUpload = ({ onUpload, isUploading, imgUrl }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="BookEntryField">
      <label className="BookEntryyMent">도서 등록</label>
      <div {...getRootProps()} className="UproadContainer">
        <input {...getInputProps()} />
        <img src={Uproad} alt="Upload Icon" className="Uproad" />
        <p className="UploadMent">
          드래그 앤 드랍 <br />
          또는 여기를 눌러 업로드
        </p>
      </div>
      {isUploading && <p>이미지 업로드 중...</p>}
      {imgUrl && (
        <div className="UploadedImg">
          <img src={imgUrl} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
