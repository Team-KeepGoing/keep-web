import React from "react";

const ImagePreview = ({ bookImage }) => {
  return (
    <>
      {bookImage && (
        <img src={bookImage} alt="Book" className="BookImagePreview" />
      )}
    </>
  );
};

export default ImagePreview;
