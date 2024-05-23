import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/BookUproad.css";

const Device = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="Device">
      <img src={logo} alt="logoimage" className="Devicelogo" />
      <div className="Deviceeep">EEP</div>
      <div className="Devicement">도서 등록</div>
      <p className="Devicetitle">제목 : </p>
      <img src={buttonBack} alt="buttonBack" className="DevicebuttonBack" />
      <img src={bar} alt="bar" className="Devicebar" />
      <img src={division} alt="divisionBar" className="DevicedivisionBar" />
      <div className="DevicespanTag">
        <span
          className="DeviceSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="DeviceLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span className="DevicehomeSpan" onClick={() => handleNavigation("/")}>
          홈
        </span>
        <span
          className="DeviceSpan"
          onClick={() => handleNavigation("/device")}
        >
          기기 관리
        </span>
        <span
          className="DevicebookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서 관리
        </span>
        <span
          className="DevicestudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="DevicecontectSpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};

export default Device;
