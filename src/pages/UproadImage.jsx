import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Device from "./Device";
import Uproad from "assets/img/Upload.svg";
import "styles/Registration.css";
import MainNavbar from "./MainNavbar";

const Registration = () => {
  const [registrationDate, setRegistrationDate] = useState(getTodayDate());
  const [deviceName, setDeviceName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!deviceName.trim()) {
      alert("기기명을 입력해주세요.");
      return;
    }

    const data = {
      title: deviceName,
      date: registrationDate,
      image: imageBase64,
    };

    console.log("Registering device with data:", data);

    try {
      const response = await fetch("http://15.165.16.79:8080/device/create", {
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

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg",
    multiple: false,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  };

  return (
    <div className="BookEntry">
      <div className="BookOfficerBlur">
        <Device />
        <MainNavbar />
      </div>
      <div className="BookEntryForm">
        <form onSubmit={handleRegister}>
          <p className="BookEntryMent">기기 등록</p>
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
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {imageBase64 && (
              <div>
                <p className="imgResultMent">이미지가 업로드 되었습니다.</p>
              </div>
            )}
            <img src={Uproad} alt="UproadImage" className="Uproad" />
            <p className="imgMent">image Drag&Drop</p>
          </div>

          <label className="EntryTitle">기기명</label>
          <input
            type="text"
            name="title"
            className="TitleInput"
            placeholder="기기명을 입력하세요."
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />

          <label className="EntryDate">등록일</label>
          <span className="DateInput">{registrationDate}</span>

          <button type="submit" className="EntryBtn">
            
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
