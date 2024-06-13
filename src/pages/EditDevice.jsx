import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Uproad from "assets/img/Upload.svg";
import "styles/EditDevice.css";
import Device from "./Device";
import MainNavbar from "./MainNavbar";

const EditDevice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const device = location.state?.device;

  const [editDeviceDate, setEditDeviceDate] = useState(
    device ? device.registrationDate : getTodayDate()
  );
  const [deviceName, setDeviceName] = useState(device ? device.name : "");
  const [deviceStatus, setDeviceStatus] = useState(
    device ? device.availability : ""
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(
    device ? device.image : null
  );

  useEffect(() => {
    if (!device) {
      setEditDeviceDate(getTodayDate());
    }
  }, [device]);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    if (!deviceName.trim()) {
      alert("기기명을 입력해주세요.");
      return;
    }

    const imageUrl = await uploadImage(imageFile);
    if (!imageUrl) {
      alert("이미지 업로드에 실패했습니다.");
      return;
    }

    const data = {
      id: device ? device.id : 0,
      name: deviceName,
      availability: deviceStatus,
      registrationDate: editDeviceDate,
      image: imageUrl,
    };

    console.log("Updating device with data:", data);

    try {
      const response = await fetch("http://3.34.2.12:8080/device/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("수정 성공!");
        navigate("/device");
      } else {
        console.error("Failed to update device:", response);
        alert("수정 실패!");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/device");
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://3.34.2.12:8080/file/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imgUrl;
      } else {
        console.error("Failed to upload image:", response);
        return null;
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      return null;
    }
  };

  return (
    <div className="DeviceEdit">
      <div className="DeviceEditBlur">
        <Device/>
        <MainNavbar/>
      </div>
      <div className="DeviceEditForm">
        <form onSubmit={handleEdit}>
          <p className="DeviceEditMent">기기 수정</p>
          <div className="DeviceEditUproadContainer" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>이미지를 드래그 해 주세요</p>
            ) : (
              <button
                type="button"
                className="DeviceEditUploadButton"
                onClick={() => document.getElementById("fileInput").click()}
              >
                이미지 업로드
              </button>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {imageFile && (
              <div>
                <p className="DeviceEditimgResultMent">
                  업로드된 이미지: {imageFile.name}
                </p>
              </div>
            )}
            <img src={Uproad} alt="UproadImage" className="DeviceEditUproad" />
            <p className="DeviceimgMent">image Drag&Drop</p>
          </div>

          <label className="EditTitle">기기명</label>
          <input
            type="text"
            name="name"
            className="DeviceEditTitleInput"
            placeholder="기기명을 입력하세요."
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <label className="DeviceEditStatus">대여 상태</label>
          <input
            type="text"
            name="availability"
            className="DeviceEditStatusInput"
            placeholder="대여 상태를 입력하세요."
            value={deviceStatus}
            onChange={(e) => setDeviceStatus(e.target.value)}
          />
          <label className="DeviceEditDate">등록일</label>
          <span className="DeviceEditDateInput">{editDeviceDate}</span>

          <button type="submit" className="DeviceEditBtn">
            수정
          </button>
          <button
            type="button"
            className="DeviceEditCancelBtn"
            onClick={handleCancel}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDevice;
