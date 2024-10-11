import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Uproad from "../assets/img/Upload.svg";
import "../styles/EditDevice.css";
import EditDeviceForm from "components/editDevice/EditDeviceForm";
import config from "../config/config.json";
import { AuthContext } from "./AuthContext";

const EditDevice = ({ device, onClose }) => {
  const [editDeviceDate, setEditDeviceDate] = useState(
    device ? device.regDate : getTodayDate()
  );
  const [deviceName, setDeviceName] = useState(device ? device.deviceName : "");
  const [deviceStatus, setDeviceStatus] = useState(
    device
      ? device.status === "RENTED"
        ? "대여 중"
        : "대여 가능"
      : "대여 불가"
  );
  const [imgUrl, setImgUrl] = useState(device ? device.imgUrl : "");
  const [currentImageName, setCurrentImageName] = useState(
    device && device.imgUrl ? getFileNameFromUrl(device.imgUrl) : ""
  );
  const [imageFile, setImageFile] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (device) {
      setDeviceName(device.deviceName);
      setImgUrl(device.imgUrl);
      setDeviceStatus(device.status === "RENTED" ? "대여 중" : "대여 가능");
      setCurrentImageName(getFileNameFromUrl(device.imgUrl));
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

  function getFileNameFromUrl(url) {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
      return;
    }

    if (!deviceName.trim()) {
      alert("기기명을 입력해주세요.");
      return;
    }

    try {
      let updatedImageUrl = imgUrl;

      if (imageFile && imageFile !== device.imgUrl) {
        updatedImageUrl = await uploadImage(imageFile);
        if (!updatedImageUrl) {
          alert("이미지 업로드에 실패했습니다.");
          return;
        }
      }

      const data = {
        deviceName,
        imgUrl: updatedImageUrl,
        status: deviceStatus === "대여 중" ? "RENTED" : "AVAILABLE",
      };

      const response = await fetch(
        `${config.serverurl}/device/edit/${device.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("기기 정보가 성공적으로 수정되었습니다.");
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Failed to update device:", response, errorData);
        alert(`수정 실패: ${errorData.message || "서버 오류"}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
      return;
    }

    if (!device) {
      alert("삭제할 기기 정보가 없습니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(
        `${config.serverurl}/device/delete/${device.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        alert("삭제 되었습니다.");
        onClose();
        navigate("/device");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete device:", response, errorData);
        alert(`삭제 실패: ${errorData.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("Error during delete:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (validTypes.includes(file.type)) {
        setImageFile(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG, webp 파일만 가능합니다."
        );
      }
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (validTypes.includes(file.type)) {
        setImageFile(file);
      } else {
        alert("유효하지 않은 파일 형식입니다.");
      }
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${config.serverurl}/file/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image Upload Response:", data);
        setImgUrl(data.imgUrl);
        setCurrentImageName(file.name);
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
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    multiple: false,
  });
  return (
    <div className="DeviceEdit">
      <div className="DeviceEditBlur">
        <div className="DeviceEditForm">
          <EditDeviceForm
            deviceName={deviceName}
            setDeviceName={setDeviceName}
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            imageFile={imageFile}
            setImageFile={setImageFile}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDevice;
