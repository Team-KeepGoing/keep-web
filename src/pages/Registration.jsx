import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Device from "./Device";
import Uproad from "../assets/img/Upload.svg";
import "styles/Registration.css";
import MainNavbar from "./MainNavbar";

const Registration = () => {
  const [registrationDate, setRegistrationDate] = useState(getTodayDate());
  const [deviceName, setDeviceName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRegistrationDate(getTodayDate());
  }, []);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

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
        console.log("Image Upload Response:", data); // 서버에서 반환된 이미지 URL을 콘솔에 출력
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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!deviceName.trim()) {
      alert("기기명을 입력해주세요.");
      return;
    }

    if (!imgUrl) {
      alert("이미지를 업로드해주세요.");
      return;
    }

    const data = {
      deviceName: deviceName,
      imgUrl: imgUrl,
      status: "AVAILABLE",
    };

    try {
      const response = await fetch("http://3.34.2.12:8080/device/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("등록 성공!");
        navigate("/device");
      } else {
        console.error("Failed to register device:", response);
        alert("등록 실패!");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("등록 중 오류가 발생했습니다.");
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg",
    multiple: false,
  });

  return (
    <div className="BookEntry">
      <div className="BookOfficerBlur">
        <Device />
        <MainNavbar />
      </div>
      <div className="BookEntryForm">
        <form onSubmit={handleRegister}>
          <p className="DeviceEntryMent">기기 등록</p>
          <div className="UproadContainer" {...getRootProps()}>
            <input {...getInputProps()} style={{ display: "none" }} />
            {isDragActive ? (
              <p>파일을 드래그 앤 드롭하세요...</p>
            ) : (
              <button
                type="button"
                className="UploadButton"
                onClick={() => document.getElementById("fileInput").click()}
              >
                이미지 업로드
              </button>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {imgUrl && (
              <div>
                <p className="imgResultMent">이미지가 업로드 되었습니다.</p>
              </div>
            )}
            <img src={Uproad} alt="UproadImage" className="Uproad" />
            <p className="imgMent">image Drag&Drop</p>
          </div>

          <label className="DeviceEntryTitle">기기명</label>
          <input
            type="text"
            name="title"
            className="DeviceTitleInput"
            placeholder="기기명을 입력하세요."
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />

          {/* <label className="DeviceEntryDate">등록일</label>
          <span className="DeviceDateInput">{registrationDate}</span> */}

          <button type="submit" className="EntryBtn">
            등록
          </button>
          <button
            type="button"
            className="EntryCancelBtn"
            onClick={handleCancel}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
