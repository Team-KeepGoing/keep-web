import React, { useRef, useState } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import uploadIcon from "../assets/img/uproadpic.svg";
import "../styles/StudentInfo.css";
import config from "../config/config.json";
import MainNavbar from "./MainNavbar";
import Header from "components/Header";
import axios from "axios";

const StudentInfo = () => {

  const [uploadFileInfo, setUploadFileInfo] = useState(null);
  const inputRef = useRef(null);

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + "mb";
    setUploadFileInfo({ name, size, type });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("excel", file);
    setFileInfo(file);
    try {
      const res = await axios.post(
        `${config.serverurl}/student/upload`,
        formData
      );
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickUpload = () => {
    inputRef.current.click();
  };

  return (
    <div className="StudentInfo">
      <MainNavbar />
      <Header
        logo={logo}
        bar={bar}
        buttonBack={buttonBack}
        styles={{
          headerContainer: "StudentInfoHeaderContainer",
          buttonBack: "StudentInfobuttonBack",
          homeSpan: "StudentInfohomeSpan",
          bookOfficerSpan: "StudentInfobookOfficerSpan",
          deviceSpan: "StudentInfoDeviceSpan",
          studentInfoSpan: "studentInfoSpan",
          emergencySpan: "StudentInfoEmergencySpan",
          declarationSpan: "StudentDamageSpan",
        }}
      />
      <div className="StudentInfoment">학생 정보 입력</div>
      <div className="StudentInfoment2">학생들의 기본 정보를 등록해주세요.</div>
      <div className="StudentInfoContent">
        <div className="StudentInfoUploadWrapper">
          <div
            className="StudentInfoUpload"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploadFileInfo ? (
              <ul>
                {Object.entries(uploadFileInfo).map(([key, value]) => (
                  <li key={key}>
                    <p>{key}</p>
                    <p>{value}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <input
                  className="StudentInfoUploadInput"
                  type="file"
                  onChange={handleUpload}
                  ref={inputRef}
                />
                <div className="StudentInfoUploadTop">
                  <img
                    className="StudentInfoUploadTopImage"
                    src={uploadIcon}
                    alt="uploadImage"
                  />
                  <div className="StudentInfoUploadTopText">
                    그러면 드래그하거나{" "}
                    <span
                      className="StudentInfoUploadTopLink"
                      onClick={handleClickUpload}
                    >
                      업로드
                    </span>{" "}
                    해주세요
                  </div>
                </div>
                <div className="StudentInfoUploadMiddle">
                  <div className="StudentInfoUploadLine" />
                  <div className="StudentInfoUploadOr">OR</div>
                  <div className="StudentInfoUploadLine" />
                </div>
                <div className="StudentInfoUploadBottom">
                  <div className="StudentInfoUploadBottomText">내 기기에서</div>
                  <button
                    className="StudentInfoUploadBottomButton"
                    onClick={handleClickUpload}
                  >
                    찾아보기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default StudentInfo;
