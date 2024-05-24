import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/Emergency.css";

const Emergency = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="Emergency">
      <img src={logo} alt="logoimage" className="Emergencylogo" />
      <div className="Emergencyeep">EEP</div>
      <div className="Emergencyment">비상연락처</div>
      <img src={buttonBack} alt="buttonBack" className="EmergencybuttonBack" />
      <div className="Emergencyment2">손쉽게 학생 정보를 확인하세요.</div>
      <img src={bar} alt="bar" className="Emergencybar" />
      <img src={division} alt="divisionBar" className="EmergencydivisionBar" />
      <div className="EmergencyspanTag">
        <span
          className="EmergencySignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="EmergencyLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span
          className="EmergencyhomeSpan"
          onClick={() => handleNavigation("/")}
        >
          홈
        </span>
        <span
          className="EmergencybookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서 관리
        </span>
        <span
          className="EmergencyDeviceSpan"
          onClick={() => handleNavigation("/device")}
        >
          기기 관리
        </span>
        <span
          className="EmergencystudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="EmergencySpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};

export default Emergency;
