import React from "react";
import { useDropzone } from "react-dropzone";
import Uproad from "../../assets/img/Upload.svg";

const UploadImage = ({ onDrop, imgUrl }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="DeviceEntryField">
      <div {...getRootProps()} className="UproadContainer">
        <input {...getInputProps()} />
        <img src={Uproad} alt="Upload Icon" className="Uproad" />
        <p className="UploadText">
          드래그 앤 드랍 <br />
          또는 여기를 눌러 업로드
        </p>
      </div>
      {imgUrl && (
        <div className="UploadedImg">
          <img src={imgUrl} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
