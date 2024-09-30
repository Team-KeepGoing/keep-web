import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditDevice.css";
import { AuthContext } from "./AuthContext";
import config from "../config/config.json";
import EditDeviceForm from "../components/editDevice/EditDeviceForm";

const EditDevice = ({ device, onClose }) => {
  const [deviceName, setDeviceName] = useState(device ? device.deviceName : "");
  const [deviceStatus, setDeviceStatus] = useState(
    device
      ? device.status === "RENTED"
        ? "대여 중"
        : "대여 가능"
      : "대여 불가"
  );
  const [imgUrl, setImgUrl] = useState(device ? device.imgUrl : "");
  const [imageFile, setImageFile] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (device) {
      setDeviceName(device.deviceName);
      setImgUrl(device.imgUrl);
      setDeviceStatus(device.status === "RENTED" ? "대여 중" : "대여 가능");
    }
  }, [device]);

  const handleEdit = async (data) => {
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

      if (data.imageFile && data.imageFile !== device.imgUrl) {
        updatedImageUrl = await data.uploadImage(data.imageFile);
        if (!updatedImageUrl) {
          alert("이미지 업로드에 실패했습니다.");
          return;
        }
      }

      const updateData = {
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
          body: JSON.stringify(updateData),
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
