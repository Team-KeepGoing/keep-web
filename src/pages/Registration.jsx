import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Uproad from "../assets/img/Upload.svg";
import "../styles/Registration.css";

const Registration = ({ onClose }) => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://15.165.16.79:8080/file/upload", {
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      deviceName: deviceName,
      deviceType: deviceType,
      imgUrl: imgUrl,
    };

    try {
      const response = await fetch("http://15.165.16.79:8080/device/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Device registered successfully:", data);
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
          <div className="DeviceEntryField">
            <label className="DeviceEntryTitle">기기명:</label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              required
              className="DeviceTitleInput"
            />
          </div>
          <div className="DeviceEntryField">
            <div {...getRootProps()} className="UproadContainer">
              <input {...getInputProps()} />
              <img src={Uproad} alt="Upload Icon" className="Uproad" />
              <p className="UploadText">
                드래그 앤 드랍 <br />
                또는 여기를 눌러 업로드
              </p>
            </div>
          </div>
          {imgUrl && (
            <div className="UploadedImg">
              <img src={imgUrl} alt="Preview" />
            </div>
          )}
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
