import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Uproad from "../assets/img/Upload.svg";
import "../styles/EditDevice.css";
import { AuthContext } from "./AuthContext";
import config from "../config/config.json";

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

  // 오늘 날짜 가져오기
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  // 파일 URL에서 파일명 추출
  function getFileNameFromUrl(url) {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  }

  // 이미지 파일 업로드 처리 함수
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

  // 폼 제출 처리 함수
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

  // 기기 삭제 처리 함수
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

  // 이미지 파일 드롭 처리 함수
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (validTypes.includes(file.type)) {
        setImageFile(file);
        const previewUrl = URL.createObjectURL(file);
        setImgUrl(previewUrl);
      } else {
        alert("유효하지 않은 파일 형식입니다.");
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    multiple: false,
  });

  return (
    <div className="DeviceEdit">
      <div className="DeviceEditBlur">
        <div className="DeviceEditForm">
          <form onSubmit={handleEdit}>
            <p className="DeviceEditMent">기기 수정</p>

            {/* 이미지 업로드 드롭존 */}
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} className="fileInput" />
              <label htmlFor="fileInput" className="fileInputLabel">
                파일 선택
              </label>
            </div>

            {/* 이미지 미리보기 */}
            {imgUrl ? (
              <div className="image-preview">
                <img
                  src={imgUrl}
                  alt="Device Preview"
                  className="preview-image"
                />
              </div>
            ) : (
              <img
                src={Uproad}
                alt="UproadImage"
                className="DeviceEditUproad"
              />
            )}

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
            <button
              type="button"
              className="EditCancelButton"
              onClick={handleDelete}
            >
              삭제
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDevice;
