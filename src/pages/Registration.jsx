import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Device from "./Device";
import Uproad from "assets/img/Upload.svg";
import "styles/Registration.css";

const Registration = () => {
  const [registrationDate, setRegistrationDate] = useState(getTodayDate());
  const [deviceName, setDeviceName] = useState("");
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
    const data = {
      title: deviceName,
      date: registrationDate,
    };

    console.log("Registering device with data:", data);

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

  return (
    <div className="BookEntry">
      <div className="BookOfficerBlur">
        <Device />
      </div>
      <div className="BookEntryForm">
        <form onSubmit={handleRegister}>
          <p className="BookEntryMent"> 기기 등록 </p>
          <div className="UproadContainer">
            <img src={Uproad} alt="UproadImage" className="Uproad" />
          </div>

          <label className="EntryTitle">기기명</label>
          <input
            type="text"
            name="title"
            className="TitleInput"
            placeholder="제목을 입력하세요."
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />

          <label className="EntryDate">등록일</label>
          <span className="DateInput">{registrationDate}</span>

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
