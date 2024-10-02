import React, { useState, useCallback } from "react";
import config from "../config/config.json";
import DeviceEntryField from "../components/deviceEntry/DeviceEntryField";
import UploadImage from "../components/deviceEntry/UploadImage";
import "../styles/Registration.css";

const Registration = ({ onClose }) => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${config.serverurl}/file/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImgUrl(data.imgUrl);
        return data.imgUrl;
      } else {
        console.error("Failed to upload image:", response);
        return "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        uploadImage(acceptedFiles[0]);
      }
    },
    [uploadImage]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      deviceName: deviceName,
      deviceType: deviceType,
      imgUrl: imgUrl,
    };

    try {
      const response = await fetch(`${config.serverurl}/device/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Device registered successfully:", data);
        alert("기기 등록에 성공했습니다.");
        onClose();
      } else {
        console.error("Failed to register device:", response);
      }
    } catch (error) {
      console.error("Error registering device:", error);
    }
  };

  return (
    <>
      <div className="DeviceEntryMent">기기 등록</div>
      <div className="RegistrationForm">
        <form onSubmit={handleSubmit}>
          <DeviceEntryField
            label="기기명:"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <UploadImage onDrop={onDrop} imgUrl={imgUrl} />
          <div className="DeviceRegistrationButtons">
            <button type="submit" className="EntryBtn">
              등록
            </button>
            <button type="button" className="EntryCancelBtn" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
