import React from "react";
import Uproad from "../../assets/img/Upload.svg";

const PreviewImage = ({ imgUrl }) => {
  return imgUrl ? (
    <div className="image-preview">
      <img src={imgUrl} alt="Device Preview" className="preview-image" />
    </div>
  ) : (
    <img src={Uproad} alt="UproadImage" className="DeviceEditUproad" />
  );
};

export default PreviewImage;
