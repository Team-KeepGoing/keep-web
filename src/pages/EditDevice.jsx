import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Uproad from "../assets/img/Upload.svg";
import "styles/EditDevice.css";
import Device from "./Device";
import MainNavbar from "./MainNavbar";

const EditDevice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const device = location.state?.device;

  const [editDeviceDate, setEditDeviceDate] = useState(
    device ? device.regDate.substring(0, 10) : getTodayDate()
  );
  const [deviceName, setDeviceName] = useState(device ? device.deviceName : "");
  const [deviceStatus, setDeviceStatus] = useState(
    device ? (device.rentDate ? "대여 중" : "대여 가능") : ""
  );
  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(device ? device.imgUrl : "");

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

    if (!imgUrl && imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
      setImgUrl(uploadedUrl);
    }

    const data = {
      id: device ? device.id : 0,
      deviceName: deviceName,
      status: deviceStatus,
      regDate: editDeviceDate,
      imgUrl: imgUrl,
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

  const handleDelete = async () => {
    if (!device) {
      alert("삭제할 기기 정보가 없습니다.");
      return;
    }

    const confirmDelete = window.confirm("정말로 이 기기를 삭제하시겠습니까?");
    if (!confirmDelete) {
      return;
    }

    try {
      console.log("Deleting device with ID:", device.id);

      const response = await fetch(
        `http://3.34.2.12:8080/device/delete/${device.id}`,
        {
          method: "DELETE",
        }
      );

      console.log("Delete request status:", response.status);

      if (response.ok) {
        alert("삭제 성공!");
        navigate("/device");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete device:", errorData);
        alert(`삭제 실패: ${errorData.message || "서버 오류"}`);
      }
    } catch (error) {
      console.error("Error during delete:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/device");
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        await uploadImage(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        await uploadImage(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
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
        console.log("Image Upload Response:", data);
        setImgUrl(data.imgUrl);
        return data.imgUrl;
      } else {
        console.error("Failed to upload image:", response);
        alert("이미지 업로드 실패!");
        return null;
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
      return null;
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg",
    multiple: false,
  });

  return (
    <div className="DeviceEdit">
      <div className="DeviceEditBlur">
        <Device />
        <MainNavbar />
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
              accept="image/png, image/jpeg, image/jpg"
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
          <label className="EditDate">등록일</label>
          <span className="EditDateInput">{editDeviceDate}</span>
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
          <button
            type="button"
            className="DeviceEditDeleteBtn"
            onClick={handleDelete}
          >
            삭제
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDevice;
