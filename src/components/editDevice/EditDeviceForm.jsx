import React from "react";
import ImageDropZone from "./ImageDropZone";
import PreviewImage from "./PreviewImage";

const EditDeviceForm = ({
  deviceName,
  setDeviceName,
  imgUrl,
  setImgUrl,
  imageFile,
  setImageFile,
  handleEdit,
  handleDelete,
}) => {
  return (
    <form onSubmit={handleEdit}>
      <p className="DeviceEditMent">기기 수정</p>
      <ImageDropZone setImageFile={setImageFile} setImgUrl={setImgUrl} />
      <PreviewImage imgUrl={imgUrl} />
      <label className="EditTitle">기기명</label>
      <input
        type="text"
        name="name"
        className="DeviceEditTitleInput"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
      />
      <button type="submit" className="SaveButton">
        수정
      </button>
      <button type="button" className="EditCancelButton" onClick={handleDelete}>
        삭제
      </button>
    </form>
  );
};

export default EditDeviceForm;
